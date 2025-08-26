import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Play, 
  ArrowRight, 
  Code2, 
  Zap, 
  GitBranch, 
  Brain, 
  Users, 
  Sparkles,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const codeExample = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 10 numbers
for i in range(10):
    print(fibonacci(i))`;

const features = [
  {
    icon: Code2,
    title: "Interactive Code Editor",
    description: "Write and execute code with real-time visualization of algorithms."
  },
  {
    icon: Zap,
    title: "Step-by-Step Execution",
    description: "Watch your code execute line by line with variable state tracking."
  },
  {
    icon: GitBranch,
    title: "Algorithm Flowcharts",
    description: "Automatically generate visual flowcharts from your code."
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get intelligent suggestions and explanations as you code."
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Share and learn from other developers in real-time."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

function HeroSection() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-background pt-16 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00E5C2]/20 to-[#3B82F6]/20 opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#00E5C2] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={floatingAnimation}
          transition={{
            delay: i * 0.2,
            duration: 2 + Math.random() * 2
          }}
        />
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div 
          className="flex items-center justify-center mb-8"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Code2 className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] rounded-2xl opacity-30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#00E5C2] to-[#3B82F6] bg-clip-text text-transparent mb-6"
        >
          CodeSketch
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Visualize your code execution in real-time with our interactive code editor and debugger
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-[#00E5C2] to-[#3B82F6] hover:from-[#00E5C2]/90 hover:to-[#3B82F6]/90 relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                initial={false}
                animate={{ scale: isHovered ? 1.5 : 0 }}
                transition={{ duration: 0.5 }}
              />
              Get Started
              <motion.div
                className="ml-2"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/code-editor')}
              className="group border-[#00E5C2] hover:bg-[#00E5C2]/10"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Play className="w-5 h-5 mr-2 text-[#00E5C2]" />
              </motion.div>
              Try Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Features section */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-lg border border-slate-700"
            >
              <motion.div 
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] p-2 mb-4 mx-auto"
                whileHover={{ rotate: 5 }}
              >
                {React.createElement(feature.icon, { className: "w-8 h-8 text-white" })}
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HeroSection;




