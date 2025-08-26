import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Dashboard from './components/Dashboard';
import CodeEditor from './components/CodeEditor';
import ComponentShowcase from './components/ComponentShowcase';
import Settings from './components/Settings';
import Collaboration from './components/Collaboration';
import History from './components/History';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      duration: 0.2
    }
  }
};

const pageTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="page-wrap"
          >
            <HeroSection />
          </motion.div>
        } />
        <Route path="/dashboard" element={
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={pageTransition}
            className="page-wrap"
          >
            <Dashboard />
          </motion.div>
        } />
        <Route path="/code-editor" element={
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              ...pageTransition,
              damping: 15
            }}
            className="page-wrap"
          >
            <CodeEditor />
          </motion.div>
        } />
        <Route path="/components" element={
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={pageTransition}
            className="page-wrap"
          >
            <ComponentShowcase />
          </motion.div>
        } />
        <Route path="/settings" element={
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={pageTransition}
            className="page-wrap"
          >
            <Settings />
          </motion.div>
        } />
        <Route path="/collaboration" element={
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={pageTransition}
            className="page-wrap"
          >
            <Collaboration />
          </motion.div>
        } />
        <Route path="/history" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={pageTransition}
            className="page-wrap"
          >
            <History />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;




