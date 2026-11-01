# V49 — Admin Protected Online Site Activity Dashboard

## What is protected
- The public website can **view** the latest Site Activity dashboard.
- Only a person who knows the private **Admin Access Key** can open the update panel and save data to the online Google Sheet.
- The key is checked server-side by Google Apps Script. It is **not hard-coded into the public website**.
- The browser keeps the key only in `sessionStorage` for the current tab/session.

## 1. Create the Google Sheet
1. Create a Google Sheet, e.g. `Manoranjan Site Activity Dashboard`.
2. Open **Extensions → Apps Script**.
3. Replace the default code with the supplied `Code.gs`.
4. In `Code.gs`, change `ADMIN_TOKEN` to a private key of your choice. Example: `MS@YourPrivateKey2026`.
5. Do **not** upload `Code.gs` to your public GitHub Pages root. Keep it private in Apps Script.

## 2. Deploy Apps Script
1. Click **Deploy → New deployment**.
2. Select **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone** (the sheet itself remains private).
5. Deploy and copy the Web App URL.

## 3. Connect V49
Open `index.html` and find:

`const API_URL='';`

Paste your Apps Script Web App URL between the quotes. Save and upload the updated `index.html` and website assets to GitHub Pages.

Do not put your Admin Access Key in `index.html`.

## 4. How you will update
1. Open `https://manoranjansingh.in/`.
2. Go to **Site Activity**.
3. Tap **Admin Update**.
4. Enter your private Admin Access Key.
5. Update progress and tap **Save Site Update**.
6. The data is saved to the private Google Sheet and becomes the latest public dashboard value.

## 5. Important security note
This setup protects the **update/write operation**. The latest progress is intentionally public because the dashboard is public. If you want the entire dashboard itself to be private, use Google sign-in or a dedicated authenticated backend instead.
