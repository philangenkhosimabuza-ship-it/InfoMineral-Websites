import { motion } from 'framer-motion';
import './App.css';
import FadeInComponent from './components/FadeIn';
import SlideInComponent from './components/SlideIn';
import HoverScaleComponent from './components/HoverScale';
import StaggerComponent from './components/Stagger';

function App() {
  return (
    <div className="app">
      <header className="header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎬 Framer Motion Starter
        </motion.h1>
        <p>Beautiful Animations with React & Framer Motion</p>
      </header>

      <main className="main-content">
        <section className="section">
          <h2>Animation Examples</h2>
          
          <div className="grid">
            <div className="card">
              <h3>Fade In</h3>
              <FadeInComponent />
            </div>

            <div className="card">
              <h3>Slide In</h3>
              <SlideInComponent />
            </div>

            <div className="card">
              <h3>Hover Scale</h3>
              <HoverScaleComponent />
            </div>

            <div className="card">
              <h3>Stagger Animation</h3>
              <StaggerComponent />
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Scroll Animation</h2>
          <motion.div
            className="scroll-demo"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p>This element animates when you scroll into view!</p>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Made with ❤️ using Framer Motion
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
