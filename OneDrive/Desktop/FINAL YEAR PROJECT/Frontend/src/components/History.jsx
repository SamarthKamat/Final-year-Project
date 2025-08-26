import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  History as HistoryIcon,
  Search,
  Calendar,
  Clock,
  Code2,
  GitBranch,
  FileText,
  ChevronRight,
  ArrowUpRight,
  Trash2,
  Download,
  Filter
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

const sessions = [
  {
    id: 1,
    title: 'Binary Search Implementation',
    timestamp: '2 hours ago',
    duration: '45 minutes',
    language: 'Python',
    status: 'completed',
    changes: 24,
    visualizations: 8
  },
  {
    id: 2,
    title: 'Quicksort Algorithm',
    timestamp: '5 hours ago',
    duration: '1 hour',
    language: 'JavaScript',
    status: 'completed',
    changes: 36,
    visualizations: 12
  },
  {
    id: 3,
    title: 'Graph Traversal',
    timestamp: '1 day ago',
    duration: '30 minutes',
    language: 'Java',
    status: 'in_progress',
    changes: 18,
    visualizations: 6
  }
];

const stats = [
  { label: 'Total Sessions', value: '128', icon: Code2 },
  { label: 'Time Spent', value: '64h', icon: Clock },
  { label: 'Visualizations', value: '256', icon: FileText }
];

export function History() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [hoveredSession, setHoveredSession] = React.useState(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background pt-16 pb-8"
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
                <HistoryIcon className="w-8 h-8 text-white" />
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
                Session History
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-muted-foreground"
              >
                Track your coding progress
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
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

        <Card className="bg-slate-800/30 backdrop-blur-lg border-slate-700/50">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                  <TabsList className="bg-background/50">
                    <TabsTrigger value="all">All Sessions</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search sessions..." 
                    className="pl-9 w-64 bg-background/50"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div className="space-y-4">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  variants={itemVariants}
                  whileHover={{ y: -2, scale: 1.01 }}
                  onHoverStart={() => setHoveredSession(session.id)}
                  onHoverEnd={() => setHoveredSession(null)}
                  className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{session.title}</h3>
                        <Badge 
                          variant={session.status === 'completed' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {session.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code2 className="w-4 h-4" />
                          <span>{session.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4" />
                          <span>{session.changes} changes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{session.visualizations} visualizations</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <motion.div
                        animate={{ 
                          x: hoveredSession === session.id ? 5 : 0,
                          opacity: hoveredSession === session.id ? 1 : 0.5
                        }}
                      >
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Last updated {session.timestamp}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

export default History;