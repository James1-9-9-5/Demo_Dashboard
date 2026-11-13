# Maintenance Management portal (template)

A blank, community-neutral maintenance portal: plain HTML, CSS and JavaScript, ready for GitHub Pages. No build step and no Jekyll.

## Pages
- `poster.html`: printable QR poster (Letter or A4) for notice boards. Linked from the Community page and the footer.
- `offline.html`: shown when the site is opened from a phone home screen with no signal
- `index.html`: Home. Split hero with a photo slideshow, a safety-tip strip, Community and Staff photo cards, and a contact panel
- `staff.html`: Staff tools. One card per service, with tabs for each view (Dashboard, Survey, Report, Dataset, Files and so on)
- `community.html`: Report a problem. What to include, urgent contacts, and how a report becomes a work order. Prints cleanly for notice boards.
- `404.html`: Not-found page

## Make it yours
1. **`js/config.js`** is the one file to edit:
   - **Brand colours:** set `brand.primary` (a dark colour) and `brand.accent` (a highlight colour), picked from the Nation's logo. Every button, icon, badge and tint updates, and shades are adjusted automatically so text stays readable.
   - Seasonal maintenance tips (Home page) and the FAQ (Community page)
   - Nation and community names, and an optional greeting in the Nation's language (set it to `""` to hide it)
   - The icon for each staff service (`wrench`, `house`, `lifebuoy`, `box`, `truck`, `water`, `bolt` or `tree`)
   - The **notice banner** text, its colour (`info`, `warning` or `alert`), and on/off. Change `id` whenever you post a new notice.
   - Phone numbers, email, office hours, the footer "about" text and the "last updated" date
   - The public report-form link, every staff tool link, and the safety tips

   Links left as `#` show "Link coming soon" when clicked.
2. **Images** in `images/` (keep the same file names, or update them in the HTML):
   - **Logo:** add the Nation's logo (e.g. `images/logo.png`) and set `logo: "images/logo.png"` in `config.js`. Until then a "Nation's logo" placeholder shows in the header and footer.
   - `favicon.svg`, `favicon-32.png` and `apple-touch-icon.png`: neutral placeholder browser icons. Replace with versions of the logo.
   - `hero-1.jpg` to `hero-5.jpg`: home slideshow (about 1400 wide, landscape). File names must be lowercase: GitHub Pages treats `Hero-1.jpg` and `hero-1.jpg` as different files.
   - `community.jpg` and `staff.jpg`: home card photos (1200 wide)
   - `staff-header.jpg` and `community-header.jpg`: page header photos (1200 wide)
   - `og.png`: the preview image when the link is shared (1200×630)

   Keep photos under about 250 KB each so the site loads quickly on slower connections.
3. **Page titles:** the `<title>` and description tags at the top of each HTML file contain `[Community Name]` and `[Nation Name]`. Replace them by hand so search engines and link previews show the real names.
4. **Colours** are at the top of `css/style.css` (`--navy`, `--green` and so on). Text colours have been checked against WCAG AA contrast.

## Install to phone
The site is a Progressive Web App. On a phone, open the site and choose **Add to Home Screen** (Safari share menu on iPhone, or the ⋮ menu → **Install app** on Android). It then opens full-screen like an app, and if there's no signal it shows `offline.html` with the phone numbers. This only works on the live https site, not when opening the files locally.
- App name and colours for the home-screen icon are in `manifest.webmanifest`. Update `name`, `short_name` and `theme_color` for each Nation.
- Icons: `images/icon-192.png`, `icon-512.png` and `icon-maskable-512.png`. Replace them with versions of the Nation's logo.
- After a big update, change `VERSION` at the top of `sw.js` so phones refresh their saved copy.

## Printable poster
`poster.html` builds the QR code automatically. If `reportUrl` is set in `config.js`, the code goes straight to the report form. If not, it goes to the site's Community page. Choose Letter or A4, then **Print poster**. In the print dialog, turn on "Background graphics" and set margins to "None".

## Photos
All photos share one colour grade (slightly muted colour, navy-tinted shadows, warm highlights) so images from different sources look like a set. When you swap in new photos, keep a similar look or ask for the same grade to be applied.

## Publish on GitHub Pages
1. Upload everything in this folder to the root of the repository.
2. Go to Settings → Pages → Deploy from a branch → `main` / root.
3. Custom domain: add it under Settings → Pages, then add a CNAME record at your DNS provider pointing the subdomain to `<username>.github.io`.
