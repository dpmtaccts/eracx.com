/* InsureTech Buyer View theme.
   Reuses the shared v4 design tokens and theme machinery from the BetterUp
   audit so the two publications stay visually identical. Adds the channel
   accent map and the access code for this view. */

export {
  FONT,
  LIGHT,
  DARK,
  ThemeContext,
  useTheme,
  useThemeState,
  loadBetterUpFonts as loadFonts,
} from '../betterup/theme'
export type { ThemeMode, ThemePalette, ThemeContextValue } from '../betterup/theme'

// Channel accent colors, tied to the six evaluation channels.
export const CHANNEL_COLOR = {
  promise: '#F4C430', // yellow
  exec: '#1845C2', // cobalt
  proof: '#DD5C20', // rust
  sources: '#0A0A0A', // ink
  agents: '#E6195F', // magenta
  verdict: '#E6195F', // magenta
} as const

// Access code for the login gate.
export const INSURETECH_ACCESS_CODE = 'thefutureishuman'
export const INSURETECH_SESSION_KEY = 'insuretech-buyerview-auth'
export const INSURETECH_EMAIL_KEY = 'insuretech-buyerview-email'
