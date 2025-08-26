import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Users,
  UserPlus,
  MessageSquare,
  Share2,
  GitBranch,
  Clock,
  ChevronRight,
  Plus,
  Search
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

const collaborators = [
  {
    name: 'Alex Johnson',
    role: 'Developer',
    avatar: null,
    status: 'online',
    lastActive: 'Now'
  },
  {
    name: 'Sarah Chen',
    role: 'Designer',
    avatar: null,
    status: 'online',
    lastActive: '5m ago'
  },
  {
    name: 'Mike Brown',
    role: 'Product Manager',
    avatar: null,
    status: 'offline',
    lastActive: '2h ago'
  }
];

const projects = [
  {
    name: 'Algorithm Visualizer',
    description: 'Interactive visualization of sorting algorithms',
    collaborators: 4,
    lastUpdated: '2 hours ago',
    status: 'active'
  },
  {
    name: 'Data Structure Explorer',
    description: 'Visual representation of common data structures',
    collaborators: 3,
    lastUpdated: '1 day ago',
    status: 'review'
  },
  {
    name: 'Code Patterns',
    description: 'Collection of design patterns and best practices',
    collaborators: 5,
    lastUpdated: '3 days ago',
    status: 'completed'
  }
];

export function Collaboration() {
  const [hoveredCard, setHoveredCard] = React.useState(null);

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
                <Users className="w-8 h-8 text-white" />
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
                Collaboration Hub
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-muted-foreground"
              >
                Work together in real-time
              </motion.p>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-gradient-to-r from-[#00E5C2] to-[#3B82F6] hover:from-[#00E5C2]/90 hover:to-[#3B82F6]/90 relative group overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                initial={false}
                animate={{ scale: hoveredCard === 'invite' ? 1.5 : 0 }}
                transition={{ duration: 0.5 }}
              />
              <UserPlus className="w-5 h-5 mr-2" />
              Invite Collaborators
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-800/30 backdrop-blur-lg border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Projects</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Search projects..." 
                        className="pl-9 w-64 bg-background/50"
                      />
                    </div>
                    <Button size="icon" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <motion.div
                      key={project.name}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <Badge 
                          variant={
                            project.status === 'active' ? 'default' : 
                            project.status === 'review' ? 'secondary' : 
                            'outline'
                          }
                          className="capitalize"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{project.collaborators} collaborators</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{project.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                          <Button variant="ghost" size="sm">
                            <GitBranch className="w-4 h-4 mr-1" />
                            Fork
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-slate-800/30 backdrop-blur-lg border-slate-700/50">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collaborators.map((collaborator) => (
                    <motion.div
                      key={collaborator.name}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-background/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {collaborator.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{collaborator.name}</h4>
                          <p className="text-sm text-muted-foreground">{collaborator.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          collaborator.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-sm text-muted-foreground">
                          {collaborator.lastActive}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => {}}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
              </CardContent>
            </Card>

            <motion.div
              variants={itemVariants}
              className="mt-6"
            >
              <Card className="bg-slate-800/30 backdrop-blur-lg border-slate-700/50">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <GitBranch className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Sarah Chen</span> created a new branch
                        </p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Alex Johnson</span> commented on PR #42
                        </p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Mike Brown</span> shared a project
                        </p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Collaboration;