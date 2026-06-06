# Logos Links — Portfolio Website

A modern, professional, responsive single-page portfolio for an independent app
and web developer. Dark theme (black / dark gray / gold), smooth scroll
animations, card layouts, a filterable gallery, and an accessible lightbox.

## Run it

It's plain HTML/CSS/JS — no build step. Just open `index.html` in a browser,
or serve the folder:

```powershell
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

## Project structure

```
index.html                 All page content & sections
css/styles.css             Theme, layout, animations, responsive rules
js/script.js               Nav, scroll reveal, gallery filter, lightbox
assets/
  generate-placeholders.ps1  Regenerates the SVG placeholders
  images/
    dev/                   Brand logo, favicon, social banner
    cute-tutor/            logo.svg, feature.svg, shot1–4.svg
    schedulemsg/           logo.svg, feature.svg, shot1–4.svg
    logohub/               logo.svg, feature.svg, shot1–3.svg
```

## Using your real images

All images are placeholder SVGs. To use your own, **drop a file with the same
name into the same folder** — e.g. replace `assets/images/cute-tutor/shot1.svg`
with your screenshot. PNG/JPG work too; if you change the extension, update the
matching `src=""` in `index.html`. Recommended sizes:

- App screenshots: 9:16 (e.g. 1080×1920)
- Logos: square (e.g. 512×512)
- Feature graphics / banners: 16:9 (e.g. 1280×720)

## Adding a new project (the easy way)

Open `index.html`, copy one `<article class="project-card">…</article>` block,
paste it into the relevant section (`#apps` or `#web`), then:

1. Update the heading, tag, description, and feature lists.
2. Point the `<img>` `src` paths at a new image folder.
3. For "View Screenshots" to work, give the card's `.project-shots` and its
   button the same `data-gallery="Your App Name"` value.
4. (Optional) Add a few `<figure class="gallery-item" data-cat="app|web|logo|feature">`
   entries in the `#gallery` section.

Future-project placeholders live in the `#future` section — duplicate a
`<article class="future-card">` to add another "coming soon" slot.

## Things to personalize

- **Name / brand:** "Logos Links" appears in the navbar, hero, footer, `<title>`,
  and the JSON-LD block — search & replace to rename.
- **Links:** Play Store, "Learn More", "Visit Website", website URL, and social
  links are `href="#"` placeholders — fill them in.
- **Email** is already set to `logos.links.2025@gmail.com`.

## Notes

- Accessibility: skip link, focus styles, ARIA labels, keyboard-navigable
  lightbox (Esc / ← / →), and `prefers-reduced-motion` support.
- SEO: meta description, Open Graph tags, and Person structured data included.
- No external dependencies except Google Fonts.
