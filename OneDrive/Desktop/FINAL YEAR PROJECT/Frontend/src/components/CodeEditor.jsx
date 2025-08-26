import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { 
  Play,
  Pause,
  Square,
  SkipForward,
  StepForward,
  StepBack,
  RotateCcw,
  Settings,
  Share2,
  Download,
  Code2,
  Database,
  Activity,
  Terminal,
  Clock,
  Zap,
  Brain,
  Eye,
  AlertCircle,
  CheckCircle,
  FileText,
  Folder,
  ChevronDown,
  ChevronUp,
  Copy,
  Trash2,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  GitBranch,
  Lightbulb,
  Target,
  ArrowRight,
  ArrowDown,
  RotateCw,
  Heart,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CodeEditor({ onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(1);
  const [speed, setSpeed] = useState([1]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [activeTab, setActiveTab] = useState('variables');
  const [executionStep, setExecutionStep] = useState(0);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [outputExpanded, setOutputExpanded] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [executionOutput, setExecutionOutput] = useState([]);
  const [currentCode, setCurrentCode] = useState({ 
    flowchartSteps: [],
    code: '',
    explanation: ''
  });

  // Multi-language code examples
  const codeExamples = {
    python: {
      code: `def fibonacci(n, memo={}):
    """Calculate fibonacci with memoization"""
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]

def main():
    result = fibonacci(10)
    print(f"Fibonacci(10) = {result}")
    return result

if __name__ == "__main__":
    main()`,
      explanation: "This Python code calculates Fibonacci numbers using a smart technique called 'memoization' - it's like having a notebook to remember answers so we don't have to solve the same problem twice!",
      flowchartSteps: [
        { id: 1, type: 'start', text: 'Start', x: 200, y: 60 },
        { id: 2, type: 'process', text: 'Call fibonacci(10)', x: 200, y: 130 },
        { id: 3, type: 'decision', text: 'Is n in memo?', x: 200, y: 200 },
        { id: 4, type: 'process', text: 'Return memo[n]', x: 320, y: 200 },
        { id: 5, type: 'decision', text: 'Is n <= 1?', x: 200, y: 270 },
        { id: 6, type: 'process', text: 'Return n', x: 320, y: 270 },
        { id: 7, type: 'process', text: 'Calculate recursive calls', x: 200, y: 340 },
        { id: 8, type: 'process', text: 'Store in memo[n]', x: 200, y: 410 },
        { id: 9, type: 'end', text: 'Return result', x: 200, y: 480 }
      ]
    },
    cpp: {
      code: `#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n, vector<int>& memo) {
    // Base cases
    if (n <= 1) return n;
    
    // Check if already computed
    if (memo[n] != -1) return memo[n];
    
    // Calculate and store result
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);
    return memo[n];
}

int main() {
    int n = 10;
    vector<int> memo(n+1, -1);
    
    int result = fibonacci(n, memo);
    cout << "Fibonacci(" << n << ") = " << result << endl;
    
    return 0;
}`,
      explanation: "This C++ code is like a super-fast calculator for Fibonacci numbers! It uses a special list called a 'vector' to remember previous calculations, making it lightning quick!",
      flowchartSteps: [
        { id: 1, type: 'start', text: 'Start Program', x: 200, y: 60 },
        { id: 2, type: 'process', text: 'Create memo vector', x: 200, y: 130 },
        { id: 3, type: 'process', text: 'Call fibonacci(10)', x: 200, y: 200 },
        { id: 4, type: 'decision', text: 'n <= 1?', x: 200, y: 270 },
        { id: 5, type: 'process', text: 'Return n', x: 320, y: 270 },
        { id: 6, type: 'decision', text: 'memo[n] != -1?', x: 200, y: 340 },
        { id: 7, type: 'process', text: 'Return memo[n]', x: 320, y: 340 },
        { id: 8, type: 'process', text: 'Calculate & store', x: 200, y: 410 },
        { id: 9, type: 'end', text: 'Print result', x: 200, y: 480 }
      ]
    },
    java: {
      code: `import java.util.HashMap;
import java.util.Map;

public class Fibonacci {
    private Map<Integer, Long> memo = new HashMap<>();
    
    public long fibonacci(int n) {
        // Check if we already calculated this
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        // Base cases
        if (n <= 1) {
            return n;
        }
        
        // Calculate and store the result
        long result = fibonacci(n-1) + fibonacci(n-2);
        memo.put(n, result);
        return result;
    }
    
    public static void main(String[] args) {
        Fibonacci fib = new Fibonacci();
        int n = 10;
        long result = fib.fibonacci(n);
        System.out.println("Fibonacci(" + n + ") = " + result);
    }
}`,
      explanation: "This Java code is like a smart robot that remembers every math problem it solves! It uses a special memory box called 'HashMap' to store answers for super-fast lookup!",
      flowchartSteps: [
        { id: 1, type: 'start', text: 'Start Java Program', x: 200, y: 60 },
        { id: 2, type: 'process', text: 'Create Fibonacci object', x: 200, y: 130 },
        { id: 3, type: 'process', text: 'Call fibonacci(10)', x: 200, y: 200 },
        { id: 4, type: 'decision', text: 'In HashMap?', x: 200, y: 270 },
        { id: 5, type: 'process', text: 'Return from HashMap', x: 320, y: 270 },
        { id: 6, type: 'decision', text: 'n <= 1?', x: 200, y: 340 },
        { id: 7, type: 'process', text: 'Return n', x: 320, y: 340 },
        { id: 8, type: 'process', text: 'Calculate & store', x: 200, y: 410 },
        { id: 9, type: 'end', text: 'Print to console', x: 200, y: 480 }
      ]
    },
    c: {
      code: `#include <stdio.h>
#include <stdlib.h>

// Function to calculate fibonacci with memoization
long long fibonacci(int n, long long* memo) {
    // Base cases
    if (n <= 1) return n;
    
    // Check if already calculated
    if (memo[n] != -1) return memo[n];
    
    // Calculate and store the result
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);
    return memo[n];
}

int main() {
    int n = 10;
    
    // Create memoization array
    long long* memo = (long long*)malloc((n+1) * sizeof(long long));
    
    // Initialize all values to -1
    for (int i = 0; i <= n; i++) {
        memo[i] = -1;
    }
    
    long long result = fibonacci(n, memo);
    printf("Fibonacci(%d) = %lld\\n", n, result);
    
    free(memo);
    return 0;
}`,
      explanation: "This C code is like the foundation of all programming languages! It's very fast and efficient, using a special memory space to remember calculations. Think of it as the engine that powers everything!",
      flowchartSteps: [
        { id: 1, type: 'start', text: 'Start C Program', x: 200, y: 60 },
        { id: 2, type: 'process', text: 'Allocate memo array', x: 200, y: 130 },
        { id: 3, type: 'process', text: 'Initialize memo to -1', x: 200, y: 200 },
        { id: 4, type: 'process', text: 'Call fibonacci(10)', x: 200, y: 270 },
        { id: 5, type: 'decision', text: 'n <= 1?', x: 200, y: 340 },
        { id: 6, type: 'process', text: 'Return n', x: 320, y: 340 },
        { id: 7, type: 'decision', text: 'memo[n] != -1?', x: 200, y: 410 },
        { id: 8, type: 'process', text: 'Calculate & store', x: 200, y: 480 },
        { id: 9, type: 'end', text: 'Free memory & exit', x: 200, y: 550 }
      ]
    }
  };

  useEffect(() => {
    if (codeExamples[selectedLanguage]) {
      setCurrentCode(codeExamples[selectedLanguage]);
    }
  }, [selectedLanguage]);

  const codeLines = currentCode.code.split('\n');

  // Calculate the required height for flowchart based on the maximum y coordinate
  const getFlowchartHeight = () => {
    if (!currentCode.flowchartSteps || currentCode.flowchartSteps.length === 0) {
      return 400;
    }
    const maxY = Math.max(...currentCode.flowchartSteps.map(step => step.y));
    return Math.max(maxY + 100, 400); // Add padding and minimum height
  };

  // Mock execution data
  const executionData = [
    { line: 1, variables: { n: 10, memo: {} }, stack: ['main()', 'fibonacci(10, {})'], step: 'Function call' },
    { line: 3, variables: { n: 10, memo: {} }, stack: ['main()', 'fibonacci(10, {})'], step: 'Check memo' },
    { line: 6, variables: { n: 10, memo: {} }, stack: ['main()', 'fibonacci(10, {})'], step: 'Base case check' },
    { line: 9, variables: { n: 10, memo: {} }, stack: ['main()', 'fibonacci(10, {})', 'fibonacci(9, {})'], step: 'Recursive call' },
  ];

  const currentExecution = executionData[Math.min(executionStep, executionData.length - 1)];

  const simulateCodeExecution = () => {
    const timestamp = new Date().toLocaleTimeString();
    const langOutput = {
      python: [
        { type: 'info', message: 'Starting Python execution...', timestamp },
        { type: 'info', message: 'Loading fibonacci function', timestamp },
        { type: 'info', message: 'Calculating fibonacci(10) with memoization', timestamp },
        { type: 'output', message: 'Fibonacci(10) = 55', timestamp },
        { type: 'success', message: 'Python execution completed successfully', timestamp },
        { type: 'info', message: `Runtime: 0.032s | Memory: 2.4MB | Calls: 19`, timestamp }
      ],
      cpp: [
        { type: 'info', message: 'Compiling C++ code...', timestamp },
        { type: 'info', message: 'Creating vector for memoization', timestamp },
        { type: 'info', message: 'Executing fibonacci function', timestamp },
        { type: 'output', message: 'Fibonacci(10) = 55', timestamp },
        { type: 'success', message: 'C++ execution completed successfully', timestamp },
        { type: 'info', message: `Runtime: 0.008s | Memory: 1.2MB | Calls: 19`, timestamp }
      ],
      java: [
        { type: 'info', message: 'Compiling Java bytecode...', timestamp },
        { type: 'info', message: 'Creating HashMap for memoization', timestamp },
        { type: 'info', message: 'Executing fibonacci method', timestamp },
        { type: 'output', message: 'Fibonacci(10) = 55', timestamp },
        { type: 'success', message: 'Java execution completed successfully', timestamp },
        { type: 'info', message: `Runtime: 0.124s | Memory: 8.1MB | Calls: 19`, timestamp }
      ],
      c: [
        { type: 'info', message: 'Compiling C code...', timestamp },
        { type: 'info', message: 'Allocating memory for memoization', timestamp },
        { type: 'info', message: 'Executing fibonacci function', timestamp },
        { type: 'output', message: 'Fibonacci(10) = 55', timestamp },
        { type: 'success', message: 'C execution completed successfully', timestamp },
        { type: 'info', message: `Runtime: 0.003s | Memory: 0.8MB | Calls: 19`, timestamp }
      ]
    };
    
    setExecutionOutput(langOutput[selectedLanguage]);
    setHasExecuted(true);
    setOutputExpanded(true);
    setShowFlowchart(true);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      simulateCodeExecution();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleStep = () => {
    if (executionStep < executionData.length - 1) {
      setExecutionStep(prev => prev + 1);
      setCurrentLine(executionData[executionStep + 1]?.line || 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setExecutionStep(0);
    setCurrentLine(1);
    setExecutionOutput([]);
    setHasExecuted(false);
    setShowFlowchart(false);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCurrentLine(1);
    setExecutionStep(0);
    setHasExecuted(false);
    setShowFlowchart(false);
    setExecutionOutput([]);
  };

  const clearOutput = () => {
    setExecutionOutput([]);
    setHasExecuted(false);
    setShowFlowchart(false);
  };

  const copyOutput = () => {
    const outputText = executionOutput
      .map(item => `[${item.timestamp}] ${item.type.toUpperCase()}: ${item.message}`)
      .join('\n');
    navigator.clipboard.writeText(outputText);
  };

  // Auto-play when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        handleStep();
      }, 2000 / speed[0]);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed[0], executionStep]);

  const fileTree = [
    { name: `fibonacci.${selectedLanguage === 'python' ? 'py' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : 'c'}`, type: 'file', active: true },
    { name: 'sorting.py', type: 'file' },
    { name: 'data_structures/', type: 'folder', children: [
      { name: 'stack.py', type: 'file' },
      { name: 'queue.py', type: 'file' },
      { name: 'tree.py', type: 'file' }
    ]}
  ];

  const languages = [
    { id: 'python', name: 'Python', color: 'bg-yellow-500', extension: '.py' },
    { id: 'cpp', name: 'C++', color: 'bg-blue-500', extension: '.cpp' },
    { id: 'java', name: 'Java', color: 'bg-red-500', extension: '.java' },
    { id: 'c', name: 'C', color: 'bg-gray-500', extension: '.c' }
  ];

  const getOutputIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'output': return <Terminal className="w-4 h-4 text-blue-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getOutputColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'output': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const FlowchartNode = ({ step, isActive }) => {
    const baseClasses = "absolute p-4 rounded-lg shadow-lg transform transition-all duration-300";
    const getNodeStyle = () => {
      switch (step.type) {
        case 'start':
        case 'end':
          return 'bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full';
        case 'process':
          return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
        case 'decision':
          return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white transform rotate-45';
        default:
          return 'bg-gray-100';
      }
    };

    return (
      <motion.div
        className={`${baseClasses} ${getNodeStyle()}`}
        style={{
          left: step.x,
          top: step.y,
          opacity: isActive ? 1 : 0.6,
          scale: isActive ? 1.05 : 1
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className={step.type === 'decision' ? 'transform -rotate-45' : ''}>
          {step.text}
        </span>
      </motion.div>
    );
  };

  const FibonacciVisualization = () => {
    const fibSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    
    return (
      <div className="p-6">
        <h4 className="text-base font-semibold text-foreground mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-400" />
          Fibonacci Magic Explained! 🌟
        </h4>
        
        <div className="space-y-6">
          {/* Simple Explanation */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>What is Fibonacci?</strong><br />
              Imagine you have a magical sequence where each number is the sum of the two numbers before it! 
              It's like: 0 + 1 = 1, then 1 + 1 = 2, then 1 + 2 = 3, and so on! 🎯
            </p>
          </div>

          {/* Visual Sequence */}
          <div>
            <h5 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              The Magic Sequence
            </h5>
            <div className="flex flex-wrap gap-2">
              {fibSequence.slice(0, 11).map((num, index) => (
                <motion.div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 10 ? 'bg-gradient-to-r from-green-400 to-green-600 ring-4 ring-green-300' : 'bg-gradient-to-r from-blue-400 to-purple-600'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.2 }}
                >
                  {num}
                </motion.div>
              ))}
            </div>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <ArrowRight className="w-4 h-4 mr-1" />
              <span className="text-xs text-muted-foreground">Each number = sum of previous two numbers</span>
            </div>
          </div>

          {/* Addition Visualization */}
          <div>
            <h5 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              How Addition Works
            </h5>
            <div className="space-y-3">
              {[
                { a: 21, b: 34, result: 55, step: 'fib(9) + fib(10) = fib(11)' },
                { a: 13, b: 21, result: 34, step: 'fib(8) + fib(9) = fib(10)' },
                { a: 8, b: 13, result: 21, step: 'fib(7) + fib(8) = fib(9)' }
              ].map((calc, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {calc.a}
                  </div>
                  <span className="text-lg">+</span>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {calc.b}
                  </div>
                  <span className="text-lg">=</span>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                    {calc.result}
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">{calc.step}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Memoization Explanation */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30">
            <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Smart Memory Trick (Memoization)
            </h5>
            <p className="text-sm text-foreground leading-relaxed">
              Instead of calculating the same number over and over, we write it down in our "memory notebook" 📝. 
              Next time we need that number, we just look it up! This makes our program super fast! ⚡
            </p>
            <div className="mt-3 flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-yellow-400 flex items-center justify-center text-xs">📝</div>
              <ArrowRight className="w-4 h-4" />
              <div className="w-6 h-6 rounded bg-green-400 flex items-center justify-center text-xs">⚡</div>
              <span className="text-xs text-muted-foreground">Notebook → Speed!</span>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <h6 className="text-sm font-semibold text-foreground mb-1 flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Fun Fact #1
              </h6>
              <p className="text-xs text-foreground">
                Fibonacci numbers appear everywhere in nature - flower petals, pinecones, and even snail shells! 🌻🐚
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30">
              <h6 className="text-sm font-semibold text-foreground mb-1 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                Fun Fact #2
              </h6>
              <p className="text-xs text-foreground">
                Without memoization, calculating fibonacci(50) would take billions of years! With it, just milliseconds! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Enhanced Top Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 border-b border-border bg-card/80 backdrop-blur-xl"
      >
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-white/10 transition-all duration-300"
          >
            ← Back to Dashboard
          </Button>

          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${languages.find(l => l.id === selectedLanguage)?.color} rounded-lg flex items-center justify-center`}>
              <Code2 className="w-4 h-4 text-white" />
            </div>

            <span className="font-semibold text-lg text-foreground">
              fibonacci{languages.find(l => l.id === selectedLanguage)?.extension}
            </span>
            <Badge variant="outline" className={`ml-3 ${languages.find(l => l.id === selectedLanguage)?.color.replace('bg-', 'bg-')}/20 border-${languages.find(l => l.id === selectedLanguage)?.color.replace('bg-', '')}/30`}>
              {languages.find(l => l.id === selectedLanguage)?.name}
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-white/10 transition-all duration-300"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Live
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="hover:bg-white/10 transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 transition-all duration-300"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-72 bg-card/40 border-r border-border backdrop-blur-sm flex flex-col"
        >
          {/* Language Selector */}
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Language</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <motion.div key={lang.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant={selectedLanguage === lang.id ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start h-10 transition-all duration-300"
                    onClick={() => handleLanguageChange(lang.id)}
                  >
                    <div className={`w-3 h-3 rounded-full ${lang.color} mr-3`} />
                    <span className="font-medium">{lang.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{lang.extension}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Language Info */}
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">About {languages.find(l => l.id === selectedLanguage)?.name}</h3>
            <div className="p-4 rounded-xl bg-muted/30 border border-muted/20">
              <p className="text-xs text-foreground leading-relaxed">
                {currentCode.explanation}
              </p>
            </div>
          </div>

          {/* Enhanced File Tree */}
          <div className="flex-1 p-6 overflow-auto">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Project Files</h3>
            <div className="space-y-1">
              {fileTree.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.type === 'file' ? (
                    <div className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      item.active 
                        ? 'bg-primary/15 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    }`}>
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
                        <Folder className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="ml-8 space-y-1 mt-1">
                        {item.children?.map((child, childIndex) => (
                          <div
                            key={childIndex}
                            className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-medium">{child.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - Code Editor & Output */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Editor Controls */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-b border-border bg-card/40 backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              {/* Primary Controls */}
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handlePlay}
                    size="lg"
                    className={`${isPlaying 
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                      : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
                    } text-white font-semibold px-6 shadow-lg transition-all duration-300`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isPlaying ? 'Pause' : 'Run Code'}
                  </Button>
                </motion.div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleStep} className="hover:bg-white/10">
                    <StepForward className="w-4 h-4 mr-2" />
                    Step
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={handleReset} className="hover:bg-white/10">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Secondary Controls */}
              <div className="flex items-center space-x-6">
                {/* Speed Control */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-muted-foreground">Speed:</span>
                  <div className="w-32">
                    <Slider
                      value={speed}
                      onValueChange={setSpeed}
                      max={4}
                      min={0.25}
                      step={0.25}
                      className="w-full"
                    />
                  </div>
                  <Badge variant="outline" className="min-w-[3rem] text-center">
                    {speed[0]}x
                  </Badge>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-muted-foreground">Step {executionStep + 1}/{executionData.length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-muted-foreground">O(2^n)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Code Display */}
          <motion.div 
            key={selectedLanguage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900">
              <div className="h-full p-8 overflow-auto font-mono text-sm">
                <div className="space-y-2">
                  {codeLines.map((line, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-start space-x-6 px-4 py-2 rounded-lg transition-all duration-500 ${
                        currentLine === index + 1 
                          ? 'bg-blue-500/20 border-l-4 border-blue-400 shadow-lg shadow-blue-500/20' 
                          : 'hover:bg-white/5'
                      }`}
                      animate={currentLine === index + 1 ? { 
                        scale: [1, 1.01, 1],
                        boxShadow: ['0 0 0px rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.3)', '0 0 0px rgba(59, 130, 246, 0)']
                      } : { scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <span className="w-10 text-right text-gray-500 select-none text-xs font-medium">
                        {index + 1}
                      </span>
                      <code className="text-gray-300 flex-1 leading-relaxed">
                        {line}
                      </code>
                      
                      <motion.div 
                        className="w-4 h-4 rounded-full border-2 border-gray-600 cursor-pointer transition-colors hover:border-red-400"
                        whileHover={{ scale: 1.2, borderColor: '#ef4444' }}
                        whileTap={{ scale: 0.9 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Output Section */}
          {hasExecuted && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: outputExpanded ? 'auto' : '60px', 
                opacity: 1 
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="border-t border-border bg-slate-950 overflow-hidden"
            >
              {/* Enhanced Output Header */}
              <div className="flex items-center justify-between p-5 border-b border-border bg-slate-900/80 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-white" />
                    </div>
                    
                    <span className="text-base font-semibold text-foreground">Execution Output</span>
                    <Badge className="ml-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      {languages.find(l => l.id === selectedLanguage)?.name} Completed
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyOutput}
                    className="text-muted-foreground hover:text-foreground hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearOutput}
                    className="text-muted-foreground hover:text-foreground hover:bg-white/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOutputExpanded(!outputExpanded)}
                    className="text-muted-foreground hover:text-foreground hover:bg-white/10"
                  >
                    {outputExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Enhanced Output Content */}
              {outputExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 max-h-80 overflow-auto"
                >
                  <div className="space-y-3">
                    {executionOutput.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getOutputIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <span className={`text-base font-mono ${getOutputColor(item.type)}`}>
                              {item.message}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {item.timestamp}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Enhanced Timeline Scrubber */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-t border-border bg-card/40 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-6">
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Timeline:</span>
              <div className="flex-1">
                <Slider
                  value={[executionStep]}
                  onValueChange={(value) => setExecutionStep(value[0])}
                  max={executionData.length - 1}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex space-x-3">
                {executionData.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                      index <= executionStep 
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    onClick={() => setExecutionStep(index)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Right Sidebar - Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${sidebarExpanded ? 'w-96' : 'w-16'} bg-card/40 border-l border-border backdrop-blur-sm flex flex-col transition-all duration-300`}
        >
          {/* Sidebar Toggle */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className={`font-semibold text-foreground ${sidebarExpanded ? 'block' : 'hidden'}`}>
              Code Visualization
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="hover:bg-white/10"
            >
              {sidebarExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>

          {sidebarExpanded && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-4 h-12">
                <TabsTrigger value="variables" className="flex items-center space-x-2 text-sm">
                  <Database className="w-4 h-4" />
                  <span>Variables</span>
                </TabsTrigger>
                <TabsTrigger value="flowchart" className="flex items-center space-x-2 text-sm">
                  <GitBranch className="w-4 h-4" />
                  <span>Flowchart</span>
                </TabsTrigger>
                <TabsTrigger value="explanation" className="flex items-center space-x-2 text-sm">
                  <Lightbulb className="w-4 h-4" />
                  <span>Explain</span>
                </TabsTrigger>
                <TabsTrigger value="console" className="flex items-center space-x-2 text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>Console</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-auto">
                <TabsContent value="variables" className="m-0 p-6 space-y-6">
                  <h4 className="text-base font-semibold text-foreground mb-4">Local Variables</h4>
                  <div className="space-y-3">
                    {Object.entries(currentExecution.variables).map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-muted/20"
                      >
                        <span className="text-sm font-mono font-semibold text-blue-400">{key}</span>
                        <span className="text-sm font-mono text-emerald-400">
                          {typeof value === 'object' ? JSON.stringify(value) : value}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <h4 className="text-base font-semibold text-foreground mb-4">Call Stack</h4>
                  <div className="space-y-3">
                    {currentExecution.stack.map((call, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-l-4 ${
                          index === currentExecution.stack.length - 1
                            ? 'bg-blue-500/10 border-blue-500'
                            : 'bg-muted/30 border-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono font-medium">{call}</span>
                          {index === currentExecution.stack.length - 1 && (
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              Current
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="flowchart" className="m-0 p-6">
                  <h4 className="text-base font-semibold text-foreground mb-4 flex items-center">
                    <GitBranch className="w-5 h-5 mr-2" />
                    Algorithm Flowchart
                  </h4>
                  
                  {showFlowchart ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border-2 border-border overflow-auto"
                      style={{ height: `${getFlowchartHeight()}px`, maxHeight: '600px' }}
                    >
                      {/* Background Grid */}
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: '20px 20px',
                          height: `${getFlowchartHeight()}px`
                        }} 
                      />

                      {/* SVG for connections */}
                      <svg 
                        className="absolute inset-0 w-full" 
                        style={{ 
                          zIndex: 5,
                          height: `${getFlowchartHeight()}px`
                        }}
                      >
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="#3B82F6"
                            />
                          </marker>
                        </defs>

                        {/* Draw connections between flowchart steps */}
                        {currentCode.flowchartSteps.slice(0, -1).map((step, index) => {
                          const nextStep = currentCode.flowchartSteps[index + 1];
                          return (
                            <motion.line
                              key={`line-${index}`}
                              x1={step.x}
                              y1={step.y + 24}
                              x2={nextStep.x}
                              y2={nextStep.y - 24}
                              stroke="#3B82F6"
                              strokeWidth="3"
                              markerEnd="url(#arrowhead)"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.8 }}
                              transition={{ delay: index * 0.3, duration: 0.8 }}
                            />
                          );
                        })}
                      </svg>
                      
                      {/* Render flowchart nodes */}
                      <div 
                        className="absolute inset-0" 
                        style={{ height: `${getFlowchartHeight()}px` }}
                      >
                        {currentCode.flowchartSteps.map((step, index) => (
                          <FlowchartNode
                            key={step.id}
                            step={step}
                            isActive={executionStep >= index && executionStep < currentCode.flowchartSteps.length}
                          />
                        ))}
                      </div>

                      {/* Flowchart Legend */}
                      <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3" style={{ zIndex: 15 }}>
                        <div className="text-xs text-white space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                            <span>Start/End</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600"></div>
                            <span>Process</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-lg rotate-45 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                            <span>Decision</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-96 bg-muted/20 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <GitBranch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">Run the code to generate flowchart</p>
                        <p className="text-xs mt-2 opacity-75">Click the "Run Code" button above</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="explanation" className="m-0 p-6">
                  <FibonacciVisualization />
                </TabsContent>

                <TabsContent value="console" className="m-0 p-6">
                  <h4 className="text-base font-semibold text-foreground mb-4">Debug Console</h4>
                  <div className="p-4 rounded-xl bg-slate-950 font-mono text-sm min-h-[200px]">
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-gray-500">→</span>
                        <span className="text-emerald-400">Starting {languages.find(l => l.id === selectedLanguage)?.name} execution...</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-gray-500">→</span>
                        <span className="text-blue-400">Calling fibonacci(10)</span>
                      </div>
                      {executionStep > 2 && (
                        <div className="flex items-start space-x-2">
                          <span className="text-gray-500">→</span>
                          <span className="text-purple-400">Recursive calls in progress...</span>
                        </div>
                      )}
                      {executionStep === executionData.length - 1 && (
                        <div className="flex items-start space-x-2">
                          <span className="text-gray-500">→</span>
                          <span className="text-green-400">Fibonacci(10) = 55</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          )}
        </motion.div>
      </div>

      {/* Enhanced Bottom Status Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-t border-border bg-card/80 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${hasExecuted ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-muted-foreground font-medium">
                {hasExecuted ? `${languages.find(l => l.id === selectedLanguage)?.name} Execution Complete` : 'Ready to Execute'}
              </span>
            </div>
            <span className="text-muted-foreground">
              Line {currentLine} of {codeLines.length}
            </span>
            <span className="text-muted-foreground">
              Language: {languages.find(l => l.id === selectedLanguage)?.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Memory: {selectedLanguage === 'c' ? '0.8MB' : selectedLanguage === 'cpp' ? '1.2MB' : selectedLanguage === 'python' ? '2.4MB' : '8.1MB'}</span>
            <span>Runtime: {hasExecuted ? (selectedLanguage === 'c' ? '0.003s' : selectedLanguage === 'cpp' ? '0.008s' : selectedLanguage === 'python' ? '0.032s' : '0.124s') : '--'}</span>
            <span>{languages.find(l => l.id === selectedLanguage)?.name} {selectedLanguage === 'python' ? '3.9.7' : selectedLanguage === 'java' ? '17.0.2' : 'Latest'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CodeEditor;