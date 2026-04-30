// StartHere.tsx — §10 section for the /v3 staging homepage.
// Renamed from Contact in commit 11; same form + meta tiles.
// Dark ink section, two-column grid. Left: eyebrow + headline + sub + 3
// meta tiles. Right: the contact form.
//
// The form POSTs to /api/contact (the existing Vercel serverless function
// at api/contact.js). That handler expects { name, company, email, message }
// — so the source's "note" field is renamed to "message". The "role" field
// is sent too; the handler ignores unknown keys safely.

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function StartHere() {
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
              06 &nbsp; Request your audit
            </div>
            <h2>
              See what your<br />
              <span className="slab">
                <span className="accent">buyers actually see.</span>
              </span>
            </h2>
            <p className="cta-sub">
              We <strong>map every signal</strong> your highest-value accounts
              encounter. What&rsquo;s converting, what&rsquo;s invisible, and
              where pipeline is quietly leaking.
            </p>
            <div className="cta-meta">
              <div>
                <b>Outcome</b>See exactly what your buyers see
              </div>
              <div>
                <b>Proof</b>Mapped inside 48 hours
              </div>
              <div>
                <b>POV</b>Every wasted motion starts as an unmapped signal
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
                <label htmlFor="message">What should we audit?</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="One or two sentences on the company, market, or signal you want diagnosed."
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
                    : 'Request audit  →'}
                </button>
                {status === 'idle' && (
                  <span className="cta-note">
                    48 hour response.
                  </span>
                )}
                {status === 'success' && (
                  <span className="cta-note success">
                    Got it. We&apos;ll be in touch within 48 hours.
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
