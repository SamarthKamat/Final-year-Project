"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.5,
      ease: [0.6, 0.05, -0.01, 0.9]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.8,
      duration: 0.5
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.7
    }
  }
};

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2
    }
  }
};

export default function ComponentShowcase() {
  const [selectedTab, setSelectedTab] = React.useState("basic");

  return (
    <motion.div 
      className="container mx-auto p-8 space-y-12 min-h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        variants={titleVariants} 
        className="text-center mb-12 pt-16"
      >
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent mb-4"
          animate={{
            backgroundPosition: ["0%", "100%"],
            transition: {
              duration: 8,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          UI Components
        </motion.h1>
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          A collection of beautiful, reusable components built with Radix UI and Tailwind CSS.
        </motion.p>
      </motion.div>

      <Tabs 
        defaultValue="basic" 
        className="w-full"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
            <TabsTrigger value="basic">Basic Components</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Components</TabsTrigger>
          </TabsList>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
          >
            {selectedTab === "basic" ? (
              <TabsContent value="basic" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.section 
                    variants={sectionVariants} 
                    className="space-y-4"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle>Buttons</CardTitle>
                        <CardDescription>Interactive button elements</CardDescription>
                      </CardHeader>
                      <CardContent className="flex gap-2 flex-wrap justify-center">
                        <Button size="sm" className="transform transition-all hover:scale-105">Primary</Button>
                        <Button size="sm" variant="secondary" className="transform transition-all hover:scale-105">Secondary</Button>
                        <Button size="sm" variant="outline" className="transform transition-all hover:scale-105">Outline</Button>
                      </CardContent>
                    </Card>
                  </motion.section>

                  <motion.section 
                    variants={sectionVariants} 
                    className="space-y-4"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle>Alert</CardTitle>
                        <CardDescription>Important messages</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert className="bg-primary/5 transform transition-all hover:scale-[1.02]">
                          <AlertTitle>Notification</AlertTitle>
                          <AlertDescription>This is an important message.</AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </motion.section>

                  <motion.section 
                    variants={sectionVariants} 
                    className="space-y-4"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle>Accordion</CardTitle>
                        <CardDescription>Collapsible content sections</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="transform transition-all hover:scale-[1.02]">
                              What is this?
                            </AccordionTrigger>
                            <AccordionContent>
                              This is an accordion component with smooth animations.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.section>
                </div>
              </TabsContent>
            ) : (
              <TabsContent value="advanced" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.section 
                    variants={sectionVariants} 
                    className="space-y-4"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle>Advanced Features</CardTitle>
                        <CardDescription>Coming soon...</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.p 
                          className="text-center text-muted-foreground"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          Advanced components will be added in the next update.
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.section>
                </div>
              </TabsContent>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}