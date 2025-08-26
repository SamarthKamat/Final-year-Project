import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor,
  Palette,
  Volume2,
  Bell,
  Globe,
  Eye,
  Zap,
  Code,
  ChevronRight
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

export function Settings() {
  const [theme, setTheme] = React.useState('system');
  const [hoveredCard, setHoveredCard] = React.useState(null);

  const settings = [
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of the application',
      options: [
        {
          label: 'Theme',
          control: (
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <span>System</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )
        },
        {
          label: 'Animations',
          control: <Switch defaultChecked />
        }
      ]
    },
    {
      icon: Volume2,
      title: 'Sound & Feedback',
      description: 'Configure audio and haptic feedback settings',
      options: [
        {
          label: 'Sound Effects',
          control: <Switch defaultChecked />
        },
        {
          label: 'Volume',
          control: <Slider defaultValue={[80]} max={100} step={1} className="w-32" />
        }
      ]
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      options: [
        {
          label: 'Push Notifications',
          control: <Switch defaultChecked />
        },
        {
          label: 'Email Notifications',
          control: <Switch />
        }
      ]
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Set your preferred language and region',
      options: [
        {
          label: 'Language',
          control: (
            <Select defaultValue="en">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          )
        }
      ]
    },
    {
      icon: Eye,
      title: 'Accessibility',
      description: 'Configure accessibility settings',
      options: [
        {
          label: 'High Contrast',
          control: <Switch />
        },
        {
          label: 'Font Size',
          control: (
            <Select defaultValue="medium">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          )
        }
      ]
    },
    {
      icon: Code,
      title: 'Editor Settings',
      description: 'Customize your coding environment',
      options: [
        {
          label: 'Auto-complete',
          control: <Switch defaultChecked />
        },
        {
          label: 'Line Numbers',
          control: <Switch defaultChecked />
        }
      ]
    }
  ];

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
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#00E5C2] to-[#3B82F6] rounded-2xl flex items-center justify-center">
              <SettingsIcon className="w-8 h-8 text-white" />
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
              Settings
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground"
            >
              Customize your experience
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settings.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(section.title)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 bg-slate-800/30 backdrop-blur-lg border-slate-700/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="p-3 w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5C2]/20 to-[#3B82F6]/20 text-primary flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                    >
                      {React.createElement(section.icon, { className: "w-6 h-6" })}
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        {section.title}
                        <motion.div
                          animate={{ 
                            x: hoveredCard === section.title ? 5 : 0,
                            opacity: hoveredCard === section.title ? 1 : 0.5
                          }}
                          className="text-primary"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.options.map((option, optionIndex) => (
                      <div key={option.label} className="flex items-center justify-between">
                        <Label htmlFor={`${section.title}-${option.label}`} className="text-sm">
                          {option.label}
                        </Label>
                        {option.control}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;