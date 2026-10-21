# Recruiter-first portfolio — design references & review notes

This is a UI/content upgrade for Ulises Frías' professional CV site. The public site emphasizes customer-facing AI deployment and preserves a separate printable resume. It is not a claim that any prototype has been deployed to paying customers.

## Mobbin references (canonical links)
- Instrument — featured case study treatment: https://mobbin.com/sites/sections/05811dd7-a07a-41ae-9fa7-192b8eede1b1
- Legora — enterprise technology positioning: https://mobbin.com/sites/sections/9a5c3e79-694c-4f4a-b9c5-0a4b77462347
- Peerlist — professional profile patterns: https://mobbin.com/screens/9f726fe1-2ac1-4b46-8dac-7d02aedbdf48
- Braintrust — talent profile patterns: https://mobbin.com/screens/1649e3c9-9209-48f6-8d53-2f1f53ffc1e0

The references are inspiration, not copied assets or layouts.

## Implemented in this change
- Evidence rail immediately following the home hero: 33 source forms, 40 business owners trained, co-founder since 2017.
- Dedicated Crobi OS engineering case study, showing a conceptual workflow of context, orchestration, human permissions and execution tracing; clearly labeled private independent R&D.
- Functional project links in the selected-work list, and a top-level Crobi OS navigation shortcut.
- ATS-friendly plain text résumé at `/ulises-frias-cv-ats.txt`, alongside the printable bilingual `/resume` page.
- Better print type sizes and anchor navigation from the CV page to the portfolio.
- No third-party images or Mobbin screenshots committed.

## Content still needed before a major public relaunch
- User-approved Crobi product screenshots or a public/demo-safe architecture illustration.
- At least one customer-authorized before/after evidence artifact from a delivered engagement.
- Publicly shareable code samples, demo video or technical post proving implementation quality.
- Confirm factual claims, contact info, chronology and role titles.
- Confirm print-to-PDF page count, mobile layout and Spanish localization in actual browser previews.
- If Crobi becomes open source, add only an explicitly approved public link after license/secrets audit.

## Review
Run `npm ci && npm run build`. Check EN and ES on desktop/mobile, /resume print preview, links, anchors and ATS download.
