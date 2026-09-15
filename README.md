# Pabotik Travels

Static booking/discovery website for Pabotik Travels, designed for Maldives excursions and marine experiences.

## Run locally

From this folder, run:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Editing the site

- `data.js` contains all categories, activities, image URLs, pricing, package details, and payment methods.
- Replace the image URLs in `data.js` with licensed operator photography when available.
- Payment providers are intentionally placeholders. Add real instructions, links, currencies, and merchant details in `data.js` only after they are supplied.
- The logo area is an intentionally blank placeholder and is ready for the official logo.
- `platformConfig` in `data.js` controls the official admin email, explorer access, publisher plans, commission note, and payment status. The current publisher prices are `$10 / month` and `$99 / year`; explorers browse and book for free.

## Publisher accounts

The **List your experience** flow accepts resort, hotel, guesthouse, tour operator, and activity-provider details. It offers the editable publisher profile model and the two configured plans. The request opens an email draft to `pabotikinvestment@gmail.com` so the admin can verify the business, negotiate commission or special rates, and confirm onboarding before publishing.

The static site does not process the publisher subscription payment yet. Connect Stripe, PayPal, or another provider through a backend endpoint before charging publishers. Keep secret keys on the server, never in `app.js` or `data.js`.

## Provider availability

The reservation modal is provider-aware. Each activity has a `providerId`, provider status, selectable departure slots, guest capacity checks, and a final re-check before payment. The current slots are clearly marked as a demo provider calendar because no operator API credentials or calendar feeds are configured.

To make availability genuinely live, connect each provider adapter to one of these approved sources:

- The operator's booking API or channel manager
- An authenticated iCal/ICS calendar feed
- A Pabotik-admin availability endpoint maintained by the operator

The adapter must return the activity date, departure time, remaining capacity, and a reservation/hold token. Do not expose provider API keys in this static frontend.

## Booking email requests

After a guest completes the reservation flow, the site generates a pre-addressed email draft to `pabotikinvestment@gmail.com` containing the activity, provider, date, departure time, guest count, contact details, pickup, notes, estimated total, and selected payment method. On GitHub Pages this uses the visitor's email app and the visitor must press **Send**. Silent automatic delivery requires a backend email service or form endpoint; never put SMTP credentials in the frontend.

Property searches use the same Pabotik-owned flow. A guest selects **Request booking**, enters stay dates and guest details, and receives a prepared email draft for the admin. The property website link is informational only; Pabotik manually contacts the hotel or resort and sends the final confirmation back to the guest after availability, rates, commission, and special partner pricing are confirmed.

## Deployment / subdomain

This is a static site and can be deployed to GitHub Pages, Netlify, Vercel, or any standard web host. A live subdomain requires access to the parent domain DNS settings and hosting provider; this folder is ready to upload once that access is available.

## Admin email and subdomain

The site is configured to send drafts to `pabotikinvestment@gmail.com`. Creating a new mailbox such as `admin@bookings.yourdomain.com` cannot be completed from these static files: you must own the domain, add the email provider's MX records, verify the domain, and create the mailbox in Google Workspace, Microsoft 365, Zoho Mail, or another provider. The mailbox credentials should never be placed in this repository.
