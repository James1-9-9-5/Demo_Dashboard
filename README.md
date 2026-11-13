# Maintenance Management portal (template)

A blank, community-neutral maintenance portal: plain HTML, CSS and JavaScript, ready for GitHub Pages. No build step and no Jekyll.

## Pages
- `poster.html`: printable QR poster (Letter or A4) for notice boards. Linked from the Community page and the footer.
- `offline.html`: shown when the site is opened from a phone home screen with no signal
- `index.html`: Home. Split hero with a photo slideshow, a safety-tip strip, Community and Staff photo cards, and a contact panel
- `staff.html`: Staff tools. One card per service, with tabs for each view (Dashboard, Survey, Report, Dataset, Files and so on)
- `community.html`: Report a problem. What to include, urgent contacts, and how a report becomes a work order. Prints cleanly for notice boards.
- `404.html`: Not-found page

## Demo mode
This copy is set up as a demo branded for **Tapestry Research Group**, with a small "Demo site" tag in the footer. To set it up for a real community:
1. In `js/config.js`, set `demo: false` and change `nation`, `community`, contacts, links and photos.
2. Replace "Tapestry" in the `<title>` and description tags at the top of each HTML file, in `poster.html`, and in `manifest.webmanifest`.

## Make it yours
1. **`js/config.js`** is the one file to edit:
   - **Brand colours:** set `brand.primary` (a dark colour) and `brand.accent` (a highlight colour), picked from the Nation's logo. Every button, icon, badge and tint updates, and shades are adjusted automatically so text stays readable.
   - Seasonal maintenance tips (the current season's are mixed into the tip ticker) and the FAQ (Community page)
   - `staffHelp`: who staff contact when they can't get into a tool, and the link to the system manual (Staff page)
   - Nation and community names, and an optional greeting in the Nation's language (set it to `""` to hide it)
   - The icon for each staff service (`wrench`, `house`, `lifebuoy`, `box`, `truck`, `water`, `bolt` or `tree`)
   - The **notice banner** text, its colour (`info`, `warning` or `alert`), and on/off. Change `id` whenever you post a new notice.
   - Phone numbers, email, office hours, the footer "about" text and the "last updated" date
   - The public report-form link, every staff tool link, and the safety tips

   Links left as `#` show "Link coming soon" when clicked.
2. **Images** in `images/` (keep the same file names, or update them in the HTML):
   - **Logo:** `images/logo.png` (square PNG with a transparent background, 512×512). The demo uses the Tapestry logo. Set `logo: ""` in `config.js` to show the "Nation's logo" placeholder instead.
   - `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` and the `icon-*.png` app icons are made from the demo badge. Replace them with versions of the Nation's logo.
   - `hero-1.jpg` to `hero-5.jpg`: home slideshow (1200 wide, landscape). Only the first loads straight away; each of the others loads just before it's shown. File names must be lowercase: GitHub Pages treats `Hero-1.jpg` and `hero-1.jpg` as different files.
   - `community.jpg` and `staff.jpg`: home card photos (1200 wide)
   - `staff-header.jpg` and `community-header.jpg`: page header photos (900 wide)
   - `og.png`: the preview image when the link is shared (1200×630)

   Keep photos under about 250 KB each so the site loads quickly on slower connections.
3. **Your web address:** the link-preview tags (`og:image`, `og:url`) in each HTML file use `https://demo.jamesspooner.org`. Change this to the Nation's domain when you set up a new copy, or link previews won't show the image.
4. **Page titles:** the `<title>` and description tags at the top of each HTML file contain `[Community Name]` and `[Nation Name]`. Replace them by hand so search engines and link previews show the real names.
5. **Colours** are at the top of `css/style.css` (`--navy`, `--green` and so on). Text colours have been checked against WCAG AA contrast.

## Fonts
Archivo (headings), IBM Plex Sans (text) and IBM Plex Mono (labels, phone numbers, photo captions) are stored in `/fonts`, so no Google Fonts connection is needed. All three use the SIL Open Font License, and the licence files are in the same folder.

## Install to phone
The site is a Progressive Web App. On a phone, open the site and choose **Add to Home Screen** (Safari share menu on iPhone, or the ⋮ menu → **Install app** on Android). It then opens full-screen like an app, and if there's no signal it shows `offline.html` with the phone numbers. This only works on the live https site, not when opening the files locally.
- App name and colours for the home-screen icon are in `manifest.webmanifest`. Update `name`, `short_name` and `theme_color` for each Nation.
- Icons: `images/icon-192.png`, `icon-512.png` and `icon-maskable-512.png`. Replace them with versions of the Nation's logo.
- After a big update, change `VERSION` at the top of `sw.js` so phones refresh their saved copy.

## Printable poster
`poster.html` builds the QR code automatically. If `reportUrl` is set in `config.js`, the code goes straight to the report form. If not, it goes to the site's Community page. Choose Letter or A4, then **Print poster**. In the print dialog, turn on "Background graphics" and set margins to "None".

## Photos
Each photo's crop point and caption are set in `js/config.js` under `photos`. `focus` is "left% top%": "50% 50%" centres the crop, "30% 40%" moves it left and up. The hero captions show as a numbered field-log label (01 Waterfront homes) and change with the slideshow. Update both whenever you swap a photo.

All photos share one colour grade (slightly muted colour, slate-tinted shadows, soft highlights) so images from different sources look like a set. When you swap in new photos, keep a similar look or ask for the same grade to be applied.

## Publish on GitHub Pages
1. Upload everything in this folder to the root of the repository.
2. Go to Settings → Pages → Deploy from a branch → `main` / root.
3. Custom domain: add it under Settings → Pages, then add a CNAME record at your DNS provider pointing the subdomain to `<username>.github.io`.
