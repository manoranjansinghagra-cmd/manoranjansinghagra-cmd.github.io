# V50 — User ID + Password Protected Online Site Activity Dashboard

## Login
The public dashboard is view-only. Only the administrator can update site activity.

Initial credentials supplied in `Code.gs`:
- User ID: `manoranjan.admin`
- Password: Set your own password in Code.gs before deployment.

**Change these two values in `Code.gs` before deployment if you want your own credentials.**

## Google Apps Script setup
1. Create/open the Google Sheet that will store site updates.
2. Extensions → Apps Script.
3. Replace the Apps Script code with the included `Code.gs`.
4. Change `ADMIN_USER_ID` and `ADMIN_PASSWORD` if desired.
5. Deploy → New deployment → Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Copy the Web App URL.
9. Open `index.html` and set `API_URL` to that Web App URL.
10. Upload the website files to GitHub Pages.

## How it works
- Visitors can view the latest dashboard data without logging in.
- Admin login uses User ID + Password via HTTPS POST.
- On successful login, Apps Script issues a short-lived session token (6 hours).
- The password itself is not stored in the browser.
- Site updates require the session token and are saved to the Google Sheet.
- Logout clears the browser session token.

Do not publish `Code.gs` publicly. Keep your Google Apps Script project private.
