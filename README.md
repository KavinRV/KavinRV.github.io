# Kavin R V — Personal Academic Website

A simple, responsive site built with plain HTML, CSS, and a little vanilla JS. No build step — push it to GitHub and it works.

## How the site is organized

```
index.html                       Home: About + scrollable News box + Publications
news.html                        Full news page (grouped by year)
publications/
  docqac.html                    Paper page: DocQAC (SIGIR 2026)
  breaking-tokens.html           Paper page: Breaking Token Into Concepts (EMNLP 2025 Findings)
  document-aware.html            Paper page: Document Aware Contrastive Learning (GenIR @ SIGIR 2024)
js/data.js                       ★ ONE place to edit News + Publications (both pages render from it)
js/main.js                       Theme toggle & transition, edge effects, rendering, share links
css/style.css                    All styling (light = glass, dark = metal; variables up top)
assets/cv.pdf                    Your CV (the "CV" button links here)
```

Navigation: **About** and **Publications** live on the home page (Publications is a smooth anchor scroll); **News** opens its own page; each paper title opens its own detail page.

## Editing content — one place

- **News**: edit the `SITE_NEWS` array in `js/data.js`. Format: `{ date: "Mon YYYY", html: "…" }`, newest first. The home-page box *and* the News page update together.
- **Publications**: edit the `SITE_PUBS` array in `js/data.js` — the home-page list renders from it (title, authors, venue, buttons, Tweet link). For a brand-new paper, also copy one of the pages in `publications/` and edit its title/abstract/links, then point the entry's `page` field at it.

## Things you may still want to change

1. **Social links** — in `index.html`, the `.socials` block: email and Google Scholar are real; LinkedIn, GitHub, and X are `#` placeholders.
2. **CV** — your real CV is at `assets/cv.pdf`; replace the file whenever you update it.
3. **Profile photo** — intentionally none right now. To add one later, put an `<img>` back at the top of the `.profile-card` aside in `index.html`.
4. **Colors & moods** — light mode is frosted glass over cool mint/sage (`--bg: #B4D6CD`, `--bg-light: #DDE6DF`); dark mode is brushed gunmetal with the bright-red glint (`--accent: #E63946`). Everything lives in the variables at the top of `css/style.css`. Scroll-linked reflections use `--sp`; the theme-toggle "fortify/peel" transition (lens sweep + lingering patches + edge burst) lives in `js/main.js` + the `fx-` rules in the CSS.

## Publishing on GitHub Pages

**Option A — user site:** create a public repo named `<username>.github.io`, put the *contents* of this folder at the repo root, push. Site: `https://<username>.github.io`.

```bash
cd kavin-website
git init && git add . && git commit -m "Website"
git branch -M main
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

**Option B — project site:** push to any public repo, then **Settings → Pages → Deploy from a branch → main → / (root)**. Site: `https://<username>.github.io/<repo-name>`.

## Previewing locally

```bash
cd kavin-website
python3 -m http.server 8000   # open http://localhost:8000
```
