# 📚 Smart Library OS

![Vue.js](https://img.shields.io/badge/vue-%2335495e.svg?style=for-the-badge&logo=vue.js&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-%23B0D235.svg?style=for-the-badge&logo=vue.js&logoColor=black)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![Gemini 3 Pro](https://img.shields.io/badge/Gemini_3_Pro-8A2BE2.svg?style=for-the-badge&logo=google&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

An intuitive, state-of-the-art **"Smart Library OS"** designed to revolutionize book management. Combining a sleek, highly responsive interface with powerful AI-driven capabilities, this project brings managing a modern library into the future. 

Built with the distinctive **"Slate & Emerald"** design theme, featuring deep slate backgrounds with vibrant emerald and teal accents.

---

## ✨ Hero Features

- 🤖 **AI-Powered Insights**: Seamlessly integrated with **Gemini 3 Pro API** to automatically generate vivid book summaries and smart tags upon addition.
- 📊 **Dynamic Analytics Dashboard**: Real-time visual insights using **Chart.js** displaying book distribution, availability, and borrowing trends.
- ⚡ **Optimized UX & Animations**: 60fps-capable micro-interactions, smooth slide-over panels for customized book details, and fluid skeleton loaders to ensure zero perceived latency.
- ⌨️ **Power User Shortcuts**: Full accessibility with global keyboard shortcuts (e.g., `Cmd+K` / `Ctrl+K` for instant search, `Esc` to close modals).
- 💾 **Persistent State**: Reliable local storage hydration managed through **Pinia**, ensuring your library is always saved between sessions.

---

## 🛠 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **AI Integration**: Google Gemini 3 Pro API
- **Data Visualization**: Chart.js / vue-chartjs
- **Build Tool**: Vite

---

## 🚀 How to Install

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/GUI-mini-project.git
cd GUI-mini-project

# 2. Install dependencies
npm install

# 3. Add environment variables for Gemini API
# Create a .env file and add your GEMINI API key:
# VITE_GEMINI_API_KEY=your_api_key_here

# 4. Start the development server
npm run dev

# 5. Build for production (optional)
npm run build
```

---

## 🗺 10-Day Development Roadmap

| Day | Milestone | Summary |
|-----|-----------|---------|
| **Day 1-2** | 🌅 **Foundation** | Initialized Vite + Vue 3 barebones, integrated Tailwind CSS, structured core layout. |
| **Day 3** | 🗄️ **State Management** | Transitioned to Pinia. Built search filtering & book availability state logic. |
| **Day 4** | 📝 **Reusable UI** | Crafted the highly reusable `BaseModal` and full `AddBookForm` with validation. |
| **Day 5** | 💾 **Persistence** | Implemented Pinia-LocalStorage hydration and completed borrow/return flows. |
| **Day 6** | 🧭 **Navigation & Core**| Upgraded sidebar with dynamic category filters and introduced the reactive `StatsGrid`. |
| **Day 7** | 🧠 **Gemini AI**| Connected Gemini 3 Pro for auto-summarization and intelligent book tagging. |
| **Day 8** | 📈 **Analytics** | Installed Chart.js. Built scalable library dashboards tracking inventory distribution. |
| **Day 9** | ✨ **UX & Animations** | Polished UI: slide-over layout animations, skeleton loaders, `BookDetailSheet` panel, and global keyboard shortcuts. |
| **Day 10** | 🚀 **Production Finale**| Final code audit, responsive testing, reverse design export, and professional documentation. |
