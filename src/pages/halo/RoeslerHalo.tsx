import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HaloWelcome from "./HaloWelcome";

const SLUG = "roesler";
const AUTH_KEY = "halo-roesler-auth";
const VOICE_STATE_KEY = "halo:roesler:voice_state_calibrated";

type ClientConfig = {
  client_slug: string;
  client_name: string;
  company: string;
  mode: "build" | "audit_first";
  password: string;
  profile: {
    name: string;
    headline: string;
    company: string;
    location: string;
    profile_photo: string;
    banner_image: string;
    followers: number | null;
    posts_published_with_us: number;
  };
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

function HaloGate({
  config,
  onUnlock,
}: {
  config: ClientConfig;
  onUnlock: () => void;
}) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const submit = () => {
    if (pw === config.password) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#383838] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#383838] text-[#F6F5F2] flex items-center justify-center text-xl font-bold overflow-hidden mb-5">
            {!imgFailed ? (
              <img
                src={config.profile.profile_photo}
                alt={config.profile.name}
                className="w-full h-full object-cover"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <span className="tracking-wide">
                {getInitials(config.profile.name)}
              </span>
            )}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B85C4A] mb-3">
            ERA / HALO / Build mode
          </p>
          <h1 className="text-xl font-bold leading-tight mb-1">
            {config.profile.name}
          </h1>
          <p className="text-sm text-[#5B6670] leading-relaxed mb-8 px-2">
            {config.profile.headline}
          </p>
          <p className="text-sm text-[#5B6670] mb-3">
            Enter your password to begin.
          </p>
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="Password"
            autoFocus
            className={`w-full px-4 py-3 text-sm rounded-md border bg-white text-[#383838] outline-none mb-2 ${
              error
                ? "border-[#B85C4A]"
                : "border-[#D7DADD] focus:border-[#383838]"
            }`}
          />
          {error && (
            <p className="text-xs text-[#B85C4A] mb-2 self-start">
              Incorrect password. Try again.
            </p>
          )}
          <button
            onClick={submit}
            className="w-full bg-[#383838] text-[#F6F5F2] py-3 text-sm font-bold tracking-wide rounded-md hover:bg-[#1a1a1a] transition-colors mt-2"
          >
            Unlock
          </button>
        </div>
        <div className="mt-16 pt-6 border-t border-[#D7DADD]">
          <p className="text-[10px] text-[#5B6670] text-center tracking-wide">
            ERA / GTM SYSTEMS FOR B2B COMPANIES / ERACX.COM
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#383838] flex items-center justify-center px-6">
      <p className="text-sm text-[#5B6670] italic">{message}</p>
    </div>
  );
}

export default function RoeslerHalo() {
  const [config, setConfig] = useState<ClientConfig | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_KEY) === "ok";
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Halo / Stephen Roesler";
    fetch(`/data/${SLUG}/client_config.json`)
      .then((r) => {
        if (!r.ok) throw new Error("config_not_found");
        return r.json();
      })
      .then((data: ClientConfig) => setConfig(data))
      .catch(() => setLoadError(true));
  }, []);

  // Once authed, if calibrated voice state exists, send to dashboard.
  useEffect(() => {
    if (!authed) return;
    if (typeof window === "undefined") return;
    const calibrated = localStorage.getItem(VOICE_STATE_KEY);
    if (calibrated) {
      navigate("/halo/roesler/calendar", { replace: true });
    }
  }, [authed, navigate]);

  // TODO: when audit_first mode lands as a real route, branch on config.mode.
  // For v1, this page is build-mode only.

  if (loadError) {
    return <StatusScreen message="Not found." />;
  }
  if (!config) {
    return <StatusScreen message="Loading." />;
  }

  if (!authed) {
    return (
      <HaloGate
        config={config}
        onUnlock={() => {
          sessionStorage.setItem(AUTH_KEY, "ok");
          setAuthed(true);
        }}
      />
    );
  }

  // Authed but no calibrated voice state yet: welcome screen.
  return (
    <HaloWelcome
      slug={SLUG}
      clientName={config.client_name}
      company={config.company}
    />
  );
}
