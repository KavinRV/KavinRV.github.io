# Kavin R V — Personal Academic Website

A simple, responsive site built with plain HTML, CSS, and a little vanilla JS. No build step, no framework — just push it to GitHub and it works.

## How the site is organized

```
index.html                       Home: About + scrollable News box + Publications
news.html                        Full news page (opened from the "News" nav link)
publications/
  docqac.html                    Paper page: DocQAC (SIGIR 2026)
  breaking-tokens.html           Paper page: Breaking Token Into Concepts (EMNLP 2025 Findings)
  document-aware.html            Paper page: Document Aware Contrastive Learning (GenIR @ SIGIR 2024)
css/style.css                    All styling (colors live in the :root variables at the top)
js/main.js                       Dark-mode toggle + share buttons
assets/                          Put profile.jpg and cv.pdf here
```

Navigation behavior (as requested):
- **About** and **Publications** scroll within the home page (Publications is a smooth anchor scroll).
- **News** opens its own page (`news.html`); the home page also has a compact news box that scrolls within itself.
- Clicking a **paper title** opens that paper's own page with the abstract and links.

## Things to customize (search for `TODO` in the files)

1. **Profile photo** — drop a square-ish image at `assets/profile.jpg`. A placeholder avatar is shown until you do.
2. **CV** — drop your CV at `assets/cv.pdf`.
3. **Email + social links** — in `index.html`, the `.socials` block (LinkedIn, GitHub, X are `#` placeholders; the Google Scholar link is already real).
4. **Bio, interests, education, experience** — in `index.html`. Education entries are placeholders; the Experience entries (Dolby, IIT Kharagpur) are real.
5. **News** — edit both the short list in `index.html` and the full list in `news.html`. Format: `[Date]: news text`. The dates I used for acceptances are approximate placeholders — correct them.
6. **Colors** — the page carries the colour (mint `#C0E1D2` / sage / cream `#F6F4E8` with steel-blue and peach glows, from the two colorhunt palettes you shared), while the single bold accent is bright red `--accent: #E63946`, rationed to metal glints: the reflection that slides along the navbar edge as you scroll, the chrome ring around the portrait, the footer edge, and hover pops. Everything lives in the CSS variables at the top of `css/style.css`; the scroll-linked shine is the `--sp` variable set in `js/main.js`.
7. **Petals** — the three drifting petals are decorative; delete the `<div class="petals">` block in `index.html` to remove them.

## Adding a new publication later

1. Copy one of the files in `publications/` (e.g. `docqac.html`), rename it, and edit the title, authors, date, abstract, links, and the "Related" list.
2. Add a matching entry (an `<article class="pub">` block) at the top of the Publications list in `index.html`.
3. Optionally add a news item announcing it.

## Publishing on GitHub Pages

**Option A — user site (recommended):** the site lives at `https://<username>.github.io`

1. Create a **public** repo named exactly `<username>.github.io`.
2. Put the *contents* of this folder at the repo root (index.html must be at the top level):
   ```bash
   cd kavin-website
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```
3. Wait a minute or two, then visit `https://<username>.github.io`.

**Option B — project site:** the site lives at `https://<username>.github.io/<repo-name>`

1. Push this folder to any public repo.
2. On GitHub: **Settings → Pages → Source: Deploy from a branch → main → / (root) → Save.**

## Previewing locally

```bash
cd kavin-website
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening index.html directly in a browser also works.)
