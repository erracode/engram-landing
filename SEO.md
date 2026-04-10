# SEO Optimization for Engram Landing

## ✅ Implemented SEO Features

### 1. Main Site (Landing Page)

#### Meta Tags in BaseLayout
- **Description**: "Persistent memory for AI coding agents. Agent-agnostic. Single binary. Zero dependencies."
- **Keywords**: ai, agent, memory, coding, persistent, openai, claude, anthropic, mcp, automation
- **Author**: Engram Team
- **Theme Color**: #000000 (OLED black)

#### Open Graph Tags
- og:title: "Engram — Persistent Memory for AI Agents"
- og:description: "Persistent memory for AI coding agents..."
- og:image: `/og-image.svg` (custom SVG with elephant logo and brand colors)
- og:type: website
- og:url: https://engram-landing.pages.dev
- og:site_name: Engram

#### Twitter Card
- Card type: summary_large_image
- Twitter handle: @engram
- Custom OG image

#### Favicon
- SVG favicon with elephant logo
- Responsive colors (dark/light mode)
- 32x32 optimized size

#### JSON-LD Structured Data
- SoftwareApplication schema
- Aggregate rating included
- Operating systems: macOS, Linux, Windows

### 2. Documentation (Starlight)

#### All docs automatically inherit SEO from config
- Custom head configuration in `src/config/starlight-head.ts`
- OG image with elephant logo
- Twitter card
- Proper meta tags

## 📁 Files Modified

1. `public/og-image.svg` - Custom 1200x630px OG image
2. `public/favicon.svg` - Updated elephant logo favicon
3. `src/config/seo.ts` - Centralized SEO configuration
4. `src/config/starlight-head.ts` - Starlight SEO metadata
5. `src/layouts/BaseLayout.astro` - Enhanced main site SEO
6. `astro.config.mjs` - Updated Starlight integration with custom head

## 🎨 OG Image Details

The custom OG image (`/og-image.svg`) includes:
- **Elephant logo** (existing icon)
- **Brand name** in Space Grotesk font
- **Tagline**: "Persistent Memory for AI Coding Agents"
- **Feature badges**: MEMORY 🧠 | AGENTS 🤖 | FAST ⚡
- **CTA button**: "GET STARTED"
- **Background**: Dark gradient with dot grid pattern
- **Size**: 1200x630px (optimized for social media)

## 📊 SEO Checklist

- [x] Title tags
- [x] Meta descriptions
- [x] Meta keywords
- [x] Open Graph tags
- [x] Twitter Card
- [x] Favicon (SVG)
- [x] OG Image (SVG)
- [x] JSON-LD structured data
- [x] Sitemap generated
- [x] Canonical URLs
- [x] Robots meta
- [x] Theme color
- [x] Responsive fonts

## 🚀 Deployment Notes

After building with `npm run build`:
- All assets in `/dist/` include proper SEO
- `/dist/og-image.svg` is the main OG image
- `/dist/favicon.svg` is the favicon
- Starlight docs inherit SEO automatically

## 🔍 Tools to Test

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **Schema.org Validator**: https://validator.schema.org/
5. **SEO Review Tools**: https://seoreviewtools.com/
