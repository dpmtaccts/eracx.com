// Team.tsx — §09 section for the /v3 staging homepage.
// Sits between WhatToExpect and StartHere. Three operator cards in a
// row at desktop, two at tablet (third centered underneath), single
// stack on mobile.
//
// TODO: Replace stub team data with real content from Justin.
// Need: full names, exact role titles, real photos (drop into
// /public/images/team/), and 3-4 sentence bios per person.

import TeamMemberCard from './TeamMemberCard'

interface TeamMember {
  name: string
  role: string
  photoSrc: string
  bio: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Justin Marshall',
    role: 'Founder',
    photoSrc: '/images/team/justin-placeholder.jpg',
    bio:
      "[TODO: Justin's bio, 3-4 sentences. Reference: built ERA after a career running B2B revenue programs. Believes in relationship-first GTM. Detail his background.]",
  },
  {
    name: 'Blake [Last Name TODO]',
    role: 'ICP Strategy & Deliverables',
    photoSrc: '/images/team/blake-placeholder.jpg',
    bio:
      "[TODO: Blake's bio, 3-4 sentences. Reference: leads ICP scoring and deliverables work. Detail his background.]",
  },
  {
    name: 'Jack [Last Name TODO]',
    role: '[TODO: Jack’s role]',
    photoSrc: '/images/team/jack-placeholder.jpg',
    bio:
      "[TODO: Jack's bio, 3-4 sentences. Detail his background.]",
  },
]

export default function Team() {
  return (
    <section id="team">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">09 &nbsp; Team</div>
            <h2 className="section-h2">
              Three operators.<br />
              <span className="slab">One playbook.</span>
            </h2>
          </div>
          <p className="section-lede">
            ERA is <strong>small by design.</strong> Senior operators only.
            No junior staff handing your work to a consultant who&rsquo;s
            never built a pipeline.
          </p>
        </div>

        <div className="team-grid">
          {TEAM_MEMBERS.map((m) => (
            <TeamMemberCard
              key={m.name}
              name={m.name}
              role={m.role}
              photoSrc={m.photoSrc}
              bio={m.bio}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
