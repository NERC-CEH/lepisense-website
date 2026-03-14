# LepiSense Website

## Author
Jonas Beuchert (UKCEH)

## Date
2025-2026

## Architecture
This project is a small static website built with:

- **`index.html`** as the main entry page that loads first in the browser.
- **Bootstrap v5** for layout and ready-made UI components (buttons, grid, spacing), so pages are quicker to build and consistent.
- **UKCEH color scheme** for branding, so the site matches UKCEH visual identity.
- **HTML, CSS, and JavaScript roles**:
	- **HTML** provides the page structure and content (headings, text, forms, sections).
	- **CSS** controls visual styling and layout, including Bootstrap classes and UKCEH-themed colors.
	- **JavaScript** adds behavior and app features, such as interaction logic and service worker registration for PWA functionality.
- **Progressive Web App (PWA) support** using `manifest.json` and `service-worker.js`:
	- `manifest.json` tells devices how the app should appear when installed (name, icon, start behavior).
	- `service-worker.js` runs in the background to cache key files, helping the site load faster and still work with limited or no internet.

In simple terms: it is a normal website with a small "app-like" layer added, so users can install it and get better reliability.

## How to Edit this Website
You can edit the site in two simple ways:

1. **Edit on GitHub in your browser**
- Open the repository on GitHub.
- Open `index.html` (or another file), click the pencil icon, edit, then commit your change.

2. **Edit locally (recommended for larger changes)**
- Clone the repository to your computer.
- Open the folder in a text editor (for example, VS Code).
- Edit the files and push changes back to GitHub.

If you do not know HTML, Copilot can help a lot. A useful prompt style is:
`Add a new section after [SECTION NAME] with title [TITLE] and content [TEXT].`

Common elements used in this site:
- unordered lists
- ordered lists
- tables
- warning boxes
- accordions (including nested accordions)
- pictures

Image guidance:
- Keep uploaded pictures at **400 px on the longer side** to help pages load quickly.
- Add new pictures to the `assets/` folder.
- Use lowercase file names for pictures (for example, `solar-panel-side.jpg`).
- To add pictures in GitHub browser: open `assets/` in the repo, click **Add file** -> **Upload files**, then commit.
- To add pictures locally: copy the file into `assets/`, then `git add assets/<file>`, `git commit -m "Add image"`, and `git push`.

Privacy/cookie guidance:
- Avoid tracking scripts, analytics trackers, and non-essential cookies.
- Keep the site cookie-free where possible, so no cookie banner is required.

Change workflow:
- Minor changes (for example, content/text updates) can be committed directly to `main`.
- Major changes (for example, reordering sections, layout/style updates, or new functionality) should be made on a separate branch and submitted as a pull request with Jonas Beuchert as approver.
