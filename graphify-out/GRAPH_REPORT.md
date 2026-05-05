# Graph Report - D:/Orangy website  (2026-04-15)

## Corpus Check
- 1 files · ~4,361 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 121 nodes · 172 edges · 23 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Button Components|Button Components]]
- [[_COMMUNITY_Assets & Responsive System|Assets & Responsive System]]
- [[_COMMUNITY_Complex UI Components|Complex UI Components]]
- [[_COMMUNITY_Hero Decorative Assets|Hero Decorative Assets]]
- [[_COMMUNITY_Portfolio & Client Logos|Portfolio & Client Logos]]
- [[_COMMUNITY_Process Section Assets|Process Section Assets]]
- [[_COMMUNITY_Footer & CTA Zone|Footer & CTA Zone]]
- [[_COMMUNITY_Tag & Badge System|Tag & Badge System]]
- [[_COMMUNITY_Text Dark Token|Text Dark Token]]
- [[_COMMUNITY_Text Body Token|Text Body Token]]
- [[_COMMUNITY_Text Muted Token|Text Muted Token]]
- [[_COMMUNITY_Text Gray Token|Text Gray Token]]
- [[_COMMUNITY_Font Size 36 Token|Font Size 36 Token]]
- [[_COMMUNITY_Font Size 18 Token|Font Size 18 Token]]
- [[_COMMUNITY_Section Padding Token|Section Padding Token]]
- [[_COMMUNITY_Large Gap Token|Large Gap Token]]
- [[_COMMUNITY_Medium Gap Token|Medium Gap Token]]
- [[_COMMUNITY_Small Gap Token|Small Gap Token]]
- [[_COMMUNITY_XS Gap Token|XS Gap Token]]
- [[_COMMUNITY_XXS Gap Token|XXS Gap Token]]
- [[_COMMUNITY_Logo Gap Token|Logo Gap Token]]
- [[_COMMUNITY_Navbar Logo|Navbar Logo]]
- [[_COMMUNITY_Hero CTA Buttons|Hero CTA Buttons]]

## God Nodes (most connected - your core abstractions)
1. `Hero Section` - 15 edges
2. `Brand Color #FF5023` - 14 edges
3. `Preview Section` - 11 edges
4. `Process Section` - 9 edges
5. `White Color #FFFFFF` - 8 edges
6. `Works Section` - 8 edges
7. `Border Radius Card (fluid clamp 8-18px)` - 7 edges
8. `CSS Component .btn-primary` - 7 edges
9. `CSS Component .btn-email` - 7 edges
10. `CSS Component .about__card (CSS Grid 2-col gradient)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CSS Component .about__card (CSS Grid 2-col gradient)` --uses--> `Brand Color #FF5023`  [INFERRED]
  index.html → index.html  _Bridges community 0 → community 1_
- `CSS Component .clients__track` --semantically_similar_to--> `CSS Component .brands__grid (CSS Grid 5-col)`  [INFERRED] [semantically similar]
  index.html → index.html  _Bridges community 4 → community 1_
- `CSS Component .work-card__tag` --uses--> `Brand Color #FF5023`  [EXTRACTED]
  index.html → index.html  _Bridges community 0 → community 7_
- `CSS Component .expertise__item` --uses--> `Brand Color #FF5023`  [EXTRACTED]
  index.html → index.html  _Bridges community 0 → community 5_
- `CSS Component .stat-item` --uses--> `Brand Color #FF5023`  [EXTRACTED]
  index.html → index.html  _Bridges community 0 → community 2_

## Hyperedges (group relationships)
- **Brand Color System (Orange + Light Orange)** — index_token_brand, index_token_brand_light, index_component_btn_primary, index_component_navbar_cta, index_component_btn_email, index_component_preview_orange_card, index_component_work_card_tag [INFERRED 0.92]
- **Fluid Typography Scale** — index_token_fs_18, index_token_fs_20, index_token_fs_24, index_token_fs_32, index_token_fs_36, index_token_fs_40, index_token_fs_48, index_token_fs_64, index_token_fs_80, index_token_fs_128 [EXTRACTED 1.00]
- **Fluid Spacing System** — index_token_pad, index_token_gap_xl, index_token_gap_lg, index_token_gap_md, index_token_gap_sm, index_token_gap_xs, index_token_gap_2xs, index_token_logo_gap [EXTRACTED 1.00]
- **Border Radius Token System** — index_token_r_card, index_token_r_btn, index_token_r_tag, index_token_r_pill, index_token_r_big [EXTRACTED 1.00]
- **Responsive CSS Grid Components** — index_component_works_grid, index_component_process_cards, index_component_preview_grid, index_component_brands_grid, index_component_about_card [EXTRACTED 0.95]
- **Page Section Flow (top to bottom)** — index_section_hero, index_section_clients, index_section_works, index_section_process, index_section_expertise, index_section_testimonial, index_section_preview, index_section_about, index_section_brands, index_section_cta, index_section_faq, index_section_footer [EXTRACTED 1.00]
- **Neutral Background Card Components** — index_component_testimonial, index_component_preview_stats, index_component_preview_text_card, index_component_faq_item, index_component_btn_schedule [INFERRED 0.85]
- **CTA Button Group (Primary + Secondary)** — index_component_btn_primary, index_component_btn_ghost, index_component_btn_email, index_component_btn_schedule, index_component_navbar_cta [INFERRED 0.88]
- **Figma MCP Asset Dependencies** — index_asset_navbar_logo, index_asset_hero_ellipse_right, index_asset_hero_ellipse_top, index_asset_hero_ellipse_bottom, index_asset_hero_bg_icon, index_asset_work_adhiban, index_asset_work_noqstore, index_asset_work_sdl, index_asset_testimonial_photo, index_asset_footer_logo [EXTRACTED 1.00]
- **Three-Tier Responsive Breakpoint System** — index_breakpoint_1280, index_breakpoint_900, index_breakpoint_600 [EXTRACTED 1.00]

## Communities

### Community 0 - "Button Components"
Cohesion: 0.22
Nodes (19): CSS Component .btn-email, CSS Component .btn-ghost, CSS Component .btn-primary, CSS Component .btn-schedule, CSS Component .chat-bubble, CSS Component .hero__heading, CSS Component .navbar__cta, CSS Component .preview__orange-card (+11 more)

### Community 1 - "Assets & Responsive System"
Cohesion: 0.15
Nodes (19): Asset: About Section Icon, Asset: About Link Arrow, Responsive Breakpoint max-width 1280px, Responsive Breakpoint max-width 600px, Responsive Breakpoint max-width 900px, CSS Component .about, CSS Component .about__card (CSS Grid 2-col gradient), CSS Component .brand-cell (+11 more)

### Community 2 - "Complex UI Components"
Cohesion: 0.19
Nodes (17): Asset: Preview Orange Card Icon, Asset: Testimonial Photo Saravanan, CSS Component .faq-item, CSS Component .preview, CSS Component .preview__stats, CSS Component .preview__tags-card, CSS Component .preview__text-card, CSS Component .process-card (+9 more)

### Community 3 - "Hero Decorative Assets"
Cohesion: 0.15
Nodes (13): Asset: Chat Bubble Arrow Left (green), Asset: Chat Bubble Arrow Right (orange), Asset: Hero Background Icon, Asset: Hero Ellipse Bottom, Asset: Hero Ellipse Right, Asset: Hero Ellipse Top, Asset: Orangy Logo (Navbar), CSS Component .hero (+5 more)

### Community 4 - "Portfolio & Client Logos"
Cohesion: 0.17
Nodes (12): Asset: Adhiban App Screenshot, Asset: NoQstore App Screenshot, Asset: SDL App Screenshot, CSS Component .clients, CSS Component .clients__track, CSS Component .navbar, CSS Component .page-wrapper (Flexbox column), CSS Component .works (+4 more)

### Community 5 - "Process Section Assets"
Cohesion: 0.2
Nodes (10): Asset: Process Discover Sphere, Asset: Process Discover Wave, Asset: Process Ideate Image, Asset: Process Validate Image, CSS Component .expertise, CSS Component .expertise__item, CSS Component .process, Expertise Section (+2 more)

### Community 6 - "Footer & CTA Zone"
Cohesion: 0.22
Nodes (9): Asset: Footer Background Icon, Asset: Footer Logo, CSS Component .cta, CSS Component .faq, CSS Component .footer, CTA Section, FAQ Section, Footer Section (+1 more)

### Community 7 - "Tag & Badge System"
Cohesion: 0.29
Nodes (7): CSS Component .hero__sub, CSS Component .tag-pill, CSS Component .work-card__tag, Brand Light Color #FFF1ED, Font Size 24 (fluid clamp 13-30px), Border Radius Pill (9999px), Border Radius Tag (fluid clamp 12-28px)

### Community 8 - "Text Dark Token"
Cohesion: 1.0
Nodes (1): Text Dark #404040

### Community 9 - "Text Body Token"
Cohesion: 1.0
Nodes (1): Text Body #545454

### Community 10 - "Text Muted Token"
Cohesion: 1.0
Nodes (1): Text Muted #505050

### Community 11 - "Text Gray Token"
Cohesion: 1.0
Nodes (1): Text Gray #777777

### Community 12 - "Font Size 36 Token"
Cohesion: 1.0
Nodes (1): Font Size 36 (fluid clamp 16-44px)

### Community 13 - "Font Size 18 Token"
Cohesion: 1.0
Nodes (1): Font Size 18 (fluid clamp 11-22px)

### Community 14 - "Section Padding Token"
Cohesion: 1.0
Nodes (1): Spacing Pad (fluid clamp 24-130px)

### Community 15 - "Large Gap Token"
Cohesion: 1.0
Nodes (1): Gap LG (fluid clamp 20-72px)

### Community 16 - "Medium Gap Token"
Cohesion: 1.0
Nodes (1): Gap MD (fluid clamp 14-60px)

### Community 17 - "Small Gap Token"
Cohesion: 1.0
Nodes (1): Gap SM (fluid clamp 12-44px)

### Community 18 - "XS Gap Token"
Cohesion: 1.0
Nodes (1): Gap XS (fluid clamp 8-28px)

### Community 19 - "XXS Gap Token"
Cohesion: 1.0
Nodes (1): Gap 2XS (fluid clamp 6-18px)

### Community 20 - "Logo Gap Token"
Cohesion: 1.0
Nodes (1): Logo Gap (fluid clamp 20-120px)

### Community 21 - "Navbar Logo"
Cohesion: 1.0
Nodes (1): CSS Component .navbar__logo

### Community 22 - "Hero CTA Buttons"
Cohesion: 1.0
Nodes (1): CSS Component .hero__btns

## Knowledge Gaps
- **62 isolated node(s):** `Brand Light Color #FFF1ED`, `Green Color #49B55D`, `Text Dark #404040`, `Text Body #545454`, `Text Muted #505050` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Text Dark Token`** (1 nodes): `Text Dark #404040`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Text Body Token`** (1 nodes): `Text Body #545454`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Text Muted Token`** (1 nodes): `Text Muted #505050`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Text Gray Token`** (1 nodes): `Text Gray #777777`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Font Size 36 Token`** (1 nodes): `Font Size 36 (fluid clamp 16-44px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Font Size 18 Token`** (1 nodes): `Font Size 18 (fluid clamp 11-22px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Section Padding Token`** (1 nodes): `Spacing Pad (fluid clamp 24-130px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Large Gap Token`** (1 nodes): `Gap LG (fluid clamp 20-72px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Medium Gap Token`** (1 nodes): `Gap MD (fluid clamp 14-60px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Small Gap Token`** (1 nodes): `Gap SM (fluid clamp 12-44px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `XS Gap Token`** (1 nodes): `Gap XS (fluid clamp 8-28px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `XXS Gap Token`** (1 nodes): `Gap 2XS (fluid clamp 6-18px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Logo Gap Token`** (1 nodes): `Logo Gap (fluid clamp 20-120px)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navbar Logo`** (1 nodes): `CSS Component .navbar__logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero CTA Buttons`** (1 nodes): `CSS Component .hero__btns`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Hero Section` connect `Hero Decorative Assets` to `Button Components`, `Portfolio & Client Logos`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `Brand Color #FF5023` connect `Button Components` to `Assets & Responsive System`, `Complex UI Components`, `Process Section Assets`, `Tag & Badge System`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `Preview Section` connect `Complex UI Components` to `Button Components`, `Assets & Responsive System`, `Tag & Badge System`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **What connects `Brand Light Color #FFF1ED`, `Green Color #49B55D`, `Text Dark #404040` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._