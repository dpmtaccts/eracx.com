import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Globe, Newspaper, Send } from 'lucide-react'
import { aiMirror } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

// v8 delta item 21: chat UI — user query as right-aligned bubble, assistant
// response as left-aligned bubble (with UNLIKELY SOURCE flags inline), and
// a non-functional input + Send button at the bottom. Sources panel on the
// right uses icon/logo + name + detail + optional magenta UNLIKELY tag.
export default function AiMirror() {
  const [demoTooltip, setDemoTooltip] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDemoTooltip(true)
    window.setTimeout(() => setDemoTooltip(false), 1800)
  }

  return (
    <section className="mirror" id="mirror">
      <div className="container">
        <div className="mirror-content">
          <motion.div
            className="section-label"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {aiMirror.sectionLabel}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {aiMirror.headline.before}
            <span className="accent">{aiMirror.headline.italic}</span>
            {aiMirror.headline.after}
          </motion.h2>
          <motion.p
            className="lede"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {aiMirror.lede}
          </motion.p>

          <motion.div
            className="mirror-framing"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            {aiMirror.framing}
          </motion.div>

          <motion.div
            className="mirror-chat-shell"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <div className="mirror-chat-header">
              <span>{aiMirror.demoHeader}</span>
              <div className="dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>

            <div className="mirror-chat-grid">
              <div className="mirror-chat-col">
                <div className="mirror-chat-log" role="log" aria-label="AI conversation preview">
                  <div className="mirror-bubble mirror-bubble-user">
                    {aiMirror.query}
                  </div>
                  <div className="mirror-bubble mirror-bubble-assistant">
                    <div className="mirror-bubble-meta">{aiMirror.responseLabel}</div>
                    {aiMirror.response.map((para, i) => (
                      <p key={i}>
                        {para.map((seg, j) =>
                          seg.flag ? (
                            <span key={j} className="flag">
                              {seg.text}
                            </span>
                          ) : (
                            <span key={j}>{seg.text}</span>
                          ),
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                <form className="mirror-chat-input" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder={aiMirror.inputPlaceholder}
                    aria-label="Ask a buyer question"
                  />
                  <button type="submit" className="mirror-chat-send" aria-label="Send">
                    <span>{aiMirror.sendLabel}</span>
                    <Send size={14} strokeWidth={1.75} />
                  </button>
                  {demoTooltip && (
                    <div className="mirror-chat-tooltip" role="status">
                      Demo mode — chat is read-only on this page.
                    </div>
                  )}
                </form>
              </div>

              <div className="mirror-sources-col">
                <div className="mirror-sources-head">
                  <div className="mirror-sources-title">{aiMirror.sourcesTitle}</div>
                  <div className="mirror-sources-subtitle">{aiMirror.sourcesSubtitle}</div>
                </div>
                <ul className="mirror-sources-list">
                  {aiMirror.sources.map((s) => (
                    <li key={s.name} className="mirror-source-row">
                      <div className="mirror-source-mark" aria-hidden="true">
                        {s.iconName === 'globe' && <Globe size={20} strokeWidth={1.5} />}
                        {s.iconName === 'newspaper' && <Newspaper size={20} strokeWidth={1.5} />}
                        {s.logoSrc && <img src={s.logoSrc} alt="" loading="lazy" />}
                      </div>
                      <div className="mirror-source-body">
                        <div className="mirror-source-name">{s.name}</div>
                        <div className="mirror-source-detail">{s.detail}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="gap-analysis">
              <div className="gap-col owned">
                <div className="gap-label">{aiMirror.gap.owned.label}</div>
                <h4>{aiMirror.gap.owned.quote}</h4>
              </div>
              <div className="gap-col actual">
                <div className="gap-label">{aiMirror.gap.actual.label}</div>
                <h4>{aiMirror.gap.actual.quote}</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
