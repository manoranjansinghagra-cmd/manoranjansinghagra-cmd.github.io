# Manoranjan Singh — V44 Professional Portfolio Edition

## Deployment
Upload all files, including hidden files `.htaccess` and `_headers`, to the website public root. Replace the existing files. Keep the folder structure unchanged.

## V44 updates
- Executive portfolio overview highlighting 29+ years, ₹3,500 Cr+ portfolio, 765 kV AC and ±800 kV HVDC exposure.
- Enhanced portfolio presentation, responsive impact cards and improved executive visual hierarchy.
- Refined transmission-tower background zoom and light-sweep animation, with the existing pause-motion control retained.
- Scroll progress indicator and Back to Top control.
- Versioned local image references and cache headers: HTML always revalidates while versioned assets can be cached efficiently.
- Removed stale service-worker registration to avoid an old offline copy being served.
- Existing project history, award gallery, contact information and responsive navigation retained.

## Important profile accuracy
This edition does not add any unconfirmed new employer or joining claim. The career timeline remains as already documented in the source website.

## Hosting notes
- Apache/cPanel: upload `.htaccess`.
- Netlify: upload `_headers`.
- If Cloudflare is enabled, purge its cache once after deployment.
