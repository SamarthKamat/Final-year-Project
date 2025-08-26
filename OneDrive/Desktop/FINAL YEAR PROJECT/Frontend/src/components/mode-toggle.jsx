import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative group"
      >
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-900" />
          )}
        </motion.div>
        <motion.div
          className="absolute -inset-1 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
          whileHover={{ scale: 1.2 }}
        />
      </Button>
    </motion.div>
  );
}

export default ModeToggle;