import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { aiMirror } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function AiMirror() {
  const demoRef = useRef<HTMLDivElement>(null)
  const demoInView = useInView(demoRef, { once: true, amount: 0.2 })

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
            className="mirror-demo"
            ref={demoRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <div className="demo-header">
              <span>{aiMirror.demoHeader}</span>
              <div className="dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>

            <div className="demo-grid">
              <div className="demo-left">
                <div className="query-label">{aiMirror.queryLabel}</div>
                <div className="mirror-query">{aiMirror.query}</div>

                <div className="response-label">{aiMirror.responseLabel}</div>
                <div className="mirror-response-bubble">
                  <div className="mirror-response">
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
              </div>

              <div className="demo-right">
                <div className="sources-title">{aiMirror.sourcesTitle}</div>
                <div className="source-list">
                  {aiMirror.sources.map((s, i) => (
                    <div
                      key={s.name}
                      className={`source${s.tone === 'primary' ? '' : ` ${s.tone}`}`}
                    >
                      <div className="source-info">
                        <div className="source-name">{s.name}</div>
                        <div className="source-detail">{s.detail}</div>
                        {s.unlikely && <div className="source-unlikely">Unlikely source</div>}
                      </div>
                      <div className="source-weight">{s.weight}%</div>
                      <div className="source-bar">
                        <motion.div
                          className="fill"
                          initial={{ scaleX: 0 }}
                          animate={demoInView ? { scaleX: s.weight / 100 } : { scaleX: 0 }}
                          transition={{
                            duration: 1.2,
                            delay: 0.3 + i * 0.08,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  ))}
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
