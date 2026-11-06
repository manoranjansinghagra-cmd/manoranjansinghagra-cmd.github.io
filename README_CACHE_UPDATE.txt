WEBSITE CACHE / REFRESH IMPROVEMENTS

1. A new “↻ Refresh” button is available in the top navigation. It reloads the page with a unique URL parameter so Chrome requests the latest page.
2. Cache-control rules are included for Apache hosting (.htaccess) and Netlify-style hosting (_headers).
3. Upload ALL files from this ZIP and overwrite the existing website files. Ensure hidden files such as .htaccess are included by your file manager/FTP client.
4. If your hosting uses cPanel/Apache, keep .htaccess in the same public_html folder as index.html.
5. If your hosting uses Netlify, keep _headers in the published root folder.
6. If a CDN such as Cloudflare is enabled, purge its cache once after uploading the new files.

Note: Meta cache tags alone cannot control every browser/CDN cache. The included server headers are the important part.
