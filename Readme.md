# Responsive Websites: Le Gourmet (Restaurant) + GlobeTrek (Travel Agency)

Two responsive, Bootstrap‑based single‑page sites with a shared design system, tasteful animations, and an optional OpenAI‑powered off‑canvas chatbot (demo).

---

## Preview
- Open `restaurant.html` for the restaurant site.
- Open `travel-agency.html` for the travel agency site.
- For best results (CORS, fonts), serve this folder locally:
  ```bash
  npx serve "Responsive Website"
  # or use VS Code Live Server / any static server
  ```

## Project Structure
```
Responsive Website/
├─ restaurant.html              # Le Gourmet (Restaurant)
├─ travel-agency.html           # GlobeTrek (Travel Agency)
└─ assets/
   ├─ theme.css                 # Shared animations + focus styles
   ├─ chatbot.css               # Chat UI styles
   └─ chatbot.js                # Client‑side demo chat (OpenAI)
```

## Tech Stack
- Bootstrap 5.3 (grid, components, utilities)
- Font Awesome 6 icons
- Vanilla CSS (custom animations) and minimal JS for the chatbot + form visuals

## Features
### Shared
- Responsive grid (`container`, `row`, `col-12/col-md-6/col-lg-4`)
- Lazy‑loaded images with `object-fit: cover`
- Hover polish: lift, image zoom, CTA glow, and animated underlines
- Accessible focus rings (`:focus-visible`) and descriptive alt text
- Footer with social icons

### Restaurant — `restaurant.html`
- Navbar with brand and links
- Hero with image background + CTA
- Menu grid with 3 dish cards (image, title, description, price)
- About section (2‑column image + text)
- Contact form (name, email, message)
- Floating chat button (OpenAI demo offcanvas)

### Travel — `travel-agency.html`
- Navbar with brand and links
- Hero with scenic background + CTA
- Destinations section using Bootstrap cards (3 destinations)
- Tours section using Bootstrap accordion
- Contact form (name, email, destination select, message)
- Floating chat button (OpenAI demo offcanvas)

## Animations & Utility Classes (in `assets/theme.css`)
- `hover-lift` — subtle elevate on hover
- `card-zoom` — image zoom on card hover
- `btn-glow` — glowing CTA hover effect
- `underline-anim` — link underline reveal
- Reduced‑motion friendly (`prefers-reduced-motion` respected)

Example usage:
```html
<a class="btn btn-primary btn-glow">Explore Destinations</a>
<div class="card hover-lift card-zoom">…</div>
<a class="btn btn-outline-primary underline-anim">Learn More</a>
```

## Chatbot (Optional Demo)
A minimal client‑side demo using OpenAI’s Chat Completions API in an offcanvas panel.

- Open the chat with the floating button (bottom‑right).
- Paste your OpenAI API key (`sk-…`) in the input; it’s stored in `localStorage` for this page only.
- Pick a mode: Travel Planner or Restaurant Menu Planner.
- Start chatting.

Security note: Client‑side keys are for demos only. For production, proxy API calls via your server.

Key files:
- `assets/chatbot.js` — minimal chat flow
- `assets/chatbot.css` — chat styles

Offcanvas markup snippet (already included in both pages):
```html
<button class="btn btn-primary chat-toggle" data-bs-toggle="offcanvas" data-bs-target="#chatbot">
  <i class="fa-solid fa-message"></i>
</button>
<div class="offcanvas offcanvas-end" id="chatbot">
  <!-- API key input, mode select, messages, input form -->
</div>
```

## Accessibility
- Clear heading hierarchy and labels for form fields
- Visible focus outlines; larger tap targets for key actions
- Meaningful alt text for imagery

## How to Customize
- Colors and animation timing: `assets/theme.css`
- Card hover behavior and CTA effects: same file
- Chat prompt behavior (tone/role): `assets/chatbot.js` (`SYSTEM_TRAVEL` / `SYSTEM_RESTAURANT`)

## Image Credits
- Photos from Unsplash/Wikimedia used for development/education. Replace with your licensed assets as needed.

## License
- Educational/demo use. Replace assets and adapt for your needs.
