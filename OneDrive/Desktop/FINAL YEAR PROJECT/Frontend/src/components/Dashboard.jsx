import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Play,
  Code2,
  Users,
  Settings,
  FileCode,
  History,
  ChevronRight,
  Activity,
  Clock,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function Dashboard() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = React.useState(null);

  const features = [
    {
      icon: FileCode,
      title: 'Code Editor',
      description: 'Write and execute code with real-time visualization',
      action: () => navigate('/code-editor'),
      stats: { value: '100+', label: 'Examples' }
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Customize your coding environment',
      action: () => navigate('/settings'),
      stats: { value: '10+', label: 'Themes' }
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Work together in real-time with other developers',
      action: () => navigate('/collaboration'),
      stats: { value: '1000+', label: 'Users' }
    },
    {
      icon: History,
      title: 'History',
      description: 'View your past coding sessions and progress',
      action: () => navigate('/history'),
      stats: { value: '24/7', label: 'Available' }
    }
  ];

  const stats = [
    { icon: Activity, value: '99.9%', label: 'Uptime' },
    { icon: Clock, value: '50ms', label: 'Latency' },
    { icon: Star, value: '4.9', label: 'Rating' }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background pt-16"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] rounded-2xl flex items-center justify-center">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] rounded-2xl opacity-30 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-[#00E5C2] to-[#3B82F6] bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Welcome to CodeSketch
              </motion.h1>
              <motion.p 
                className="text-muted-foreground"
                variants={itemVariants}
              >
                Choose a feature to get started
              </motion.p>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/code-editor')}
              className="bg-gradient-to-r from-[#00E5C2] to-[#3B82F6] hover:from-[#00E5C2]/90 hover:to-[#3B82F6]/90 relative group overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                initial={false}
                animate={{ scale: hoveredCard === 'start' ? 1.5 : 0 }}
                transition={{ duration: 0.5 }}
              />
              <Play className="w-5 h-5 mr-2" />
              Start Coding
              <motion.div
                className="ml-2"
                animate={{ x: hoveredCard === 'start' ? 5 : 0 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-xl bg-slate-800/30 backdrop-blur-lg border border-slate-700/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5C2]/20 to-[#3B82F6]/20 p-2.5 flex items-center justify-center">
                  {React.createElement(stat.icon, { className: "w-6 h-6 text-primary" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(feature.title)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group"
            >
              <Card 
                className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 cursor-pointer bg-slate-800/30 backdrop-blur-lg border-slate-700/50"
                onClick={feature.action}
              >
                <CardContent className="pt-6">
                  <motion.div 
                    className="mb-4 p-3 w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5C2]/20 to-[#3B82F6]/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 5 }}
                  >
                    {React.createElement(feature.icon, { className: "w-7 h-7" })}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <feature.icon className="w-4 h-4" />
                      <span>{feature.stats.value}</span>
                      <span className="text-muted-foreground">{feature.stats.label}</span>
                    </div>
                    <motion.div
                      animate={{ 
                        x: hoveredCard === feature.title ? 5 : 0,
                        opacity: hoveredCard === feature.title ? 1 : 0.5
                      }}
                      className="text-primary"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;