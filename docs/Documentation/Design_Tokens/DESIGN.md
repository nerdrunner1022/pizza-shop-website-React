---
name: Antonio's Corner
colors:
  background: '#0d0d0d'
  background-deep: '#0a0a0a'
  surface: '#121212'
  surface-raised: '#141414'
  surface-input: '#1a1a1a'
  on-background: '#fbf9f5'
  on-surface-variant: '#efe9dc'
  on-surface-muted: '#a39e93'
  primary: '#c85a32'
  primary-hover: '#b84e28'
  secondary: '#d9a35f'
  secondary-hover: '#c48f4e'
  tertiary: '#5b7052'
  outline: '#2a2a2a'
  success: '#34d399'
  error: '#f87171'
  info: '#93c5fd'
typography:
  display-xl:
    fontFamily: DM Serif Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
  display-lg:
    fontFamily: DM Serif Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: DM Serif Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-md:
    fontFamily: DM Serif Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-sm:
    fontFamily: DM Serif Display
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 9px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 5rem
  margin-mobile: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

Antonio's Corner is a family-run Neapolitan pizzeria with a dark, fire-lit digital presence. The system pairs the theatre of an open wood oven with the discipline of a three-day ferment: near-black surfaces, ember and gold accents, large editorial serifs, and documentary food photography. The tone is warm, confident and a little theatrical, never rustic for its own sake.

The aesthetic philosophy is **Firelit Editorial**:

- **Charcoal Atmosphere**: The page canvas is near-black (`#0D0D0D`), with deeper bands (`#0A0A0A`) for the footer and admin shell. Warm cream type keeps the room from feeling cold.
- **Ember & Gold**: Ember (`#C85A32`) is the colour of action — primary buttons, active filters, incoming orders. Gold (`#D9A35F`) is the light it throws: prices, eyebrows, focus states, one accent per composition.
- **Tactile Craft**: Photography, ingredient notes and process diagrams carry as much weight as the interface. Cards are softly rounded, borders are hairline, and shadows are warm and restrained.
- **Operational Clarity**: The admin portal reuses the same palette at higher density — smaller type, tighter tables, monospace figures and status colour used only for state.

## Colors

The palette follows the oven: charcoal and ash for the room, ember for the fire, gold for the light, basil for ingredients.

- **Primary (`#C85A32`)**: Ember. Primary actions, active tabs, live status, destructive emphasis.
- **Primary Hover (`#B84E28`)**: Deep ember for button hover and pressed states.
- **Secondary (`#D9A35F`)**: Gold. Prices, eyebrows, highlights, focus rings and icon accents.
- **Secondary Hover (`#C48F4E`)**: Gold button hover.
- **Tertiary (`#5B7052`)**: Basil. Dietary tags, success chart fills and ingredient notes. Never body text.
- **Background (`#0D0D0D`)**: Charcoal canvas for every public page.
- **Background Deep (`#0A0A0A`)**: Footer, admin shell and quiet full-width bands.
- **Surface (`#121212`)**: Panels, media wells and review cards.
- **Surface Raised (`#141414`)**: Raised cards, filter bars and tables.
- **Surface Input (`#1A1A1A`)**: Inputs, search fields and code blocks.
- **On Background (`#FBF9F5`)**: Parchment. Primary headings and body copy.
- **On Surface Variant (`#EFE9DC`)**: Secondary copy, quotes and form values.
- **On Surface Muted (`#A39E93`)**: Ash. Metadata, captions and inactive navigation.
- **Outline (`#2A2A2A`)**: Hairlines, dividers and card borders.

### Supporting Tone Tokens

- `success`: `#34D399` (positive stock, completed orders)
- `error`: `#F87171` (out of stock, destructive actions)
- `info`: `#93C5FD` (out-for-delivery status)
- `ember-wash`: `rgba(200, 90, 50, 0.15)` (active navigation, status chips)
- `gold-wash`: `rgba(217, 163, 95, 0.15)` (seasonal badges, highlights)

## Typography

Two families carry the system:

- **Headlines (`DM Serif Display`)**: Editorial, hospitable and confident. Used for page titles, section headings and card names, with tight tracking (`-0.01em` to `0`) and generous leading. Never set below 18 px.
- **Body & Controls (`Plus Jakarta Sans`)**: Clear, geometric and quietly modern. Used for descriptions, navigation, filters, forms and admin tables.
- **Data (`System monospace`)**: Prices, totals, order numbers and stock counts use the platform monospace stack so figures align across cards and tables.
- **Labels & Badges**: Uppercase `Plus Jakarta Sans` semibold or bold with `+0.12em` to `+0.2em` tracking, in gold or ash.

## Layout & Spacing

The layout uses a fluid, full-width canvas with generous outer margins rather than a boxed container:

- **Desktop**: full-width sections with 64–80 px horizontal padding, 96 px vertical section rhythm, and a 12-column grid for split editorial layouts.
- **Tablet**: 48 px horizontal padding, stacked split layouts, two-column card grids.
- **Mobile**: 24 px horizontal padding, single-column cards, horizontally scrollable category tabs and full-width primary actions.
- **Admin**: a fixed 264–288 px sidebar on desktop, collapsing to a top bar and disclosure menu below 768 px; content capped near 1400 px with 24–40 px padding.

## Elevation & Depth

Depth is built from surface steps and hairlines rather than heavy shadows:

- **Level 0 — Canvas**: `#0D0D0D` with `1px solid rgba(255, 255, 255, 0.06)` structural borders.
- **Level 1 — Panels**: `#121212` with a subtle border and no shadow; used for story blocks, review cards and admin panels.
- **Level 2 — Raised Cards**: `#141414` with `1px solid rgba(255, 255, 255, 0.10)`; hover lifts the border to 20% white.
- **Level 3 — Modals & Drawers**: `#141414` on an 80% black backdrop with blur; one soft, warm ambient shadow.
- **Ember Glow**: Primary actions carry a low-opacity ember shadow (`0 0 30px rgba(200, 90, 50, 0.35)`) to suggest heat without becoming neon.

## Shapes

The system is **Soft Architectural** — rounded enough to feel hospitable, precise enough for dense admin work:

- **Pills**: Primary buttons, filter tabs, badges and status chips use `9999px` radii.
- **Cards**: `1rem`–`1.5rem` radii (`rounded-2xl` / `rounded-3xl`) for menu cards, panels and modals.
- **Inputs**: `0.75rem`–`1rem` radii with a 1 px inner border.
- **Media**: Large image wells use `1rem`–`1.5rem` radii; full-bleed hero imagery is square to the viewport.
- **Tables**: Square cells inside a rounded panel; row separation comes from `1px` hairlines, not alternating heavy fills.

## Components

### Buttons

- **Primary Ember**: Gradient from `#C85A32` to `#B84E28`, white uppercase label (`12px`, `600`, `+0.2em`), full pill, 14–16 px vertical padding, warm ember glow on hover.
- **Gold Action**: Solid `#D9A35F` with `#0D0D0D` text; hover deepens to `#C48F4E`. Used for oven and dispatch actions in admin.
- **Secondary / Ghost**: `rgba(255, 255, 255, 0.05)` fill, `1px solid rgba(255, 255, 255, 0.10)` border, cream text; hover raises to 10% white.
- **Text Link**: Gold or cream with a trailing arrow that translates 4 px on hover.

### Chips & Badges

- Category filters are pill tabs: active state is solid ember with white text; inactive is 5% white with ash text.
- Dietary tags use small outlined pills with basil or gold text; status chips use a tinted wash plus a matching 1 px border.
- Eyebrows sit above headings in gold uppercase `Plus Jakarta Sans` with wide tracking.

### Input Fields

- Background `rgba(0, 0, 0, 0.4)` or `#1A1A1A`, border `1px solid rgba(255, 255, 255, 0.10)`, radius `0.75rem`.
- Text is cream; placeholder is ash at 50% opacity.
- Focus shifts the border to gold (`#D9A35F`) with a soft gold ring. Invalid states use `#F87171` text and border.
- Number inputs in admin suppress native spinners and provide explicit stepper buttons.

### Cards

- **Menu Card**: `#141414` surface, `1px` white/10 border, `1rem` radius; image on top, Italian name in gold italic, English name in serif, description in ash, price in monospace gold.
- **Review Card**: `#121212` surface with star row in gold, quote in cream, attribution in ash.
- **Order Card**: `#141414` with a black/40 inset item well, monospace order number and a status-coloured border.

### Modals & Drawers

- Customization modal and full-page admin editor: centered `#141414` panel, `1.5rem` radius, 80% black backdrop with blur, close control at top right.
- Cart drawer: right-anchored panel with a sticky summary footer; line items use compact monospace pricing.
- Focus is trapped inside modals; escape and backdrop clicks close them.

### Data Tables

- Header row uses uppercase gold labels at `10px` with +0.12em tracking.
- Rows are separated by `1px` white/5 hairlines; hover uses 5% white.
- Prices and counts are monospace; status is a tinted pill; destructive actions appear on hover in red.

### Navigation

- Public header: transparent over the hero, then a blurred charcoal bar after scroll; links in `12px` uppercase with wide tracking.
- Footer: four-column layout with brand statement, address, hours and route links, plus a 3D-model credits band.
- Admin: fixed sidebar with gold iconography, ember-washed active row, live-order badge and a station clock in the top bar.
