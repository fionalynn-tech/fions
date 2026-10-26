# Fiona Lynn Papas — Portfolio

A responsive, editorial-style personal portfolio for a full-stack developer and cybersecurity enthusiast. Built with semantic HTML, vanilla CSS, and vanilla JavaScript — no frameworks or build tools.

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML document
├── favicon.svg         # Theme-colored browser icon
├── css/style.css       # Styles with CSS variables and animations
├── js/script.js        # Vanilla JavaScript interactions
├── assets/
│   ├── images/         # Portrait images and legacy placeholder art
│   ├── icons/          # Legacy SVG icons (UI now uses inline icons)
│   └── resume/         # Resume download file
└── README.md           # This file
```

## ✨ Features

- **Layered editorial design** — oversized display type, numbered sections, and a framed portrait
- **Light blue-and-gray palette** driven by CSS custom properties
- **Subtle CSS 3D** — portrait tilt, parallax background words, and offset depth shadows
- **Browser-style project previews** built entirely in CSS
- **Responsive layout** — verified from 320px to 1440px+
- **Smooth animations** using CSS transitions and Intersection Observer
- **Accessibility-first** — semantic HTML, keyboard navigation, focus states, and a focus-trapped mobile menu
- **Respects `prefers-reduced-motion`** — tilt, parallax, and reveal animations are disabled
- **Static website** — no build tools, no backend, runs directly in the browser
- **Sticky navbar** — transitions on scroll with backdrop blur

## 🛠️ Customization

### Color Palette
All design tokens are defined as CSS variables in `:root`:

```css
:root {
  /* Reference palette */
  --color-light-gray: #f3f6fa;
  --color-light-blue: #d6e4f0;
  --color-royal-blue: #1e56a0;
  --color-navy-blue: #163172;
  --color-deep-navy: #0a1730;
  --color-white: #ffffff;

  /* Semantic theme tokens */
  --bg: var(--color-light-gray);
  --bg-soft: #e8f0f8;
  --surface: var(--color-white);
  --primary: var(--color-royal-blue);
  --secondary: var(--color-light-blue);
  --accent: var(--color-navy-blue);
  --heading: var(--color-navy-blue);
  --text-body: #43536a;
  --text-muted: #5a6a80;
  --border: rgba(22, 49, 114, 0.12);
}
```

Change the reference palette values at the top of `:root` to re-theme the
whole site. Sections, cards, buttons, and the footer all use the semantic
tokens.

### Replace Content

1. **Personal information**: Edit the hero, about, and contact copy in `index.html`
2. **Skills**: Add or remove `.tag` elements inside each `.skill-card`
3. **Projects**: Update titles, descriptions, tags, and links; the previews are CSS mockups in `index.html`
4. **Contact**: Update the `mailto:` link and GitHub/LinkedIn URLs
5. **Resume**: Replace `assets/resume/resume.pdf` with the actual resume file
6. **Portrait**: Replace `assets/images/fiona-portrait.jpg` and `fiona-portrait-540.jpg`, keeping the 3:4 aspect ratio

### Add Real Project Screenshots
The project previews are built from CSS UI mockups, so they stay sharp at any size. To use screenshots instead, replace the `.project-preview` contents with an `<img>` and keep the browser chrome around it.

### Change Navigation Links
Update the `href` attributes in the navbar to link to your actual projects or external sites.

## 🚀 Deployment

This is a static website that can be deployed to any static hosting platform:

- **GitHub Pages**: Push to a `gh-pages` branch or use GitHub Actions
- **Netlify**: Drag and drop the `portfolio/` folder or connect your Git repo
- **Vercel**: Import the project and deploy
- **Cloudflare Pages**: Connect your repository

## 📄 Running Locally

No build tools required. Simply:

1. Open `index.html` directly in your browser
2. Or run a local development server:
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Then open http://localhost:8080 in your browser
   ```

## ♿ Accessibility

- Skip link available for keyboard navigation
- Focus-visible styles on all interactive elements
- Reduced motion support via `prefers-reduced-motion`
- Semantic HTML5 markup
- ARIA labels on interactive elements
- Color contrast meets minimum ratios

## 📱 Testing

Test at these widths:
- **320px / 390px** — Mobile phones
- **768px** — Tablets
- **1024px** — Small laptops
- **1440px** — Desktop monitors

Verify:
- No horizontal overflow
- Hero stacks cleanly below 900px
- Mobile menu opens, traps focus, and closes properly
- Scroll reveals and parallax trigger correctly
- Navbar transitions on scroll
- Back-to-top button appears/disappears
- Reduced motion preference respected

## 🎨 Design Decisions

- **Editorial layout** — oversized Anton display type paired with Bricolage Grotesque body copy
- **Layered depth** — offset frames, outlined numbers, and giant background words instead of heavy 3D libraries
- **CSS Grid + Flexbox** — for the hero split, section grids, and responsive cards
- **`clamp()` for typography** — fluid resizing between breakpoints
- **Intersection Observer** — for scroll reveals (respects reduced motion)
- **Light theme** — airy blue-and-gray palette with a deep navy contact section for contrast

---

Built with ❤️ using HTML5, CSS3, and vanilla JavaScript.
No frameworks, no build tools, no dependencies.
