# 🎬 Framer Motion Starter Template

A comprehensive, production-ready starter template for building animated web applications with **Framer Motion**, **React**, and **Vite**.

## 🚀 Quick Start

### 1. Clone or Use This Template
```bash
git clone https://github.com/philangenkhosimabuza-ship-it/framer-motion-starter.git
cd framer-motion-starter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

## 📦 What's Included

- ✅ **Framer Motion 12.40.0** - Advanced animation library
- ✅ **React 18.2.0** - Modern UI library
- ✅ **Vite 5.0.8** - Lightning-fast build tool
- ✅ **Pre-configured animations** - Ready-to-use animation components
- ✅ **Responsive design** - Mobile-first approach
- ✅ **Dark mode support** - Built-in theme switching

## 🎨 Animation Examples

### Fade In Animation
```jsx
import { motion } from 'framer-motion';

export function FadeInComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Hello, World!
    </motion.div>
  );
}
```

### Slide In Animation
```jsx
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Slide in content
</motion.div>
```

### Hover Effects
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Scroll Animations
```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Appears when scrolled into view
</motion.div>
```

### Stagger Animations
```jsx
<motion.div>
  {items.map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

## 📁 Project Structure

```
framer-motion-starter/
├── src/
│   ├── components/
│   │   ├── FadeIn.jsx
│   │   ├── SlideIn.jsx
│   │   └── HoverScale.jsx
│   ├── animations/
│   │   └── variants.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## 🎯 Common Animation Patterns

### Pattern 1: Page Transition
```jsx
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
```

### Pattern 2: Container with Staggered Children
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};
```

### Pattern 3: Infinite Loop
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 2 }}
>
  Spinning Icon
</motion.div>
```

## 🛠️ Customization

### Change Animation Duration
Edit values in `transition` prop:
```jsx
transition={{ duration: 1 }} // 1 second
```

### Add Custom Easing
```jsx
transition={{
  duration: 0.5,
  ease: "easeInOut" // or: "linear", "easeIn", "easeOut"
}}
```

### Add Delay
```jsx
transition={{
  duration: 0.5,
  delay: 0.2 // 0.2 second delay
}}
```

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)

## 🤝 Contributing

Feel free to fork, modify, and use this template for your projects!

## 📝 License

MIT License - Feel free to use this for personal and commercial projects.

---

**Happy Animating! 🎬✨**
