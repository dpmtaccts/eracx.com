import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { close } from '../content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const } },
}

export default function Close() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: wire to a real submission endpoint (Resend / HubSpot / webhook).
    // For now the form acknowledges receipt client-side.
    setSent(true)
  }

  return (
    <section className="close" id="close">
      <div className="container">
        <div className="close-grid">
          <motion.div
            className="close-copy"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <h2>
              {close.headline.before}
              <span className="accent">{close.headline.italic}</span>
              {close.headline.after}
            </h2>
            <p className="close-sub">{close.sub}</p>
            <a
              className="close-conversation"
              href={`mailto:${close.conversation.email}`}
            >
              <span className="close-conversation-label">{close.conversation.label}</span>
              <span className="close-conversation-sep">|</span>
              <span className="close-conversation-email">{close.conversation.email}</span>
            </a>
          </motion.div>

          <motion.form
            className="close-form"
            onSubmit={onSubmit}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            aria-label="Start a conversation with ERA"
          >
            {close.form.fields.map((f) =>
              f.type === 'textarea' ? (
                <label key={f.id} className="close-field">
                  <span className="close-field-label">{f.label}</span>
                  <textarea
                    id={f.id}
                    name={f.id}
                    rows={3}
                    required={f.required}
                  />
                </label>
              ) : (
                <label key={f.id} className="close-field">
                  <span className="close-field-label">{f.label}</span>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    required={f.required}
                  />
                </label>
              ),
            )}
            <div className="close-form-row">
              {sent && (
                <span className="close-form-status">
                  Thanks. We'll reply within 48 hours.
                </span>
              )}
              <button type="submit" className="close-submit" disabled={sent}>
                {sent ? 'Sent' : close.form.submitLabel}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
