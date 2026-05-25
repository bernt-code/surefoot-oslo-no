# Surefoot Oslo — Production Port

Deploy-ready static HTML/CSS/JS files for `surefoot.no`. Drop the contents of this folder into the root of the [bernt-code/surefoot-oslo-no](https://github.com/bernt-code/surefoot-oslo-no) repo.

## What's in here

| File | Replaces in repo | Notes |
|---|---|---|
| `index.html` | `/index.html` | Cinematic homepage |
| `style.css` | `/style.css` | New global stylesheet — Oswald + Inter + Surefoot red |
| `main.js` | `/main.js` | Scroll-detection, stat counters, sticky book bar, FAQ accordion |
| `assets/hero-panorama.jpeg` | new file | 240KB, 2400×827 panorama hero image |
| `bootfitting/index.html` | `/bootfitting/index.html` | 6-step process detail + price excerpt + reviews |
| `alpinstovler/index.html` | `/alpinstovler/index.html` | Brand lineup + guide cards linking to SEO subpages |
| `innerstovler/index.html` | `/innerstovler/index.html` | Foam vs heat-mold table + FAQ |
| `saler/index.html` | `/saler/index.html` | 4-variant insole table + interlude |
| `tjenester/index.html` | `/tjenester/index.html` | Full 8-row price table + fit guarantee |
| `faq/index.html` | `/faq/index.html` | 12-question accordion |
| `om-oss/index.html` | `/om-oss/index.html` | Brand story + team grid + stats |
| `kontakt/index.html` | `/kontakt/index.html` | Address + map + contact form |

## Deploy steps (with Claude Code)

```
cd surefoot-oslo-no
# Copy entire surefoot-port/ contents into repo root
cp -r .../surefoot-port/* .

# Commit + push, Netlify auto-deploys
git add -A
git commit -m "Cinematic redesign — 8 pages + global styles"
git push
```

## What's preserved

- **All URLs** — `/bootfitting/`, `/alpinstovler/`, `/innerstovler/`, `/saler/`, `/tjenester/`, `/faq/`, `/om-oss/`, `/kontakt/`, `/personvern/`, `/kjopsvilkar/`, and all SEO sub-pages
- **No 301 redirects needed** — pure design change
- **Acuity booking link** (`surefootskiing.as.me`) and **Shopify store** (`surefootoslo.myshopify.com`) untouched
- **Sitemap.xml** and **robots.txt** unaffected
- **Real address** Karenslyst Allé 12–14, phone 22 44 21 12 used throughout

## Sub-pages

All 8 primary sub-pages are now ported with the cinematic look:

- `/bootfitting/` — 6-step process detail
- `/alpinstovler/` — brand lineup + links to 6 SEO guide subpages
- `/innerstovler/` — foam vs heat-mold variants, 4 products
- `/saler/` — 4 insole types (ski / sport / walking / etterpar)
- `/tjenester/` — full 8-row pricing table + fit guarantee
- `/faq/` — 12-question accordion
- `/om-oss/` — brand story + 4-person team grid
- `/kontakt/` — map + contact form

The 26 deep SEO sub-pages (`/26-vs-265-alpinstovler/`, `/alpinstovler-dame/` etc) will inherit the new global look via `/style.css` immediately — their internal layouts still use the old structural HTML and will look mixed until each one is redesigned individually. These are typically thinner content pages so the inherited styling is mostly fine.

## Known issues / next steps

- 26 deep SEO sub-pages inherit global look but need internal layout cleanup (low priority — they're text-heavy guides)
- Product/team images currently use gradient placeholders — swap with real photography when ready
- Maps are SVG placeholders — swap to Google Maps embed when ready
- Need real Google Reviews/Facebook API hookup for live review pulling

## CSS class compatibility

Where possible the new stylesheet keeps existing class names so the old markup doesn't break visually mid-migration:

- `.btn-dark`, `.btn-white`, `.btn-border`, `.btn-outline-dark` — repurposed to new look
- `.site-nav`, `.nav-links`, `.nav-book`, `.nav-toggle` — unchanged structure
- `.section-wrap`, `.section-h2`, `.section-label` — repurposed
- `.faq-q`, `.faq-a`, `.faq-item.open`, global `toggle(btn)` — backward compatible
- `.services-table`, `.svc-num`, `.svc-name`, `.svc-price` — repurposed
- `.review-card`, `.reviews-grid` — repurposed
- `.kd-label`, `.kd-value`, `.kontakt-grid` — repurposed
- `.strip`, `.strip-item`, `.strip-dot` — repurposed (now dark, was white)
- `.footer-inner`, `.footer-col`, `.footer-bottom` — repurposed

## What's new (no existing equivalents)

- `.utility-strip` — red top bar
- `.hero-panorama`, `.hero-veil`, `.hero-credit`, `.hero-meta` — cinematic hero
- `.statbar` — animated stat counters
- `.cat-grid`, `.cat` — 4-product-category tiles
- `.interlude`, `.interlude--right` — full-bleed photo splits
- `.marquee` — running ticker
- `.sticky-book` — bottom-fixed booking bar
- `.chip` — small inline labels
- `.eyebrow` — replaces `.section-label`
