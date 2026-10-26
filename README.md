# Minimalist Professional Portfolio

A complete, professional, minimalist, and responsive personal portfolio website for a full-stack developer with an interest in cybersecurity.

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML document
├── favicon.svg         # Theme-colored browser icon
├── css/style.css       # Styles with CSS variables and animations
├── js/script.js        # Vanilla JavaScript interactions
├── assets/
│   ├── images/         # Project placeholder images (SVG)
│   ├── icons/          # SVG icons (resume, GitHub, LinkedIn)
│   └── resume/         # Resume download file
└── README.md           # This file
```

## ✨ Features

- **Light, professional blue-and-gray design** with CSS color variables
- **Responsive layout** - works from 375px to 1440px+
- **Smooth animations** using CSS transitions and Intersection Observer
- **Accessibility-first** - semantic HTML, keyboard navigation, focus states
- **Respects `prefers-reduced-motion`** - all animations can be disabled
- **Static website** - no build tools, no backend, runs directly in browser
- **Mobile-friendly** - hamburger menu with smooth toggle
- **Back-to-top button** - appears on scroll
- **Scroll-triggered reveals** - subtle fade/slide animations
- **Sticky navbar** - transitions on scroll with backdrop blur

## 🛠️ Customization

### Color Palette
All design tokens are defined as CSS variables in `:root`:

```css
:root {
  /* Reference palette */
  --color-light-gray: #f6f6f6;
  --color-light-blue: #d6e4f0;
  --color-royal-blue: #1e56a0;
  --color-navy-blue: #163172;

  /* Neutral helpers */
  --color-white: #ffffff;
  --color-body-text: #3a4a61;
  --color-muted-text: #4f5f76;

  /* Semantic theme tokens */
  --bg: var(--color-light-gray);
  --surface: var(--color-white);
  --primary: var(--color-royal-blue);
  --secondary: var(--color-light-blue);
  --accent: var(--color-navy-blue);
  --text-body: var(--color-body-text);
  --border: var(--color-light-blue);
}
```

Change the reference palette values at the top of `:root` to re-theme the
whole site. Sections, cards, buttons, and the footer all use the semantic
tokens.

### Replace Content

1. **Personal information**: Edit the HTML to update your name, title, and description
2. **Skills**: Add/remove tags in the `.skills-category` sections
3. **Projects**: Replace the placeholder SVGs with real project images, update titles/descriptions
4. **Contact**: Update the `mailto:` link and GitHub/LinkedIn URLs
5. **Resume**: Replace `assets/resume/resume.pdf` with your actual resume

### Add Real Project Images
Replace the SVG placeholder images in `assets/images/` with actual PNG/JPG images, or keep the SVGs as solid-color placeholders.

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
- **375px** - Mobile phones
- **768px** - Tablets  
- **1024px** - Laptops
- **1440px** - Desktop monitors

Verify:
- No horizontal overflow
- Mobile menu opens/closes properly
- Scroll animations trigger correctly
- Navbar transitions on scroll
- Back-to-top button appears/disappears
- Reduced motion preference respected

## 🎨 Design Decisions

- **Mobile-first approach** - styles cascade from small to large screens
- **`clamp()` for typography** - fluid resizing between breakpoints
- **CSS Grid + Flexbox** - for layout flexibility
- **Intersection Observer** - for scroll reveals (respects reduced motion)
- **Subtle transitions** - no distracting effects, professional feel
- **Light theme** - clean blue-and-gray palette with strong contrast

---

Built with ❤️ using HTML5, CSS3, and vanilla JavaScript.
No frameworks, no build tools, no dependencies.
