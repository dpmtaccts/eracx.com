// TeamMemberCard.tsx — single team-member card used by the §09 Team
// section. Square photo at top, name + role + bio below. Photo uses a
// CSS grayscale filter that lifts on hover.

interface Props {
  name: string
  role: string
  photoSrc: string
  photoAlt?: string
  bio: string
}

export default function TeamMemberCard({
  name,
  role,
  photoSrc,
  photoAlt,
  bio,
}: Props) {
  return (
    <article className="team-card">
      <div className="team-card-photo">
        <img src={photoSrc} alt={photoAlt ?? name} loading="lazy" />
      </div>
      <h3 className="team-card-name">{name}</h3>
      <div className="team-card-role">{role}</div>
      <p className="team-card-bio">{bio}</p>
    </article>
  )
}
