<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the ERA (eracx.com) project — a Vite + React Router v7 application. PostHog is initialized in `src/main.tsx` and wrapped around the entire app with `PostHogProvider` and `PostHogErrorBoundary` for automatic error capture. Environment variables are stored in `.env` using the `VITE_PUBLIC_` prefix. Thirteen business-critical events are tracked across seven files, covering the primary conversion paths: homepage CTA → contact form, and BetterUp audit access → engagement → CTA email click. Users are identified by email on two surfaces — the BetterUp audit password gate and the homepage contact form — so all downstream events are tied to known prospects.

| Event | Description | File |
|---|---|---|
| `audit_accessed` | User authenticates to the BetterUp audit; identifies the user by email | `src/pages/betterup/PasswordGate.tsx` |
| `audit_password_failed` | User submits the audit gate with invalid email or wrong password | `src/pages/betterup/PasswordGate.tsx` |
| `contact_form_submitted` | Successful homepage contact form submission; identifies user by email + company | `src/components/CTAFooter.tsx` |
| `contact_form_submission_failed` | Contact form API error or network failure | `src/components/CTAFooter.tsx` |
| `growth_simulator_mode_toggled` | User switches between Conventional and System-led scaling modes | `src/pages/GrowthSimulator.tsx` |
| `audit_view_mode_changed` | User toggles between Summary and Full view on the BetterUp audit | `src/pages/BetterUpAudit.tsx` |
| `audit_theme_toggled` | User switches dark/light theme on the BetterUp audit | `src/pages/BetterUpAudit.tsx` |
| `audit_data_layer_changed` | ERA partner switches between ERA-only and ERA+BrandHealth data layer | `src/pages/BetterUpAudit.tsx` |
| `audit_summary_cta_email_clicked` | User clicks an email contact link in the audit summary CTA block | `src/pages/betterup/SummaryView.tsx` |
| `audit_tab_clicked` | User clicks a profile tab in the LinkedIn Leadership Signals section | `src/pages/betterup/sections.tsx` |
| `audit_cta_email_clicked` | User clicks a contact email in the "What We'd Build Together" CTA — primary bottom-of-funnel conversion | `src/pages/betterup/sections.tsx` |
| `hero_cta_clicked` | User clicks "See the system" or "Talk to us" on the homepage hero | `src/components/HeroSection.tsx` |
| `nav_contact_clicked` | User clicks the Contact link in the top navigation (desktop or mobile) | `src/components/TopNav.tsx` |

## Next steps

We've built a dashboard and five insights to track user behavior from day one:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/382745/dashboard/1469684
- **Audit access funnel** (hero CTA → audit accessed → CTA email clicked): https://us.posthog.com/project/382745/insights/PTiMPxmZ
- **Contact form submissions** (daily trend, successes vs failures): https://us.posthog.com/project/382745/insights/novYjq7h
- **Audit engagement actions** (tab clicks, view mode changes, theme toggles, password failures): https://us.posthog.com/project/382745/insights/dnDbwn39
- **Growth simulator engagement** (system-led vs conventional mode toggle frequency): https://us.posthog.com/project/382745/insights/xGPjrZUZ
- **Unique users who accessed the audit** (daily unique count): https://us.posthog.com/project/382745/insights/VigHy4iS

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_node/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
