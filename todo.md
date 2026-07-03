# Stubborn Dragonflies TODO

## Completed (Phase 1 - Static Site)
- [x] Soft Ink design system (Cormorant Garamond + Nunito Sans, OKLCH color tokens)
- [x] Home page with hero, problem, belief shift, quiz CTA, kit teaser, waitlist sections
- [x] Quiz page with 10 questions and scoring into 5 result types
- [x] Result page with 5 result types and personalized restart scripts
- [x] Kit sales page ($17)
- [x] Waitlist page for Dragonfly Reset Club founding members
- [x] SEO layer: react-helmet-async, per-page meta tags, Open Graph, Twitter Card
- [x] JSON-LD structured data (Organization, FAQPage, Quiz, Product, Article schemas)
- [x] robots.txt and sitemap.xml
- [x] Pushed to GitHub: carla-nope/Dragonflies

## Completed (Phase 2 - Full-Stack + Blog + Systeme.io)
- [x] Upgrade to full-stack (web-db-user)
- [x] Add /blog route with blog index page
- [x] Add /blog/:slug route for individual post pages
- [x] File-based blog system: Markdown posts with frontmatter in server/posts/
- [x] Server-side blog router: list posts, get post by slug (tRPC)
- [x] Blog SEO: per-post meta tags, Article schema
- [x] Systeme.io server-side proxy router (systemeRouter.ts)
- [x] Wire quiz result email capture to Systeme.io API (subscribeQuiz)
- [x] Wire waitlist email capture to Systeme.io API (subscribeWaitlist)
- [x] Tag contacts by reset style (screen-fried, routine-rebuilder, overcommitted, rest-resistant, emotionally-stuck)
- [x] Tag waitlist contacts with optional reset style if they took quiz first
- [x] Write 2 seed blog posts as Markdown files (screen fatigue + routine restart)
- [x] Add Blog link to Nav

## Pending
- [ ] Add SYSTEME_IO_API_KEY to secrets (required to activate email capture)
- [ ] Push all Phase 2 changes to GitHub
- [ ] Add 23 remaining blog posts from keyword list
- [ ] Wire Stripe to Kit page (handleBuy placeholder ready in Kit.tsx)
- [ ] Update sitemap.xml with /blog and /blog/:slug URLs
