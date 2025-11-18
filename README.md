# 🎯 School Task Manager

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.17-purple)
![Vite](https://img.shields.io/badge/Vite-7.2.2-yellow)

A smart learning task manager with support for themes, multilingualism, and notifications. Organize your learning tasks efficiently!

## ✨ Features

### 🎨 Interface
- **Adaptive design** - works on all devices
- **Dark/Light theme** - automatic detection of system settings
- **Smooth animations** - pleasant transitions between states
- **Localization** - support for Russian and English languages

### 📚 Task management
- ✅ **Creating tasks** with priorities and deadlines
- 📅 **Smart deadlines** - automatic urgency detection
- 🏷️ **Colored placemarks** for different subjects
- 🔍 **Search and filtering** by name and status
- 📊 **Sorting** by creation date, deadline, and priority
- 📈 **Statistics** for the week

### 🔔 Smart Features
- 🔔 **Notifications** about upcoming deadlines
- 💾 **Auto-save** in LocalStorage
- 🌐 **PWA-ready** - can be installed as an application
- 📱 **Offline work** - all data is stored locally

## 🚀 Quick start

### Preliminary requirements
- Node.js 18+ 
- npm or yarn

### Installation and launch
```bash
git clone https://github.com/iso-arkisto/school-task-manager.git
cd school-task-manager
```

### 🛠 Technologies
- **Frontend:** React 18 + TypeScript
- **Styles:** Tailwind CSS 4.0
- **Build:** Vite 5
- **State management:** Zustand
- **Localization:** Custom i18n solution
- **Notifications:** Browser Notification API

### 📁 Project structure

 - src/
- ├── components/          # React components
- │   ├── Header.tsx      # Header with switches
- │   ├── TaskForm.tsx    # Task creation form
- │   ├── TaskList.tsx    # The list of tasks with filters
- │   └── TaskItem.tsx    # Task element
- ├── store/
- │   └── taskStore.ts    # Zustand store
- ├── i18n/
- │   ├── translations.ts # Localization
- │   └── LanguageContext.tsx
- ├── utils/
- │   └── index.ts        # Auxiliary functions
- ├── App.tsx             # The main component
- └── main.tsx            # Entry point

## 🔧 Customization

### Adding a new language
- Add a translation to src/i18n/translations.ts
- Update the type Language
- Add the option to the language selector

### Adding a new subject
- Add the subject to SUBJECTS in TaskForm.tsx
- Add color to getSubjectColor in utils.ts
- Add a translation to SUBJECT_TRANSLATIONS

## 👨‍💻 Author
GitHub: @iso-arkisto

⭐ Don't forget to put a star if you liked the project!