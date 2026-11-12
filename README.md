# Maintenance Management portal (template)

A blank, community-neutral maintenance portal: plain HTML, CSS and JavaScript, ready for GitHub Pages. No build step and no Jekyll.

## Pages
- `index.html`: Home. Split hero with a photo slideshow, a safety-tip strip, Community and Staff photo cards, and a contact panel
- `staff.html`: Staff tools. One card per service, with tabs for each view (Dashboard, Survey, Report, Dataset, Files and so on)
- `community.html`: Report a problem. What to include, urgent contacts, and how a report becomes a work order. Prints cleanly for notice boards.
- `404.html`: Not-found page

## Make it yours
1. **`js/config.js`** is the one file to edit:
   - Nation and community names, and an optional greeting in the Nation's language (set it to `""` to hide it)
   - The **notice banner** text, its colour (`info`, `warning` or `alert`), and on/off. Change `id` whenever you post a new notice.
   - Phone numbers, email, office hours, the footer "about" text and the "last updated" date
   - The public report-form link, every staff tool link, and the safety tips

   Links left as `#` show "Link coming soon" when clicked.
2. **Images** in `images/` (keep the same file names, or update them in the HTML):
   - `logo.png`: community logo (square). Also update `favicon-32.png` (32×32) and `apple-touch-icon.png` (180×180).
   - `hero-1.jpg` to `hero-5.jpg`: home slideshow (1600×900)
   - `door-community.jpg` and `door-staff.jpg`: home card photos (1200×600)
   - `banner-staff.jpg` and `banner-community.jpg`: page header photos (1200×800)
   - `og.png`: the preview image when the link is shared (1200×630)

   Keep photos under about 250 KB each so the site loads quickly on slower connections.
3. **Page titles:** the `<title>` and description tags at the top of each HTML file contain `[Community Name]` and `[Nation Name]`. Replace them by hand so search engines and link previews show the real names.
4. **Colours** are at the top of `css/style.css` (`--navy`, `--green` and so on). Text colours have been checked against WCAG AA contrast.

## Publish on GitHub Pages
1. Upload everything in this folder to the root of the repository.
2. Go to Settings → Pages → Deploy from a branch → `main` / root.
3. Custom domain: add it under Settings → Pages, then add a CNAME record at your DNS provider pointing the subdomain to `<username>.github.io`.
