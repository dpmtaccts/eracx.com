/**
 * V4Footer — §09 of v4 marketing site.
 *
 * Ink-black-ground footer that closes the page on a conversion
 * moment, not a brand moment. Two-column layout: editorial headline
 * on the left, form on the right. Matches §02 Warmth's headline-left
 * / body-right rhythm.
 *
 * Form is a controlled React component with 4 required fields
 * (name, email, company, message) and a submission state machine
 * (idle / submitting / success / error). POSTs to /api/contact, the
 * existing Vercel serverless function (api/contact.js) that v3
 * StartHere and the main app CTAFooter also use. The handler emails
 * hello@eracx.com via Resend and posts to Slack. Field shape
 * { name, company, email, message } matches the API contract
 * exactly; no renames required.
 *
 * A honeypot field (name="website", off-screen + aria-hidden) catches
 * naive form-fill bots. If filled, the submit silently shows success
 * without contacting the backend — bots don't retry on apparent
 * success.
 *
 * Below the form, a horizontal mono band of in-page section anchors
 * (Statement / Warmth / What we are / Evidence / How it works /
 * Technology / Lab / FAQ) sits above a thin legal bar reading
 * "ERA" left, "© 2026 · ALL RIGHTS RESERVED" right.
 */

import { Fragment, useState } from 'react'
import type { FormEvent } from 'react'
import { V4Header } from './V4Header'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

const SECTIONS = [
  { href: '#top', label: 'Statement' },
  { href: '#warmth', label: 'Warmth' },
  { href: '#whatera', label: 'What we are' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#how', label: 'How it works' },
  { href: '#tech', label: 'Technology' },
  { href: '#lab', label: 'Lab' },
  { href: '#faq', label: 'FAQ' },
]

export function V4Footer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  // Snapshot the email at submit time so the success block keeps
  // displaying it even after we reset the form fields.
  const [submittedEmail, setSubmittedEmail] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: a bot auto-filled the hidden "website" field. Silently
    // pretend success rather than rejecting, so the bot doesn't retry
    // with a different strategy.
    if (honeypot) {
      setSubmittedEmail(email || 'your inbox')
      setStatus('success')
      return
    }

    if (!name || !email || !company || !message) {
      setStatus('error')
      setErrorMessage('Missing required fields. All four are required.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, message }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || `Request failed (${response.status})`)
      }

      setSubmittedEmail(email)
      setStatus('success')
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Submission failed. Please email hello@eracx.com directly.',
      )
    }
  }

  return (
    <section className="v4-section v4-section--footer">
      <V4Header
        phase="▸09 · CONTACT"
        meta={['DIRECT EMAIL', 'USUALLY SAME DAY', 'NO DRIP']}
      />

      <div className="v4-footer">
        <div className="v4-footer__form-section" id="contact">
          <div className="v4-footer__form-headline-col">
            <h2 className="v4-footer__form-headline">
              Worth <em>talking</em>?
            </h2>
            <p className="v4-footer__form-subhead">
              Tell us what you're working on. We respond directly,
              usually same day. No form-fill follow-up. No drip
              sequence.
            </p>
          </div>

          <div className="v4-footer__form-col">
            {status === 'success' ? (
              <div className="v4-footer__form-success">
                <div className="v4-footer__form-success-mark">→</div>
                <h3 className="v4-footer__form-success-heading">Got it.</h3>
                <p className="v4-footer__form-success-text">
                  Watch for a reply at {submittedEmail}. Usually same day.
                </p>
              </div>
            ) : (
              <form className="v4-footer__form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot — invisible to humans, irresistible to naive bots.
                    If filled, handleSubmit short-circuits to success without
                    contacting the backend. */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                />
                <div className="v4-footer__form-field">
                  <label className="v4-footer__form-label" htmlFor="contact-name">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="v4-footer__form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="v4-footer__form-field">
                  <label className="v4-footer__form-label" htmlFor="contact-email">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="v4-footer__form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="v4-footer__form-field">
                  <label className="v4-footer__form-label" htmlFor="contact-company">
                    Company *
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    className="v4-footer__form-input"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="organization"
                    required
                  />
                </div>

                <div className="v4-footer__form-field">
                  <label className="v4-footer__form-label" htmlFor="contact-message">
                    What's going on *
                  </label>
                  <textarea
                    id="contact-message"
                    className="v4-footer__form-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {status === 'error' && (
                  <div
                    className="v4-footer__form-error"
                    role="alert"
                    aria-live="polite"
                  >
                    {errorMessage ||
                      'Submission failed. Please email hello@eracx.com directly.'}
                  </div>
                )}

                <div className="v4-footer__form-actions">
                  <button
                    type="submit"
                    className="v4-footer__form-submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? '· · · SENDING' : '→ SEND'}
                  </button>
                  <div className="v4-footer__form-fallback">
                    Or email{' '}
                    <a href="mailto:hello@eracx.com">hello@eracx.com</a>{' '}
                    directly. Or follow us on{' '}
                    <a
                      href="https://www.linkedin.com/company/eracx/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    .
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <nav className="v4-footer__section-nav" aria-label="Page sections">
          {SECTIONS.map(({ href, label }, i) => (
            <Fragment key={href}>
              {i > 0 && (
                <span
                  className="v4-footer__section-nav-sep"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              <a href={href}>{label}</a>
            </Fragment>
          ))}
        </nav>

        <nav className="v4-footer__external-nav" aria-label="External links">
          <a
            href="https://www.linkedin.com/company/eracx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ▸ LinkedIn
          </a>
        </nav>

        <div className="v4-footer__legal">
          <div className="v4-footer__legal-left">
            ERA
          </div>
          <div className="v4-footer__legal-right">
            © 2026 · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </section>
  )
}
