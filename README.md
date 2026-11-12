# Maintenance Management portal (template)

A blank, community-neutral maintenance portal: plain HTML, CSS and JavaScript, ready for GitHub Pages. Colours, type and layout follow the Tapestry Research Group site.

## Pages
- `index.html`: Home. Photo slideshow hero, safety-tip ticker, Community and Staff "door" cards, contact callout
- `staff.html`: Staff tools. One card per service, with tabs for each view (Dashboard, Survey, Report, Dataset, etc.)
- `community.html`: Report a problem. What to include, urgent contacts, and how a report becomes a work order
- `404.html`: Not-found page

## Make it yours
1. **`js/config.js`**: the one file to edit. Nation and community names, phone numbers, email, office hours, the public report-form link, every staff tool link, and the safety tips. Links left as `#` show "Link coming soon" when clicked.
2. **`images/logo.png`**: replace with the community logo (square works best).
3. **`images/hero-1.jpg` to `hero-5.jpg`**: slideshow photos (about 1920×1080). `hero-2` and `hero-3` are also the Staff and Community page banners.
4. **`images/og.png`**: the preview image shown when the link is shared.
5. **Page titles**: the `<title>` and description tags at the top of each HTML file contain `[Community Name]` / `[Nation Name]`. They're filled in automatically for browsers, but update them by hand so search engines and link previews show the real names.
6. Colours live at the top of `css/style.css` (`--navy`, `--green`, etc.).

## Publish on GitHub Pages
1. Create a new repository and upload everything in this folder (keep the folder structure).
2. Settings → Pages → Deploy from a branch → `main` / root.
3. For a custom domain, add it under Settings → Pages (this creates a `CNAME` file) and point the DNS at GitHub.
