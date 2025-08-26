import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { cn } from '../lib/utils';
import {
  Code2,
  LayoutDashboard,
  Settings,
  Users,
  History,
  Boxes,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Code2 },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/code-editor', label: 'Code Editor', icon: Code2 },
  { path: '/components', label: 'Components', icon: Boxes },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/collaboration', label: 'Collaboration', icon: Users },
  { path: '/history', label: 'History', icon: History }
];

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1
    }
  }
};

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] rounded-xl flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] opacity-75"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <Code2 className="w-6 h-6 text-white relative z-10" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-[#00E5C2] to-[#3B82F6] bg-clip-text text-transparent">
                CodeSketch
              </span>
            </Link>
            <motion.div
              className="absolute -inset-2 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] rounded-xl opacity-30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ y: 0, scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {React.createElement(item.icon, {
                    className: cn(
                      "w-4 h-4 transition-all",
                      location.pathname === item.path && "scale-110"
                    ),
                    strokeWidth: location.pathname === item.path ? 2.5 : 2
                  })}
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden border-t border-border/40"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={itemVariants}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ x: 0, scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative overflow-hidden",
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {React.createElement(item.icon, {
                        className: cn(
                          "w-4 h-4 transition-all",
                          location.pathname === item.path && "scale-110"
                        ),
                        strokeWidth: location.pathname === item.path ? 2.5 : 2
                      })}
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute inset-0 bg-primary/5"
                          layoutId="activeMobileTab"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navigation;
