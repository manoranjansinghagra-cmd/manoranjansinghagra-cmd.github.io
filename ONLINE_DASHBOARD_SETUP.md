# V45 — Online Site Activity Dashboard Setup

This version supports two modes:
- **Local mode:** works immediately in the browser.
- **Online mode:** syncs updates to a Google Sheet through Google Apps Script, so the dashboard can be viewed from any device.

## 1. Create the online database
1. Create a new Google Sheet, e.g. `Manoranjan Site Activity Dashboard`.
2. Open **Extensions → Apps Script**.
3. Delete the default code and paste the contents of `Code.gs`.
4. Change `ADMIN_TOKEN = 'CHANGE_THIS_TOKEN'` to a private token of your choice.
5. Click **Deploy → New deployment**.
6. Select **Web app**.
7. Execute as: **Me**.
8. Who has access: **Anyone** (or the most suitable access allowed by your Google account).
9. Deploy and copy the Web App URL.

## 2. Connect the website
Open `index.html` and find:

`const API_URL='';`

Paste your Web App URL between the quotes.

Then set:

`const API_TOKEN='';`

to the same token used in `Code.gs`.

Save `index.html` and upload it to your GitHub Pages root.

## 3. How to update from mobile
Open `manoranjansingh.in` → **Site Activity** → **Update Site Activity**.
Enter:
- Project / Site
- Reporting Date
- RAG status
- Planned %
- Actual %
- Manpower
- Equipment / T&P
- Today's Focus
- Key Issue / Remark
- Activity-wise Planned / Actual %

Tap **Save Site Update**.

The update is saved to the Google Sheet and becomes the latest dashboard data.

## 4. Important security note
Do not publish the Google Sheet itself publicly. The website only needs the Apps Script Web App endpoint. Keep the admin token private. For stronger security, restrict the Web App access and use a proper authenticated backend.
