import React, { useState, useEffect } from 'react';
import { Download, Code, CheckCircle, Smartphone, Monitor, Eye, FileCode, RotateCcw, Menu, X, Mail, Shield, Scale, Info, Home, BookOpen, Zap, Layers, Cpu, Rocket, ChevronDown } from 'lucide-react';
import { getHtmlTemplate } from './utils/template';

// --- Navigation Component ---
const Navbar = ({ setView, currentView }: { setView: (v: string) => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'resources', label: 'Resources & Ideas', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('home')}>
            <div className="p-1.5 bg-indigo-600 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <FileCode className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">CodeSmith<span className="text-indigo-400">2View</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-neutral-800 text-white shadow-lg border border-neutral-700'
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-neutral-800 p-2 rounded-md text-neutral-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                   currentView === item.id ? 'bg-neutral-800 text-white' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Footer Component ---
const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-neutral-900 border-t border-neutral-800 pt-12 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-1 bg-indigo-600 rounded">
              <FileCode className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">CodeSmith2View</span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Empowering developers and content creators with professional deployment tools. 
            Write cleanly, preview instantly, and launch your projects with confidence.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Platform</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><button onClick={() => setView('home')} className="hover:text-indigo-400 transition-colors">Web Editor</button></li>
            <li><button onClick={() => setView('resources')} className="hover:text-indigo-400 transition-colors">Resources & Ideas</button></li>
            <li><button onClick={() => setView('contact')} className="hover:text-indigo-400 transition-colors">Support</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Legal</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><button onClick={() => setView('privacy')} className="hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => setView('terms')} className="hover:text-indigo-400 transition-colors">Terms of Service</button></li>
            <li><button onClick={() => setView('cookies')} className="hover:text-indigo-400 transition-colors">Cookie Policy</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CodeSmith2View. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for Performance & Privacy.</p>
      </div>
    </div>
  </footer>
);

// --- Editor Tool (The Main Feature) ---
const EditorTool = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    setHtmlContent(getHtmlTemplate());
  }, []);

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the code to the default template?')) {
      setHtmlContent(getHtmlTemplate());
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[80vh] w-full max-w-7xl mx-auto my-8">
      {/* Tool Header */}
      <div className="bg-neutral-800 p-3 sm:p-4 border-b border-neutral-700 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-500" />
              <span className="hidden sm:inline">Workspace</span>
            </h2>
             {/* Tabs for Mobile */}
            <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-700">
                <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                >Code</button>
                <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                >Preview</button>
            </div>
        </div>

        <div className="flex items-center gap-3">
             <button onClick={handleReset} className="text-neutral-400 hover:text-white transition p-2 bg-neutral-900 rounded-lg border border-neutral-700" title="Reset Code">
                <RotateCcw className="w-4 h-4" />
            </button>
            <button
                onClick={handleDownload}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-lg transform active:scale-95 ${
                isDownloaded ? 'bg-green-600 text-white' : 'bg-white text-neutral-900 hover:bg-neutral-200'
                }`}
            >
                {isDownloaded ? <><CheckCircle className="w-4 h-4" /> Saved</> : <><Download className="w-4 h-4" /> Download HTML</>}
            </button>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
         {/* Editor Side */}
         <div className={`flex-1 bg-[#1e1e1e] flex flex-col transition-all duration-300 ${activeTab === 'editor' ? 'w-full translate-x-0' : 'absolute w-full -translate-x-full md:relative md:translate-x-0 md:w-1/2'}`}>
            <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="flex-1 w-full p-4 bg-[#1e1e1e] text-neutral-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
                placeholder="<!-- Paste your HTML code here -->"
            />
            <div className="bg-[#1e1e1e] border-t border-neutral-700 p-2 text-xs text-neutral-500 flex justify-between">
               <span>Ln {htmlContent.split('\n').length}</span>
               <span>UTF-8</span>
            </div>
         </div>

         {/* Preview Side */}
         <div className={`flex-1 bg-neutral-900 flex flex-col transition-all duration-300 ${activeTab === 'preview' ? 'w-full translate-x-0' : 'absolute w-full translate-x-full md:relative md:translate-x-0 md:w-1/2'}`}>
             <div className="p-2 bg-neutral-800 border-b border-neutral-700 flex justify-center items-center gap-4">
                 <span className="text-xs text-neutral-400 uppercase tracking-wide">Device View:</span>
                 <div className="flex bg-neutral-900 rounded p-1 border border-neutral-700">
                    <button onClick={() => setDeviceView('desktop')} className={`p-1.5 rounded transition-colors ${deviceView === 'desktop' ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-white'}`} title="Desktop View"><Monitor className="w-4 h-4" /></button>
                    <button onClick={() => setDeviceView('mobile')} className={`p-1.5 rounded transition-colors ${deviceView === 'mobile' ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-white'}`} title="Mobile View"><Smartphone className="w-4 h-4" /></button>
                 </div>
             </div>
             <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-neutral-900 flex items-center justify-center p-4 overflow-hidden relative">
                {/* Visual Frame for Mobile */}
                <div className={`bg-white transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${deviceView === 'mobile' ? 'w-[360px] h-[640px] rounded-[2rem] border-[8px] border-neutral-800' : 'w-full h-full rounded-sm'}`}>
                    <iframe title="Preview" srcDoc={htmlContent} className="w-full h-full border-none bg-white" sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin" />
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const HomeView = ({ setView }: { setView: (v: string) => void }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <div className="text-center py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/50 text-indigo-300 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Platform Live: V1.0
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            The Professional Way to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Build & Export Web Code</span>
        </h1>
        <p className="text-xl text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            CodeSmith2View provides a secure, client-side environment for developers to prototype websites, single-page applications, and responsive templates. No server uploads—your code stays yours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => document.getElementById('editor-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto">
                Start Coding
            </button>
            <button onClick={() => setView('resources')} className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold border border-neutral-700 transition-all w-full sm:w-auto">
                Explore Resources
            </button>
        </div>
    </div>

    {/* The Tool */}
    <div id="editor-section" className="px-2 sm:px-6 mb-24">
        <EditorTool />
    </div>

    {/* Features */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Developers Choose CodeSmith2View</h2>
            <p className="text-neutral-400">Optimized for speed, privacy, and simplicity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-indigo-500/30 transition-all group">
                <div className="w-14 h-14 bg-indigo-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                    <Code className="w-7 h-7 text-indigo-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Clean Code Export</h3>
                <p className="text-neutral-400 leading-relaxed">We respect your syntax. The exported file is identical to what you wrote, with zero added tracking scripts or bloatware. Perfect for production-ready deployments.</p>
            </div>
            <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-indigo-500/30 transition-all group">
                <div className="w-14 h-14 bg-indigo-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                    <Eye className="w-7 h-7 text-indigo-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instant Preview</h3>
                <p className="text-neutral-400 leading-relaxed">Toggle effortlessly between desktop and mobile viewports. Ensure your layout is responsive and user-friendly before you hit deploy.</p>
            </div>
            <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-indigo-500/30 transition-all group">
                <div className="w-14 h-14 bg-indigo-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                    <Shield className="w-7 h-7 text-indigo-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Client-Side Privacy</h3>
                <p className="text-neutral-400 leading-relaxed">Your intellectual property never leaves your browser. All rendering and file generation happens locally on your machine.</p>
            </div>
        </div>
    </div>

    {/* Roadmap / Coming Soon Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-neutral-800">
        <div className="bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-800 relative overflow-hidden">
             {/* Background decorative blob */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Rocket className="w-8 h-8 text-indigo-500" />
                    Product Roadmap
                </h2>
                <p className="text-neutral-400 mb-10 max-w-2xl">
                    We are constantly evolving to support modern web standards. Here is a glimpse of the powerful features currently in development.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Item 1 */}
                    <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 opacity-60">
                        <div className="flex justify-between items-start mb-4">
                             <CheckCircle className="w-6 h-6 text-green-500" />
                             <span className="text-xs font-bold bg-green-900/30 text-green-400 px-2 py-1 rounded">LIVE</span>
                        </div>
                        <h4 className="font-bold text-white text-lg">Web Editor v1</h4>
                        <p className="text-sm text-neutral-500 mt-2">Core editing and instant download functionality.</p>
                    </div>
                    
                    {/* Item 2 */}
                    <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 shadow-xl transform scale-105 ring-2 ring-indigo-500/50">
                        <div className="flex justify-between items-start mb-4">
                             <Cpu className="w-6 h-6 text-indigo-400" />
                             <span className="text-xs font-bold bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded">IN PROGRESS</span>
                        </div>
                        <h4 className="font-bold text-white text-lg">CSS & JS Optimizer</h4>
                        <p className="text-sm text-neutral-400 mt-2">Advanced support for external stylesheets and script minification.</p>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 border-dashed">
                        <div className="flex justify-between items-start mb-4">
                             <Layers className="w-6 h-6 text-neutral-500" />
                             <span className="text-xs font-bold bg-neutral-800 text-neutral-500 px-2 py-1 rounded">Q3 2025</span>
                        </div>
                        <h4 className="font-bold text-neutral-300 text-lg">Template Library</h4>
                        <p className="text-sm text-neutral-500 mt-2">Pre-built, responsive templates for landing pages and portfolios.</p>
                    </div>

                    {/* Item 4 */}
                    <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 border-dashed">
                        <div className="flex justify-between items-start mb-4">
                             <Zap className="w-6 h-6 text-neutral-500" />
                             <span className="text-xs font-bold bg-neutral-800 text-neutral-500 px-2 py-1 rounded">Q4 2025</span>
                        </div>
                        <h4 className="font-bold text-neutral-300 text-lg">Cloud Sync</h4>
                        <p className="text-sm text-neutral-500 mt-2">Save your code snippets securely and access them from any device.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    {/* FAQ Section */}
    <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
            <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                <h4 className="font-bold text-lg text-white">Is CodeSmith2View free for commercial use?</h4>
                <p className="text-neutral-400 mt-2">Yes, our tool is 100% free. You can use it to build landing pages for your business, client projects, or personal portfolios without any cost.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                <h4 className="font-bold text-lg text-white">Can I use external libraries like Bootstrap or Tailwind?</h4>
                <p className="text-neutral-400 mt-2">Absolutely. Simply include the CDN links in the &lt;head&gt; section of your code. Our preview engine renders them instantly, and they will be included in your download.</p>
            </div>
             <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                <h4 className="font-bold text-lg text-white">Do you store my code?</h4>
                <p className="text-neutral-400 mt-2">No. Privacy is our priority. All code generation happens in your browser's memory. We cannot see, access, or steal your projects.</p>
            </div>
        </div>
    </div>
  </div>
);

// --- Resources View (New Feature) ---
const ResourcesView = ({ setView }: { setView: (v: string) => void }) => (
    <div className="animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Developer Resources & Ideas</h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
                Curated guides, code snippets, and best practices to help you build better web experiences. 
                Regularly updated to keep you ahead of the curve.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-indigo-500/50 transition-all group">
                <div className="h-48 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                    <FileCode className="w-12 h-12 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div className="p-6">
                    <span className="text-xs font-bold text-indigo-400 mb-2 block uppercase tracking-wide">Tutorial</span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">Structuring HTML for SEO</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                        Learn how to use semantic HTML5 tags like &lt;header&gt;, &lt;article&gt;, and &lt;footer&gt; to improve your search engine ranking.
                    </p>
                    <button className="text-white font-medium text-sm hover:underline">Read Guide &rarr;</button>
                </div>
            </div>

            {/* Article 2 */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-indigo-500/50 transition-all group">
                <div className="h-48 bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div className="p-6">
                    <span className="text-xs font-bold text-green-400 mb-2 block uppercase tracking-wide">Performance</span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">Why Page Speed Matters</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                        A slow website kills conversions. Discover techniques to minify CSS and optimize images for lightning-fast loads.
                    </p>
                    <button className="text-white font-medium text-sm hover:underline">Read Guide &rarr;</button>
                </div>
            </div>

            {/* Article 3 */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-indigo-500/50 transition-all group">
                <div className="h-48 bg-gradient-to-br from-blue-900 to-cyan-900 flex items-center justify-center">
                    <Monitor className="w-12 h-12 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div className="p-6">
                    <span className="text-xs font-bold text-cyan-400 mb-2 block uppercase tracking-wide">Design</span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">Responsive Design Basics</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                        Master the viewport meta tag and CSS media queries to ensure your site looks great on mobile, tablet, and desktop.
                    </p>
                    <button className="text-white font-medium text-sm hover:underline">Read Guide &rarr;</button>
                </div>
            </div>
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
             <button className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-700 hover:border-indigo-500/50 rounded-full text-neutral-300 hover:text-white transition-all">
                <span>Load More Resources</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="text-neutral-600 text-xs mt-3 uppercase tracking-wider">Updates Weekly</p>
        </div>

        {/* Community Callout */}
        <div className="mt-16 bg-neutral-800 rounded-2xl p-8 text-center border border-neutral-700">
            <h3 className="text-2xl font-bold text-white mb-4">Have an Idea?</h3>
            <p className="text-neutral-400 mb-6">
                We are building this platform for you. If you have a resource or tool suggestion, let us know.
            </p>
            <button onClick={() => setView('contact')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors">
                Submit Your Idea
            </button>
        </div>
    </div>
);

const LegalLayout = ({ title, lastUpdated, children }: any) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
    <div className="border-b border-neutral-800 pb-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h1>
        <div className="flex items-center text-sm text-neutral-500">
            <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">Effective Date: {lastUpdated}</span>
        </div>
    </div>
    <div className="prose prose-invert prose-indigo max-w-none text-neutral-300">
        {children}
    </div>
  </div>
);

const PrivacyView = () => (
    <LegalLayout title="Privacy Policy" lastUpdated="May 15, 2025">
        <p>At CodeSmith2View, accessible from codesmith2view.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CodeSmith2View and how we use it.</p>
        
        <h3>Log Files</h3>
        <p>CodeSmith2View follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>

        <h3>Cookies and Web Beacons</h3>
        <p>Like any other website, CodeSmith2View uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>

        <h3>Third Party Partners</h3>
        <p>Some of our advertising partners may use cookies and web beacons on our site. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data.</p>
        
        <h3>Client-Side Processing</h3>
        <p>Our core service allows you to edit and download web files. This processing happens locally on your device (Client-Side). We do not save or upload your code content to our servers.</p>
    </LegalLayout>
);

const TermsView = () => (
    <LegalLayout title="Terms and Conditions" lastUpdated="May 15, 2025">
        <h3>1. Introduction</h3>
        <p>Welcome to CodeSmith2View! These terms and conditions outline the rules and regulations for the use of CodeSmith2View's Website, located at codesmith2view.com.</p>
        
        <h3>2. License</h3>
        <p>Unless otherwise stated, CodeSmith2View and/or its licensors own the intellectual property rights for all material on CodeSmith2View. All intellectual property rights are reserved. You may access this from CodeSmith2View for your own personal use subjected to restrictions set in these terms and conditions.</p>

        <h3>3. User Content</h3>
        <p>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant CodeSmith2View a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>

        <h3>4. Disclaimer</h3>
        <p>The materials on CodeSmith2View's website are provided on an 'as is' basis. CodeSmith2View makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
    </LegalLayout>
);

const CookieView = () => (
    <LegalLayout title="Cookie Policy" lastUpdated="May 15, 2025">
        <h3>1. What Are Cookies</h3>
        <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>

        <h3>2. How We Use Cookies</h3>
        <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or or not in case they are used to provide a service that you use.</p>

        <h3>3. Third Party Cookies</h3>
        <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Advertising Partners:</strong> We may use third-party vendors (such as Google AdSense) to serve ads. These vendors may use cookies (like the DoubleClick cookie) to serve more relevant ads across the web based on your visits to this and other sites.</li>
            <li><strong>Analytics:</strong> We may use third party analytics to track and measure usage of this site so that we can continue to produce engaging content. These cookies may track things such as how long you spend on the site or pages you visit which helps us to understand how we can improve the site for you.</li>
        </ul>
    </LegalLayout>
);

const AboutView = () => (
    <LegalLayout title="About Us" lastUpdated="2025">
        <p className="lead text-xl mb-6">CodeSmith2View is the ultimate browser-based development environment for modern web creators.</p>
        <p>Welcome to <strong>CodeSmith2View</strong>, your number one source for quick web deployment and testing. We're dedicated to providing you the best of developer tools, with a focus on dependability, speed, and privacy.</p>
        <p>Founded in 2023 and modernized in 2025, CodeSmith2View has evolved into a comprehensive suite for web developers. When we first started out, our passion for "simplifying the web" drove us to create a tool that requires zero setup.</p>
        <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
        <p className="mt-8 font-semibold">Sincerely,<br/>The CodeSmith2View Team</p>
    </LegalLayout>
);

const ContactView = () => (
    <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h1>
        <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow-lg">
            <p className="text-neutral-400 mb-6 text-center">Have questions regarding our tool, resources, or business partnership? Fill out the form below.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                    <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                    <input type="email" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="you@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">Message</label>
                    <textarea rows={4} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="How can we help?"></textarea>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                    Send Message
                </button>
            </form>
            <div className="mt-8 text-center text-sm text-neutral-500 border-t border-neutral-800 pt-6">
                <p className="mb-1">Email us directly: <span className="text-indigo-400">nokib@codesmith2view.com</span></p>
                <p>Quebec, Canada</p>
            </div>
        </div>
    </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-neutral-950 text-neutral-100 selection:bg-indigo-500 selection:text-white">
      <Navbar setView={setCurrentView} currentView={currentView} />
      
      <main className="flex-1">
        {currentView === 'home' && <HomeView setView={setCurrentView} />}
        {currentView === 'resources' && <ResourcesView setView={setCurrentView} />}
        {currentView === 'privacy' && <PrivacyView />}
        {currentView === 'terms' && <TermsView />}
        {currentView === 'cookies' && <CookieView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'about' && <AboutView />}
      </main>

      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;