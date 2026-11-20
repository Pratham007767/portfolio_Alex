# 🚀 Modern Developer Portfolio

A sleek, responsive, and high-performance personal portfolio website built with pure HTML5, CSS3, and JavaScript. Zero complex dependencies, zero build steps required—ready to run out of the box.

---

## ✨ Features

- **🌓 Dynamic Dark & Light Theme**: Smooth color transition with auto system preference detection and `localStorage` persistence.
- **⚡ Typing Role Animation**: Engaging typewriter effect cycling through developer titles.
- **📱 Fully Responsive**: Fluid layouts with modern CSS Grid, Flexbox, and `clamp()` typography optimized for desktops, tablets, and phones.
- **🎨 Glassmorphism & Micro-Interactions**: Ambient background gradients, floating badges, hover zoom cards, and smooth scroll indicators.
- **🗂️ Interactive Project Filter & Detail Modals**: Categorize projects by tech stack (Full Stack, Frontend, Mobile/API) with modal popups for deep architectural details.
- **📊 Animated Stats Counters**: IntersectionObserver-powered counter animations that activate when scrolled into view.
- **📬 Interactive Contact Form & Toast Notifications**: Functional form interaction with visual feedback states and toasts.
- **🧭 Accessible & SEO Friendly**: Semantic HTML5 markup, ARIA labels, and Open Graph metadata tags.

---

## 📁 File Structure

```text
├── index.html       # Semantic HTML5 layout and sections
├── style.css        # CSS variables, themes, animations, and responsive media queries
├── script.js        # Dynamic typing, theme toggle, modal popups, filters, toast notifications
└── README.md        # Documentation and customization guide
```

---

## 🛠️ Quick Start & Local Preview

You can open the project directly in your browser:

### Option 1: Direct File Open
Double-click `index.html` in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: Local HTTP Server (Python)
If you have Python installed, run:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

### Option 3: Local HTTP Server (Node.js)
```bash
npx serve .
```

---

## ✏️ How to Customize

1. **Personal Information**:
   - Open `index.html` and search for `Alex Morgan` to replace with your name.
   - Update the bio paragraphs in `#about`.
   - Update social links (`hero-socials`), email address, and location.

2. **Roles & Typing Effect**:
   - Open `script.js` and locate the `roles` array (around line 125):
     ```javascript
     const roles = [
       'Full Stack Engineer',
       'React & Node.js Developer',
       'UI/UX Enthusiast'
     ];
     ```
   - Add or modify the titles you want to display.

3. **Projects Showcase**:
   - Update cards in `#projects` within `index.html`.
   - Update corresponding modal details in `script.js` inside the `projectData` object.

4. **Colors & Themes**:
   - Open `style.css` and customize `--primary`, `--secondary`, or gradient variables in `:root` to match your personal brand.

---

## 🌐 Free Deployment Options

- **GitHub Pages**: Push this directory to a GitHub repository, go to **Settings > Pages**, and select the `main` branch.
- **Vercel**: Run `npx vercel` or import your GitHub repository on [vercel.com](https://vercel.com).
- **Netlify**: Drag and drop the project folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
