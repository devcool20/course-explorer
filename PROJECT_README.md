# 🎓 Course Explorer – React Intern Assignment

A modern, responsive React application for exploring educational courses. Built with **React**, **Vite**, and **Tailwind CSS**, it includes a collapsible sidebar, markdown rendering, breadcrumbs, search, and a read‑only admin panel.

## ✨ Core Features

- **Course Explorer**
  - Collapsible three‑level navigation (Courses → Topics → Subtopics)
  - Markdown content rendering with `react‑markdown`
  - Breadcrumbs showing current location
  - Real‑time search/filter across courses and topics
  - Responsive design with dark‑mode support
  - Accessibility: keyboard navigation, ARIA labels, semantic HTML
- **Admin Panel**
  - Read‑only table of users (from `users.json`)
  - Search by name, email, or role
  - Loading, empty, and error states
- **Nice‑to‑Have**
  - Progress tracking (checkboxes, localStorage persistence, completion percentages)
  - Enhanced markdown (code blocks, tables, blockquotes)

## 🚀 Setup

1. **Prerequisites** – Node ≥ 14, npm or yarn.
2. **Install**
   ```bash
   npm install
   ```
3. **Run development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5174/` (port may vary).
4. **Build for production**
   ```bash
   npm run build
   ```
   Output is placed in the `dist/` folder.

## � Project Structure
```
react-assignment/
├─ components/          # All React components
│   ├─ CourseExplorer.jsx
│   ├─ Sidebar.jsx
│   ├─ ContentArea.jsx
│   ├─ SearchBar.jsx
│   └─ AdminPanel.jsx
├─ src/                # Data only
│   ├─ courses.json
│   └─ users.json
├─ App.jsx
├─ main.jsx
├─ index.css
├─ index.html
└─ package.json
```

## � Dependencies
- **react**, **react‑dom**, **react‑router‑dom**, **react‑markdown** (runtime)
- **vite**, **@vitejs/plugin‑react**, **tailwindcss**, **@tailwindcss/typography**, **postcss**, **autoprefixer** (dev)

---

*The project is client‑only; data is loaded from the JSON files and progress is stored in `localStorage`.*
