/**
 * V4Footer — §09 of v4 marketing site.
 *
 * Ink-black-ground footer that closes the page on a conversion
 * moment, not a brand moment. Form on left dominates the visual
 * weight; brand panel on right supports.
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
 * Department of Loyalty LLC fine print appears in the bottom legal
 * bar — the only place ERA's parent legal entity is named on the
 * marketing site.
 */

import { useState } from 'react'
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
        phase="§09 · CONTACT"
        meta={['DIRECT EMAIL', 'USUALLY SAME DAY', 'NO DRIP']}
      />

      <div className="v4-footer">
        <div className="v4-footer__form-section" id="contact">
          <div className="v4-footer__form-col">
            <h2 className="v4-footer__form-headline">
              Worth <em>talking</em>?
            </h2>
            <p className="v4-footer__form-subhead">
              Tell us what you're working on. We respond directly,
              usually same day. No form-fill follow-up. No drip
              sequence.
            </p>

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
                    directly.
                  </div>
                </div>
              </form>
            )}
          </div>

          <aside className="v4-footer__brand-col">
            <svg
              className="v4-footer__brand-logo"
              viewBox="0 0 20202 4387"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="ERA"
              role="img"
            >
              <path
                fill="currentColor"
                d="M3176.89 0C3844.43 0.000221299 4385.58 541.15 4385.58 1208.69V4387H1208.69C541.151 4387 0 3845.85 0 3178.31V0H3176.89ZM2244.51 2387.12C2244.51 2768.52 2553.7 3077.7 2935.1 3077.7H3657.25V2071.64H2244.51V2387.12ZM725.491 725.499V1069.83C725.491 1432.17 1019.22 1725.89 1381.55 1725.89H3657.24V1416.09C3657.24 1034.69 3348.06 725.499 2966.65 725.499H725.491Z"
              />
              <path
                fill="currentColor"
                d="M7757.49 4386.75C7570.93 4386.75 7402.01 4341.37 7250.74 4250.61C7099.48 4154.8 6975.94 4031.27 6880.14 3880C6789.38 3728.73 6744 3559.82 6744 3373.26V1013.49C6744 826.927 6789.38 658.012 6880.14 506.745C6975.94 355.478 7099.48 234.464 7250.74 143.704C7402.01 47.9012 7570.93 0 7757.49 0H10185.3C10376.9 0 10548.4 47.9012 10699.6 143.704C10850.9 234.464 10971.9 355.478 11062.7 506.745C11153.4 658.012 11198.8 826.927 11198.8 1013.49V2647.17H7644.04V3343C7644.04 3383.34 7656.65 3418.64 7681.86 3448.89C7712.11 3474.1 7747.41 3486.71 7787.74 3486.71H11198.8V4386.75H7757.49ZM7644.04 1822.77H10298.8V1043.74C10298.8 1003.41 10283.7 970.631 10253.4 945.42C10228.2 915.166 10195.4 900.039 10155.1 900.039H7787.74C7747.41 900.039 7712.11 915.166 7681.86 945.42C7656.65 970.631 7644.04 1003.41 7644.04 1043.74V1822.77Z"
              />
              <path
                fill="currentColor"
                d="M11765.9 4386.76V1013.5C11765.9 826.936 11811.3 658.021 11902.1 506.754C11997.9 355.487 12121.4 234.473 12272.7 143.713C12429 47.9104 12597.9 0.00919892 12779.4 0.00919892H15222.4V900.049H12809.7C12769.3 900.049 12734 915.175 12703.8 945.429C12678.6 970.64 12666 1003.41 12666 1043.75V4386.76H11765.9Z"
              />
              <path
                fill="currentColor"
                d="M16759.9 4386.76C16573.4 4386.76 16401.9 4341.38 16245.6 4250.62C16094.4 4154.81 15973.3 4031.28 15882.6 3880.01C15791.8 3728.74 15746.4 3559.83 15746.4 3373.27V1739.58H19301.2V1043.75C19301.2 1003.41 19286.1 970.64 19255.8 945.429C19230.6 915.175 19197.8 900.049 19157.5 900.049H15746.4V0.00919892H19187.8C19379.4 0.00919892 19550.8 47.9104 19702.1 143.713C19853.3 234.473 19974.4 355.487 20065.1 506.754C20155.9 658.021 20201.3 826.936 20201.3 1013.5V4386.76H16759.9ZM16790.2 3486.72H19301.2V2563.99H16646.5V3343.01C16646.5 3383.35 16659.1 3418.65 16684.3 3448.9C16714.5 3474.11 16749.8 3486.72 16790.2 3486.72Z"
              />
            </svg>
            <div className="v4-footer__brand-info">
              ERA<br />
              GTM SYSTEMS FOR B2B<br />
              EST. 2024
            </div>
          </aside>
        </div>

        <div className="v4-footer__base">
          <div className="v4-footer__base-col">
            <div className="v4-footer__col-header">Sections</div>
            <ul className="v4-footer__nav-list">
              {SECTIONS.map(({ href, label }) => (
                <li key={href}>
                  <a className="v4-footer__nav-link" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="v4-footer__base-col">
            <div className="v4-footer__col-header">Colophon</div>
            <p className="v4-footer__colophon">
              Set in Anton, Archivo Black, IBM Plex Sans, and JetBrains
              Mono. Built in Vite, React 19, and Tailwind 4. Hosted on
              Vercel. Issue 04, Volume One. v4.0.
            </p>
          </div>
        </div>

        <div className="v4-footer__legal">
          <div className="v4-footer__legal-left">
            ERA · A PRODUCT OF DEPARTMENT OF LOYALTY LLC
          </div>
          <div className="v4-footer__legal-right">
            © 2026 · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </section>
  )
}
