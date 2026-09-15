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

## Provider availability

The reservation modal is provider-aware. Each activity has a `providerId`, provider status, selectable departure slots, guest capacity checks, and a final re-check before payment. The current slots are clearly marked as a demo provider calendar because no operator API credentials or calendar feeds are configured.

To make availability genuinely live, connect each provider adapter to one of these approved sources:

- The operator's booking API or channel manager
- An authenticated iCal/ICS calendar feed
- A Pabotik-admin availability endpoint maintained by the operator

The adapter must return the activity date, departure time, remaining capacity, and a reservation/hold token. Do not expose provider API keys in this static frontend.

## Deployment / subdomain

This is a static site and can be deployed to GitHub Pages, Netlify, Vercel, or any standard web host. A live subdomain requires access to the parent domain DNS settings and hosting provider; this folder is ready to upload once that access is available.
