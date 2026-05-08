/**
 * V4WhatEra — §03 of v4 marketing site.
 *
 * White-ground section that answers the reader's question after seeing
 * the multi-input timeline in §02: "But what about the content I'm
 * already running?"
 *
 * Three layers stacked:
 * 1. IS/ISN'T two-column grid (white card vs ink-black card)
 * 2. Content stack directory (6 rows mapping content channels to
 *    signals to ERA actions)
 * 3. Closing pull quote: "Your content makes the warmth. We make it
 *    visible."
 *
 * Strategic purpose: position ERA as a layer that captures and
 * activates what existing content produces, not a content replacement.
 * The ink-black ISN'T card is deliberately confrontational because
 * disarming the "ERA replaces my team" objection is the most important
 * thing this section does.
 */

import type { ReactNode } from 'react'
import { V4Header } from './V4Header'

interface IsIsntItem {
  marker: string
  text: ReactNode
}

const IS_ITEMS: IsIsntItem[] = [
  { marker: '01', text: <>The <strong>signal capture layer</strong> across every channel that's already running.</> },
  { marker: '02', text: <>The <strong>scoring system</strong> that turns scattered events into one warmth number per account.</> },
  { marker: '03', text: <>The <strong>activation engine</strong> that fires the right next action when a buyer is ready.</> },
  { marker: '04', text: <>The <strong>operator team</strong> that runs the loop alongside yours.</> },
]

const ISNT_ITEMS: IsIsntItem[] = [
  { marker: '01', text: <>Your <strong>content team</strong>. We don't write your reports.</> },
  { marker: '02', text: <>Your <strong>events team</strong>. We don't host your webinars or run your booth.</> },
  { marker: '03', text: <>Your <strong>brand voice</strong>. Your CEO posts on LinkedIn. We listen to who's reacting.</> },
  { marker: '04', text: <>A <strong>magic single-touch closer</strong>. B2B doesn't work that way. Neither do we.</> },
]

const STACK_ROWS = [
  {
    num: '01',
    source: 'Your gated white papers',
    layer: 'Content layer',
    signal: 'REPORT DOWNLOAD',
    action:
      'ERA captures the download, identifies the company, scores the engagement, fires a value-driven nurture.',
  },
  {
    num: '02',
    source: 'Your webinar program',
    layer: 'Event layer',
    signal: 'WEBINAR REGISTRATION',
    action:
      'ERA scores attendees by engagement depth (showed up, stayed late, asked a question), prioritizes the warmest for outreach.',
  },
  {
    num: '03',
    source: "Your CEO's LinkedIn presence",
    layer: 'Social layer',
    signal: 'REACTION / COMMENT',
    action:
      'ERA tracks who\'s engaging across posts over time, identifies pattern engagement, fires founder-led nurture.',
  },
  {
    num: '04',
    source: 'Your conference booth or sponsored event',
    layer: 'Event layer',
    signal: 'BADGE SCAN / MEETING',
    action:
      'ERA enriches the badge data, routes to the right operator, fires post-event follow-up while warmth is at its peak.',
  },
  {
    num: '05',
    source: "Your customer's referrals",
    layer: 'Network layer',
    signal: 'WARM INTRO',
    action:
      'ERA tracks referrals by source, fast-tracks them through the loop, applies VIP scoring multipliers automatically.',
  },
  {
    num: '06',
    source: 'Your newsletter or email program',
    layer: 'Email layer',
    signal: 'OPEN / CLICK / REPLY',
    action:
      'ERA layers email engagement on top of every other signal, watches for the moment a buyer is ready, escalates to live outreach.',
  },
]

export function V4WhatEra() {
  return (
    <section className="v4-section v4-section--whatera" id="whatera">
      <V4Header
        phase="▸03 · WHAT ERA IS / ISN'T"
        meta={['SITS INSIDE YOUR STACK', 'NOT REPLACING IT']}
      />

      <div className="v4-whatera">
        <div className="v4-whatera__opener">
          <h2 className="v4-whatera__opener-display">
            We don't build and leave.<br />We run the loop with your team.
          </h2>
        </div>

        <div className="v4-whatera__header">
          <h2 className="v4-whatera__display">
            ERA doesn't replace<br />your <em>content</em>.
          </h2>
          <p className="v4-whatera__lede">
            We sit in the middle of what you already do. Your reports,
            webinars, podcast, conferences, and CEO's LinkedIn presence are{' '}
            <strong>already producing signals</strong>. Most companies just
            don't capture them, score them, or act on them in time. That's
            our job.
          </p>
        </div>

        {/* --------- IS / ISN'T --------- */}
        <div className="v4-isisnt">
          <div className="v4-isisnt__column">
            <h3 className="v4-isisnt__heading">
              What ERA <em>is</em>.
            </h3>
            <ul className="v4-isisnt__list">
              {IS_ITEMS.map(({ marker, text }) => (
                <li key={marker} className="v4-isisnt__item">
                  <span className="v4-isisnt__item-marker">{marker}</span>
                  <span className="v4-isisnt__item-text">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="v4-isisnt__column v4-isisnt__column--isnt">
            <h3 className="v4-isisnt__heading">
              What ERA <em>isn't</em>.
            </h3>
            <ul className="v4-isisnt__list">
              {ISNT_ITEMS.map(({ marker, text }) => (
                <li key={marker} className="v4-isisnt__item">
                  <span className="v4-isisnt__item-marker">{marker}</span>
                  <span className="v4-isisnt__item-text">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --------- Content stack directory --------- */}
        <div className="v4-stack-directory">
          <div className="v4-stack-directory__header">
            <h3 className="v4-stack-directory__title">
              Your content<br />is already running.
            </h3>
            <p className="v4-stack-directory__intro">
              Every channel below produces signals. Most companies miss them
              because the signals live in different tools, fire at different
              times, and never get connected to each other. ERA is the layer
              that connects them.
            </p>
          </div>

          {STACK_ROWS.map(({ num, source, layer, signal, action }) => (
            <div key={num} className="v4-stack-row">
              <div className="v4-stack-row__num">{num}</div>
              <div className="v4-stack-row__source">
                {source}
                <span className="v4-stack-row__source-meta">{layer}</span>
              </div>
              <div className="v4-stack-row__signal">{signal}</div>
              <div className="v4-stack-row__action">{action}</div>
            </div>
          ))}
        </div>

        {/* --------- Pull quote --------- */}
        <div className="v4-pullquote">
          <div className="v4-pullquote__text">
            Your content makes the warmth.<br />
            <em>We make it visible.</em>
          </div>
          <div className="v4-pullquote__attr">
            WHAT ERA DOES IN ONE LINE
          </div>
        </div>
      </div>
    </section>
  )
}
