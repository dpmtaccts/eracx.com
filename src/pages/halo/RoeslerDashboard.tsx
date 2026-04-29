import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SLUG = "roesler";
const AUTH_KEY = "halo-roesler-auth";
const VOICE_STATE_KEY = "halo:roesler:voice_state_calibrated";
const PLACEHOLDERS_KEY = "halo:roesler:placeholders";
const POST_STATUS_KEY = "halo:roesler:post_status";
const POSTS_PUBLISHED_KEY = "halo:roesler:posts_published";
const EDITED_DRAFTS_KEY = "halo:roesler:edited_drafts";
const IMAGE_KEY_PREFIX = "halo:roesler:images:";
const REGEN_KEY_PREFIX = "halo:roesler:regenerated:";

const REGEN_ENDPOINT = "/api/halo/voice-regen";

const PHOTO_PLACEHOLDER_HINT = /(photo|image)/i;

type Placeholder = {
  id: string;
  label: string;
  required?: boolean;
  fulfilled_by?: string;
  instructions?: string;
};

type CalendarPost = {
  post_number: number;
  scheduled_date: string;
  scheduled_day: string;
  pillar: string;
  format: string;
  funnel_tier: "TOFU" | "MOFU" | "BOFU";
  title: string;
  draft?: string;
  draft_caption?: string;
  draft_caption_variant_a?: string;
  draft_caption_variant_b?: string;
  draft_template?: string;
  placeholders?: Placeholder[];
  rationale?: string;
  discovery_pair_eligible?: boolean;
};

type Calendar = {
  client_slug: string;
  calendar_window: { start: string; end: string; weeks: number };
  anchor_event?: { name: string; dates: string };
  posts: CalendarPost[];
};

type DimensionPreference = {
  preference: string;
  confidence: "low" | "moderate" | "strong";
  notes: string[];
};

type VoiceState = {
  client_slug: string;
  version: "calibrated";
  generated_at: string;
  preferences: Record<string, DimensionPreference>;
  neither_flags: unknown[];
  operator_review_required: boolean;
};

type VoicePair = {
  round: number;
  dimension: string;
  calendar_post_reference?: number;
};

type PairsFile = {
  rounds: VoicePair[];
};

type PostStatus = "approved" | "edit" | "skipped";
type PostStatusMap = Record<string, PostStatus>;
type PlaceholdersMap = Record<string, string>;
type EditedDraftsMap = Record<string, string>;
type ImagesMap = Record<string, string>;
type RegeneratedMap = Record<string, string>;

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function loadByPrefix(prefix: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof window === "undefined") return out;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      const id = key.slice(prefix.length);
      const val = localStorage.getItem(key);
      if (val !== null) out[id] = val;
    }
  }
  return out;
}

function tierColors(tier: CalendarPost["funnel_tier"]) {
  switch (tier) {
    case "TOFU":
      return { bg: "#E6F0F6", text: "#2E6E91" };
    case "MOFU":
      return { bg: "#F4E4DD", text: "#B85C4A" };
    case "BOFU":
      return { bg: "#383838", text: "#F6F5F2" };
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

function isPhotoPlaceholder(p: Placeholder): boolean {
  return PHOTO_PLACEHOLDER_HINT.test(p.id);
}

function getEffectiveSeedText(post: CalendarPost): string {
  if (post.draft) return post.draft;
  if (post.draft_caption) return post.draft_caption;
  if (post.draft_template) return post.draft_template;
  const a = post.draft_caption_variant_a;
  const b = post.draft_caption_variant_b;
  if (a && b) return `Variant A:\n${a}\n\nVariant B:\n${b}`;
  if (a) return a;
  if (b) return b;
  return "";
}

function StatusScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#383838] flex items-center justify-center px-6">
      <p className="text-sm text-[#5B6670] italic">{message}</p>
    </div>
  );
}

// ─── Voice state modal ───

function VoiceStateModal({
  voiceState,
  onClose,
}: {
  voiceState: VoiceState;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-3xl w-full max-h-[85vh] overflow-auto rounded-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D7DADD] sticky top-0 bg-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C4A]">
            Calibrated voice state
          </p>
          <button
            onClick={onClose}
            className="text-sm text-[#5B6670] hover:text-[#383838]"
          >
            Close
          </button>
        </div>
        <pre className="px-6 py-4 text-xs leading-relaxed text-[#383838] whitespace-pre-wrap font-mono">
          {JSON.stringify(voiceState, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ─── Operator panel ───

function OperatorPanel({
  voiceState,
  approvedCount,
  onReset,
  onExportApproved,
}: {
  voiceState: VoiceState;
  approvedCount: number;
  onReset: () => void;
  onExportApproved: () => Promise<void>;
}) {
  const [showJSON, setShowJSON] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState<"idle" | "ok" | "error">("idle");
  const [postsPublished, setPostsPublished] = useState<number>(() => {
    const stored = localStorage.getItem(POSTS_PUBLISHED_KEY);
    return stored ? parseInt(stored, 10) || 0 : 0;
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(voiceState, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const exportApproved = async () => {
    if (approvedCount === 0) return;
    try {
      await onExportApproved();
      setExported("ok");
      setTimeout(() => setExported("idle"), 2500);
    } catch {
      setExported("error");
      setTimeout(() => setExported("idle"), 2500);
    }
  };

  const exportLabel =
    exported === "ok"
      ? `Copied ${approvedCount} drafts`
      : exported === "error"
        ? "Copy failed"
        : approvedCount === 0
          ? "No approved drafts yet"
          : `Export ${approvedCount} approved drafts`;

  const incrementPublished = () => {
    const next = postsPublished + 1;
    setPostsPublished(next);
    localStorage.setItem(POSTS_PUBLISHED_KEY, String(next));
  };

  const decrementPublished = () => {
    const next = Math.max(0, postsPublished - 1);
    setPostsPublished(next);
    localStorage.setItem(POSTS_PUBLISHED_KEY, String(next));
  };

  return (
    <>
      <div className="bg-[#383838] text-[#F6F5F2] px-6 py-4 mb-8 rounded-md">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B85C4A]">
            Operator panel
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowJSON(true)}
              className="text-xs font-bold px-3 py-2 border border-[#5B6670] hover:border-[#F6F5F2] rounded transition-colors"
            >
              View calibrated voice state
            </button>
            <button
              onClick={copy}
              className="text-xs font-bold px-3 py-2 border border-[#5B6670] hover:border-[#F6F5F2] rounded transition-colors"
            >
              {copied ? "Copied" : "Copy voice state to clipboard"}
            </button>
            <button
              onClick={exportApproved}
              disabled={approvedCount === 0 && exported === "idle"}
              className="text-xs font-bold px-3 py-2 border border-[#5B6670] hover:border-[#F6F5F2] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportLabel}
            </button>
            <button
              onClick={onReset}
              className="text-xs font-bold px-3 py-2 border border-[#5B6670] hover:border-[#B85C4A] hover:text-[#B85C4A] rounded transition-colors"
            >
              Reset voice discovery
            </button>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#5B6670] rounded">
              <span className="text-xs text-[#A8A39A]">Posts published with us</span>
              <button
                onClick={decrementPublished}
                className="text-xs font-bold w-6 h-6 hover:text-[#B85C4A]"
                aria-label="Decrement"
              >
                −
              </button>
              <span className="text-sm font-bold tabular-nums w-6 text-center">
                {postsPublished}
              </span>
              <button
                onClick={incrementPublished}
                className="text-xs font-bold w-6 h-6 hover:text-[#B85C4A]"
                aria-label="Increment"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      {showJSON && (
        <VoiceStateModal
          voiceState={voiceState}
          onClose={() => setShowJSON(false)}
        />
      )}
    </>
  );
}

// ─── Seed draft rendering ───

function SeedDraftRender({ post }: { post: CalendarPost }) {
  if (post.draft) {
    return (
      <div className="text-base leading-relaxed whitespace-pre-line text-[#383838]">
        {post.draft}
      </div>
    );
  }
  if (post.draft_caption) {
    return (
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5B6670] mb-2">
          Caption
        </p>
        <div className="text-base leading-relaxed text-[#383838]">
          {post.draft_caption}
        </div>
      </div>
    );
  }
  if (post.draft_template) {
    return (
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5B6670] mb-2">
          Template (placeholders interpolate at publish)
        </p>
        <div className="text-base leading-relaxed whitespace-pre-line text-[#383838]">
          {post.draft_template}
        </div>
      </div>
    );
  }
  if (post.draft_caption_variant_a || post.draft_caption_variant_b) {
    return (
      <div className="space-y-4">
        {post.draft_caption_variant_a && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5B6670] mb-2">
              Variant A
            </p>
            <div className="text-base leading-relaxed text-[#383838]">
              {post.draft_caption_variant_a}
            </div>
          </div>
        )}
        {post.draft_caption_variant_b && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5B6670] mb-2">
              Variant B
            </p>
            <div className="text-base leading-relaxed text-[#383838]">
              {post.draft_caption_variant_b}
            </div>
          </div>
        )}
      </div>
    );
  }
  return <p className="text-sm text-[#5B6670] italic">No seed draft.</p>;
}

function EditableSeedDraft({
  post,
  edited,
  onSave,
  onRevert,
}: {
  post: CalendarPost;
  edited: string | undefined;
  onSave: (text: string) => void;
  onRevert: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const enterEdit = () => {
    setDraft(edited ?? getEffectiveSeedText(post));
    setEditing(true);
  };
  const cancel = () => {
    setEditing(false);
    setDraft("");
  };
  const save = () => {
    onSave(draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="space-y-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={Math.max(8, draft.split("\n").length + 2)}
          className="w-full px-3 py-2 text-base leading-relaxed rounded-md border border-[#383838] bg-white text-[#383838] outline-none font-sans resize-y"
        />
        <div className="flex gap-2">
          <button
            onClick={save}
            className="text-xs font-bold px-3 py-2 rounded bg-[#383838] text-[#F6F5F2] hover:bg-[#1a1a1a]"
          >
            Save
          </button>
          <button
            onClick={cancel}
            className="text-xs font-bold px-3 py-2 rounded border border-[#D7DADD] text-[#5B6670] hover:border-[#383838] hover:text-[#383838]"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (edited) {
    return (
      <div className="space-y-3">
        <div className="text-base leading-relaxed whitespace-pre-line text-[#383838]">
          {edited}
        </div>
        <div className="flex gap-2">
          <button
            onClick={enterEdit}
            className="text-xs font-bold px-3 py-2 rounded border border-[#D7DADD] text-[#383838] hover:border-[#383838]"
          >
            Edit again
          </button>
          <button
            onClick={onRevert}
            className="text-xs font-bold px-3 py-2 rounded border border-[#D7DADD] text-[#B85C4A] hover:border-[#B85C4A]"
          >
            Revert to original
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <SeedDraftRender post={post} />
      <button
        onClick={enterEdit}
        className="text-xs font-bold px-3 py-2 rounded border border-[#D7DADD] text-[#383838] hover:border-[#383838]"
      >
        Edit
      </button>
    </div>
  );
}

// ─── Image drop zone ───

function ImageDropZone({
  postNumber,
  placeholder,
  imageDataUrl,
  onSet,
  onClear,
}: {
  postNumber: number;
  placeholder: Placeholder;
  imageDataUrl: string | undefined;
  onSet: (dataUrl: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("That is not an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") onSet(result);
    };
    reader.onerror = () => setError("Could not read that file.");
    reader.readAsDataURL(file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#383838]">
        {placeholder.label}
        {placeholder.required && (
          <span className="text-[#B85C4A] ml-1">*</span>
        )}
      </p>
      {placeholder.instructions && (
        <p className="text-xs text-[#5B6670] italic leading-relaxed">
          {placeholder.instructions}
        </p>
      )}
      {imageDataUrl ? (
        <div className="space-y-2">
          <img
            src={imageDataUrl}
            alt={placeholder.label}
            style={{ maxWidth: 200, height: "auto" }}
            className="rounded-md border border-[#D7DADD]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="text-xs font-bold px-3 py-2 rounded border border-[#D7DADD] text-[#383838] hover:border-[#383838]"
            >
              Replace
            </button>
            <button
              onClick={onClear}
              className="text-xs font-bold px-3 py-2 rounded border border-[#D7DADD] text-[#B85C4A] hover:border-[#B85C4A]"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`flex items-center justify-center px-4 py-8 rounded-md border-2 border-dashed cursor-pointer transition-colors ${
            dragActive
              ? "border-[#B85C4A] bg-[#F4E4DD]"
              : "border-[#D7DADD] bg-white hover:border-[#383838]"
          }`}
        >
          <p className="text-sm text-[#5B6670] text-center leading-relaxed">
            Drop an image here, or click to choose.
            <br />
            <span className="text-xs italic">Stays in your browser.</span>
          </p>
        </div>
      )}
      {error && (
        <p className="text-xs text-[#B85C4A]">{error}</p>
      )}
      <input
        ref={inputRef}
        id={`img-${postNumber}-${placeholder.id}`}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

// ─── Calibrated draft block ───

function CalibratedDraftBlock({
  regenerated,
  isRegenerating,
  error,
  onRegenerate,
}: {
  regenerated: string | undefined;
  isRegenerating: boolean;
  error: string | undefined;
  onRegenerate: () => void;
}) {
  const buttonLabel = isRegenerating
    ? "Regenerating..."
    : regenerated
      ? "Regenerate again"
      : "Regenerate against my voice";

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B85C4A]">
        Calibrated draft
      </p>
      {regenerated && !isRegenerating ? (
        <div className="text-base leading-relaxed whitespace-pre-line text-[#383838] bg-white border border-[#D7DADD] rounded-md p-4">
          {regenerated}
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#D7DADD] rounded-md p-5 min-h-[120px] flex items-center justify-center">
          <p className="text-sm text-[#5B6670] italic text-center leading-relaxed">
            {isRegenerating
              ? "Regenerating..."
              : "Pending regeneration. Justin will paste here, or click below."}
          </p>
        </div>
      )}
      <div className="flex items-start gap-3 flex-wrap">
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="text-xs font-bold px-3 py-2 rounded border border-[#383838] text-[#383838] hover:bg-[#383838] hover:text-[#F6F5F2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonLabel}
        </button>
        {error && (
          <p className="text-xs text-[#B85C4A] leading-relaxed flex-1 min-w-[180px]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Placeholder text input ───

function PlaceholderInput({
  postNumber,
  placeholder,
  value,
  onChange,
}: {
  postNumber: number;
  placeholder: Placeholder;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={`ph-${postNumber}-${placeholder.id}`}
        className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#383838]"
      >
        {placeholder.label}
        {placeholder.required && (
          <span className="text-[#B85C4A] ml-1">*</span>
        )}
      </label>
      {placeholder.instructions && (
        <p className="text-xs text-[#5B6670] italic leading-relaxed">
          {placeholder.instructions}
        </p>
      )}
      <input
        id={`ph-${postNumber}-${placeholder.id}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          placeholder.fulfilled_by ? `Filled by ${placeholder.fulfilled_by}` : ""
        }
        className="w-full px-3 py-2 text-sm rounded-md border border-[#D7DADD] bg-white text-[#383838] outline-none focus:border-[#383838]"
      />
    </div>
  );
}

// ─── Post card ───

function PostCard({
  post,
  testedRounds,
  status,
  onStatusChange,
  editedDraft,
  onSaveEdit,
  onRevertEdit,
  placeholderValues,
  onPlaceholderChange,
  imageDataUrl,
  onSetImage,
  onClearImage,
  regenerated,
  isRegenerating,
  regenError,
  onRegenerate,
}: {
  post: CalendarPost;
  testedRounds: { round: number; dimension: string }[];
  status: PostStatus | undefined;
  onStatusChange: (s: PostStatus | undefined) => void;
  editedDraft: string | undefined;
  onSaveEdit: (text: string) => void;
  onRevertEdit: () => void;
  placeholderValues: Record<string, string>;
  onPlaceholderChange: (placeholderId: string, value: string) => void;
  imageDataUrl: string | undefined;
  onSetImage: (dataUrl: string) => void;
  onClearImage: () => void;
  regenerated: string | undefined;
  isRegenerating: boolean;
  regenError: string | undefined;
  onRegenerate: () => void;
}) {
  const tier = tierColors(post.funnel_tier);
  const dimensions = testedRounds.map((r) => r.dimension);
  const dimensionsLabel = Array.from(new Set(dimensions)).join(", ");

  return (
    <article className="bg-white border border-[#D7DADD] rounded-md overflow-hidden">
      <header className="px-6 py-4 border-b border-[#D7DADD] bg-[#FAF9F6]">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-xs text-[#5B6670] tabular-nums font-bold">
            #{post.post_number}
          </span>
          <span className="text-xs text-[#5B6670] tabular-nums">
            {formatDate(post.scheduled_date)} · {post.scheduled_day}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded"
            style={{ backgroundColor: tier.bg, color: tier.text }}
          >
            {post.funnel_tier}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded bg-[#F0EEEA] text-[#5B6670]">
            {post.pillar}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded bg-[#F0EEEA] text-[#5B6670]">
            {post.format.replace(/_/g, " ")}
          </span>
          {testedRounds.length > 0 && (
            <span
              className="text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded border border-[#B85C4A] text-[#B85C4A]"
              title={`Rounds ${testedRounds.map((r) => r.round).join(", ")}`}
            >
              Tested in voice discovery: {dimensionsLabel}
            </span>
          )}
          {editedDraft !== undefined && (
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded bg-[#383838] text-[#F6F5F2]">
              Edited
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold text-[#383838]">{post.title}</h2>
      </header>

      <div className="grid md:grid-cols-2 gap-0 border-b border-[#D7DADD]">
        <div className="px-6 py-5 md:border-r border-[#D7DADD]">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B6670]">
              Seed draft
            </p>
            {editedDraft !== undefined && (
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B85C4A]">
                edited
              </span>
            )}
          </div>
          <EditableSeedDraft
            post={post}
            edited={editedDraft}
            onSave={onSaveEdit}
            onRevert={onRevertEdit}
          />
        </div>
        <div className="px-6 py-5 border-t md:border-t-0 border-[#D7DADD]">
          <CalibratedDraftBlock
            regenerated={regenerated}
            isRegenerating={isRegenerating}
            error={regenError}
            onRegenerate={onRegenerate}
          />
        </div>
      </div>

      {post.placeholders && post.placeholders.length > 0 && (
        <div className="px-6 py-5 border-b border-[#D7DADD] bg-[#FAF9F6]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B6670] mb-4">
            Needs your input
          </p>
          <div className="space-y-5">
            {post.placeholders.map((ph) =>
              isPhotoPlaceholder(ph) ? (
                <ImageDropZone
                  key={ph.id}
                  postNumber={post.post_number}
                  placeholder={ph}
                  imageDataUrl={imageDataUrl}
                  onSet={onSetImage}
                  onClear={onClearImage}
                />
              ) : (
                <PlaceholderInput
                  key={ph.id}
                  postNumber={post.post_number}
                  placeholder={ph}
                  value={placeholderValues[ph.id] || ""}
                  onChange={(v) => onPlaceholderChange(ph.id, v)}
                />
              )
            )}
          </div>
        </div>
      )}

      <footer className="px-6 py-4 flex flex-wrap items-center gap-3">
        <p className="text-xs text-[#5B6670]">Status:</p>
        {(["approved", "edit", "skipped"] as PostStatus[]).map((s) => {
          const active = status === s;
          const label =
            s === "approved" ? "Approve" : s === "edit" ? "Edit" : "Skip";
          return (
            <button
              key={s}
              onClick={() => onStatusChange(active ? undefined : s)}
              className={`text-xs font-bold px-3 py-2 rounded border transition-colors ${
                active
                  ? "bg-[#383838] text-[#F6F5F2] border-[#383838]"
                  : "bg-white text-[#383838] border-[#D7DADD] hover:border-[#383838]"
              }`}
            >
              {label}
            </button>
          );
        })}
        {status && (
          <span className="text-xs text-[#5B6670] italic ml-auto">
            Marked {status}.
          </span>
        )}
      </footer>
    </article>
  );
}

// ─── Main ───

export default function RoeslerDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const operatorMode = searchParams.get("op") === "1";

  const [voiceState, setVoiceState] = useState<VoiceState | null>(null);
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [pairs, setPairs] = useState<PairsFile | null>(null);
  const [loadError, setLoadError] = useState(false);

  const [statusMap, setStatusMap] = useState<PostStatusMap>(() =>
    loadJSON<PostStatusMap>(POST_STATUS_KEY, {})
  );
  const [placeholdersMap, setPlaceholdersMap] = useState<PlaceholdersMap>(() =>
    loadJSON<PlaceholdersMap>(PLACEHOLDERS_KEY, {})
  );
  const [editedDrafts, setEditedDrafts] = useState<EditedDraftsMap>(() =>
    loadJSON<EditedDraftsMap>(EDITED_DRAFTS_KEY, {})
  );
  const [imagesMap, setImagesMap] = useState<ImagesMap>(() =>
    loadByPrefix(IMAGE_KEY_PREFIX)
  );
  const [regeneratedMap, setRegeneratedMap] = useState<RegeneratedMap>(() =>
    loadByPrefix(REGEN_KEY_PREFIX)
  );
  const [regeneratingSet, setRegeneratingSet] = useState<Set<number>>(
    () => new Set()
  );
  const [regenErrors, setRegenErrors] = useState<Record<string, string>>({});

  // Auth + voice state checks.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(AUTH_KEY) !== "ok") {
      navigate("/halo/roesler", { replace: true });
      return;
    }
    const raw = localStorage.getItem(VOICE_STATE_KEY);
    if (!raw) {
      navigate("/halo/roesler", { replace: true });
      return;
    }
    try {
      setVoiceState(JSON.parse(raw) as VoiceState);
    } catch {
      navigate("/halo/roesler", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Calendar / Halo / Stephen Roesler";
    Promise.all([
      fetch(`/data/${SLUG}/stephen_content_calendar.json`).then((r) => {
        if (!r.ok) throw new Error("calendar_load_failed");
        return r.json();
      }),
      fetch(`/data/${SLUG}/stephen_voice_pairs.json`).then((r) => {
        if (!r.ok) throw new Error("pairs_load_failed");
        return r.json();
      }),
    ])
      .then(([cal, p]) => {
        setCalendar(cal as Calendar);
        setPairs(p as PairsFile);
      })
      .catch(() => setLoadError(true));
  }, []);

  const roundsByPost = useMemo(() => {
    const map = new Map<number, { round: number; dimension: string }[]>();
    if (!pairs) return map;
    for (const r of pairs.rounds) {
      if (typeof r.calendar_post_reference === "number") {
        const list = map.get(r.calendar_post_reference) ?? [];
        list.push({ round: r.round, dimension: r.dimension });
        map.set(r.calendar_post_reference, list);
      }
    }
    return map;
  }, [pairs]);

  const orderedPosts = useMemo(() => {
    if (!calendar) return [];
    return [...calendar.posts].sort((a, b) =>
      a.scheduled_date.localeCompare(b.scheduled_date)
    );
  }, [calendar]);

  const handleStatusChange = (
    postNumber: number,
    s: PostStatus | undefined
  ) => {
    setStatusMap((prev) => {
      const next = { ...prev };
      if (s === undefined) {
        delete next[String(postNumber)];
      } else {
        next[String(postNumber)] = s;
      }
      localStorage.setItem(POST_STATUS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handlePlaceholderChange = (
    postNumber: number,
    placeholderId: string,
    value: string
  ) => {
    setPlaceholdersMap((prev) => {
      const key = `${postNumber}.${placeholderId}`;
      const next = { ...prev };
      if (value === "") {
        delete next[key];
      } else {
        next[key] = value;
      }
      localStorage.setItem(PLACEHOLDERS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const placeholderValuesForPost = (postNumber: number) => {
    const out: Record<string, string> = {};
    const prefix = `${postNumber}.`;
    for (const [k, v] of Object.entries(placeholdersMap)) {
      if (k.startsWith(prefix)) {
        out[k.slice(prefix.length)] = v;
      }
    }
    return out;
  };

  const handleSaveEdit = (postNumber: number, text: string) => {
    setEditedDrafts((prev) => {
      const next = { ...prev, [String(postNumber)]: text };
      localStorage.setItem(EDITED_DRAFTS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleRevertEdit = (postNumber: number) => {
    setEditedDrafts((prev) => {
      const next = { ...prev };
      delete next[String(postNumber)];
      localStorage.setItem(EDITED_DRAFTS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleSetImage = (postNumber: number, dataUrl: string) => {
    setImagesMap((prev) => ({ ...prev, [String(postNumber)]: dataUrl }));
    try {
      localStorage.setItem(IMAGE_KEY_PREFIX + postNumber, dataUrl);
    } catch (err) {
      // Most likely a quota exceeded error from a very large image.
      console.error("Failed to persist image to localStorage", err);
    }
  };

  const handleClearImage = (postNumber: number) => {
    setImagesMap((prev) => {
      const next = { ...prev };
      delete next[String(postNumber)];
      return next;
    });
    localStorage.removeItem(IMAGE_KEY_PREFIX + postNumber);
  };

  const handleRegenerate = async (post: CalendarPost) => {
    if (!voiceState) return;
    const postNumber = post.post_number;
    const key = String(postNumber);

    setRegenErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setRegeneratingSet((prev) => {
      const next = new Set(prev);
      next.add(postNumber);
      return next;
    });

    const editedDraft = editedDrafts[key];
    const seedDraft = getEffectiveSeedText(post);
    const placeholder_fills = placeholderValuesForPost(postNumber);

    try {
      const res = await fetch(REGEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_number: postNumber,
          seed_draft: seedDraft,
          voice_state: voiceState,
          edited_draft: editedDraft,
          placeholder_fills:
            Object.keys(placeholder_fills).length > 0 ? placeholder_fills : undefined,
        }),
      });
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          `Endpoint did not return JSON (${res.status}). The /api route is only available under vercel dev, not vite dev. Switch to localhost:3000.`
        );
      }
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      const draft = data.draft as string;
      setRegeneratedMap((prev) => ({ ...prev, [key]: draft }));
      localStorage.setItem(REGEN_KEY_PREFIX + postNumber, draft);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Regen failed";
      setRegenErrors((prev) => ({ ...prev, [key]: msg }));
    } finally {
      setRegeneratingSet((prev) => {
        const next = new Set(prev);
        next.delete(postNumber);
        return next;
      });
    }
  };

  const resetVoiceDiscovery = () => {
    localStorage.removeItem(VOICE_STATE_KEY);
    navigate("/halo/roesler", { replace: true });
  };

  const approvedPosts = useMemo(
    () => orderedPosts.filter((p) => statusMap[String(p.post_number)] === "approved"),
    [orderedPosts, statusMap]
  );

  const buildApprovedExport = (): string => {
    const ts = new Date().toISOString();
    const header = [
      "# Halo / Stephen Roesler / Approved drafts",
      `Generated ${ts}`,
      `Voice profile generated_at: ${voiceState?.generated_at ?? "unknown"}`,
      `Approved: ${approvedPosts.length} of ${orderedPosts.length}`,
      "",
    ].join("\n");

    const sections = approvedPosts.map((post) => {
      const key = String(post.post_number);
      const regen = regeneratedMap[key];
      const edited = editedDrafts[key];
      const seed = getEffectiveSeedText(post);
      const sourceLabel = regen ? "calibrated regenerated" : edited ? "edited seed" : "seed";
      const draft = regen || edited || seed;

      const placeholderEntries = Object.entries(placeholderValuesForPost(post.post_number));
      const placeholdersBlock = placeholderEntries.length
        ? "\n\nPlaceholder fills:\n" +
          placeholderEntries.map(([k, v]) => `- ${k}: ${v}`).join("\n")
        : "";
      const imageNote = imagesMap[key] ? "\n\n[Image attached, see Stephen's browser]" : "";

      return [
        "────────────────",
        `[Post #${post.post_number} · ${formatDate(post.scheduled_date)}, ${post.scheduled_day} · ${post.funnel_tier}]`,
        post.title,
        `(${sourceLabel})`,
        "",
        draft,
      ].join("\n") + placeholdersBlock + imageNote;
    });

    return header + sections.join("\n\n") + "\n";
  };

  const handleExportApproved = async (): Promise<void> => {
    const text = buildApprovedExport();
    await navigator.clipboard.writeText(text);
  };

  if (loadError) {
    return <StatusScreen message="Could not load calendar or voice pairs." />;
  }
  if (!voiceState || !calendar) {
    return <StatusScreen message="Loading." />;
  }

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#383838]">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C4A] mb-3">
            ERA / HALO / Calibrated calendar
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            Five weeks. Ten posts.
          </h1>
          <p className="text-base text-[#5B6670] leading-relaxed max-w-2xl">
            Voice profile is calibrated. Drafts on the left are seed versions
            from the calendar. On the right, click Regenerate against my voice
            to rewrite each post in your calibrated voice.
          </p>
          {calendar.anchor_event && (
            <p className="text-sm text-[#5B6670] mt-3">
              Anchored to {calendar.anchor_event.name},{" "}
              {calendar.anchor_event.dates}.
            </p>
          )}
        </header>

        {operatorMode && (
          <OperatorPanel
            voiceState={voiceState}
            approvedCount={approvedPosts.length}
            onReset={resetVoiceDiscovery}
            onExportApproved={handleExportApproved}
          />
        )}

        <div className="space-y-6">
          {orderedPosts.map((post) => (
            <PostCard
              key={post.post_number}
              post={post}
              testedRounds={roundsByPost.get(post.post_number) ?? []}
              status={statusMap[String(post.post_number)]}
              onStatusChange={(s) => handleStatusChange(post.post_number, s)}
              editedDraft={editedDrafts[String(post.post_number)]}
              onSaveEdit={(text) => handleSaveEdit(post.post_number, text)}
              onRevertEdit={() => handleRevertEdit(post.post_number)}
              placeholderValues={placeholderValuesForPost(post.post_number)}
              onPlaceholderChange={(id, v) =>
                handlePlaceholderChange(post.post_number, id, v)
              }
              imageDataUrl={imagesMap[String(post.post_number)]}
              onSetImage={(dataUrl) =>
                handleSetImage(post.post_number, dataUrl)
              }
              onClearImage={() => handleClearImage(post.post_number)}
              regenerated={regeneratedMap[String(post.post_number)]}
              isRegenerating={regeneratingSet.has(post.post_number)}
              regenError={regenErrors[String(post.post_number)]}
              onRegenerate={() => handleRegenerate(post)}
            />
          ))}
        </div>

        <div className="mt-20 pt-6 border-t border-[#D7DADD]">
          <p className="text-xs text-[#5B6670] text-center tracking-wide">
            ERA / GTM SYSTEMS FOR B2B COMPANIES / ERACX.COM
          </p>
        </div>
      </div>
    </div>
  );
}
