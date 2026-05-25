# Stubborn Dragonflies — Launch Site

**Tiny resets for stubborn humans.**

A production-ready React + Tailwind static web app for the Stubborn Dragonflies digital wellness brand. Includes the full launch experience: landing page, Stubborn Reset Finder quiz, five result pages, 7-Day Kit sales page, and Dragonfly Reset Club founding member waitlist.

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, belief shift, quiz CTA, kit teaser, waitlist, founder note |
| `/quiz` | Stubborn Reset Finder — 10-question conversational quiz with scoring |
| `/result/:type` | Result page — one of five reset styles with restart script and kit CTA |
| `/kit` | 7-Day Stubborn Reset Kit sales page |
| `/waitlist` | Dragonfly Reset Club founding member waitlist form |

**Result types:** `screen-fried` · `routine-rebuilder` · `overcommitted` · `rest-resistant` · `emotionally-stuck`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | Wouter |
| Styling | Tailwind CSS 4 + custom CSS design tokens |
| UI Components | shadcn/ui (Radix primitives) |
| Animations | Framer Motion + CSS transitions |
| Build | Vite 7 |
| Package manager | pnpm |

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# TypeScript check
pnpm check

# Production build
pnpm build
```

The dev server runs at `http://localhost:3000`.

---

## GitHub Setup

### 1. Create a new repository

```bash
# From inside the project directory
git init
git add .
git commit -m "Initial commit: Stubborn Dragonflies launch site"
```

Then create a new repo at [github.com/new](https://github.com/new) and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/stubborn-dragonflies.git
git branch -M main
git push -u origin main
```

### 2. Export via Manus

In the Manus Management UI, go to **Settings → GitHub** to export the project directly to a new GitHub repository under your account.

---

## Deployment Options

### Manus Hosting (recommended)

Click the **Publish** button in the Manus Management UI header after creating a checkpoint. Manus provides built-in hosting with custom domain support at no extra cost.

### Vercel

```bash
pnpm build
# Then connect the GitHub repo to Vercel — it auto-detects Vite
```

Set the build command to `pnpm build` and output directory to `dist/public`.

### Netlify

Connect the GitHub repo to Netlify. Build command: `pnpm build`. Publish directory: `dist/public`.

---

## Customization Guide

### Connect a payment processor (Kit purchase)

The Kit page (`client/src/pages/Kit.tsx`) has a placeholder `handleBuy()` function. To connect Stripe:

1. Use `webdev_add_feature` with `feature="stripe"` in Manus to scaffold the integration.
2. Replace the `handleBuy()` alert with a Stripe Checkout redirect or embedded payment element.

### Connect an email service (Quiz + Waitlist forms)

Both the Quiz email capture and Waitlist form currently collect email locally. To connect:

- **ConvertKit / Kit.com**: POST to the ConvertKit API endpoint with the subscriber's email and tag.
- **Mailchimp**: POST to the Mailchimp subscribe endpoint.
- **Systeme.io**: Use the Systeme.io form embed or API.

Replace the `handleSubmit` and `handleEmailSubmit` functions in `Quiz.tsx` and `Waitlist.tsx` with your API call.

### Update brand copy

All copy lives directly in the page components under `client/src/pages/`. No CMS required.

### Update images

Images are hosted on Manus CDN. To replace them, upload new images with `manus-upload-file --webdev` and update the URL constants at the top of each page file.

---

## Design System

**Philosophy:** Japanese wabi-sabi meets editorial wellness — negative space as content, ink-wash aesthetic, deliberate imperfection, calm authority.

| Token | Value | Use |
|---|---|---|
| `--ink-teal` | `oklch(0.33 0.05 185)` | Primary text, buttons, borders |
| `--ink-rose` | `oklch(0.64 0.09 25)` | Accent, callouts, annotation labels |
| `--ink-moss` | `oklch(0.74 0.04 145)` | Positive indicators, list markers |
| `--ink-cream` | `oklch(0.99 0.01 90)` | Card backgrounds |
| `--ink-parchment` | `oklch(0.96 0.02 85)` | Section backgrounds |

**Fonts:** Cormorant Garamond (headings) · Nunito Sans (body) · Courier Prime (annotations, restart scripts)

---

## Roadmap

- [ ] Connect Stripe for Kit purchase
- [ ] Connect email service for quiz + waitlist
- [ ] Add blog section (digital wellness content)
- [ ] Build Dragonfly Reset Club member portal
- [ ] Add QuantumSOP cross-promotion for govcon audience

---

## Disclaimer

This site provides wellness education only. It is not medical advice, therapy, or crisis support. If you need clinical care, please contact a qualified professional.

---

*Built with Manus · Stubborn Dragonflies © 2026*
