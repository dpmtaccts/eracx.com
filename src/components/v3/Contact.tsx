// Contact.tsx — §05 section for the /v3 staging homepage.
// Dark ink section, two-column grid. Left: eyebrow + headline + sub + 3
// meta tiles. Right: the contact form.
//
// The form POSTs to /api/contact (the existing Vercel serverless function
// at api/contact.js). That handler expects { name, company, email, message }
// — so the source's "note" field is renamed to "message". The "role" field
// is sent too; the handler ignores unknown keys safely.

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(err.error || `Request failed (${res.status})`)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section className="cta" id="cta">
      <div className="container">
        <div className="cta-grid">
          <div>
            <div className="eyebrow" style={{ color: '#C4D5DE' }}>
              §05 &nbsp; Start here
            </div>
            <h2>
              Map your current<br />
              <span className="slab">
                warmth <span className="accent">distribution.</span>
              </span>
            </h2>
            <p className="cta-sub">
              A four-week sprint from kickoff to live system.{' '}
              <strong>
                Fixed scope, named deliverables, operator handoff.
              </strong>
            </p>
            <div className="cta-meta">
              <div>
                <b>$10K – $15K</b>Fixed-scope sprint
              </div>
              <div>
                <b>4 weeks</b>Kickoff to handoff
              </div>
              <div>
                <b>Bainbridge Island, WA</b>Available globally
              </div>
            </div>
          </div>
          <div>
            <form
              className="contact-form"
              action="/api/contact"
              method="POST"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="contact-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="field">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" required />
                </div>
              </div>
              <div className="contact-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="field">
                  <label htmlFor="role">Role</label>
                  <select id="role" name="role" defaultValue="Founder / CEO">
                    <option>Founder / CEO</option>
                    <option>CRO / VP Sales</option>
                    <option>VP Marketing</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">What are you working on?</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="The shorter the better. One or two sentences."
                />
              </div>
              <div className="contact-submit">
                <button
                  type="submit"
                  className="cta-btn"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? 'Sending…'
                    : 'Book intro call  →'}
                </button>
                {status === 'idle' && (
                  <span className="cta-note">
                    We respond within 48 hours.
                  </span>
                )}
                {status === 'success' && (
                  <span className="cta-note success">
                    Got it. We&apos;ll be in touch.
                  </span>
                )}
                {status === 'error' && (
                  <span className="cta-note error">
                    {errorMsg || 'Something went wrong — try again.'}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
