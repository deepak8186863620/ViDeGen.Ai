import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DownloadSimple, Lightning, Gear, Desktop, DeviceMobile, ArrowSquareOut, Sliders, MagicWand } from '@phosphor-icons/react';

export default function Generator() {
    const { settings, setShowSettings, setShowVoiceHelp, addHistoryItem } = useApp();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewDevice, setPreviewDevice] = useState('desktop');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    // Advanced Settings
    const [framework, setFramework] = useState('React');
    const [colorPalette, setColorPalette] = useState('dark');
    const [includeAnimations, setIncludeAnimations] = useState(true);
    const [optimizeSEO, setOptimizeSEO] = useState(true);
    const [jsLibrary, setJsLibrary] = useState('None');

    const [generatedCode, setGeneratedCode] = useState('');
    const [statusMessage, setStatusMessage] = useState('Awaiting Architectural Instructions');
    const iframeRef = useRef(null);

    const promptSuggestions = [
        { label: 'Mini Project: Weather App', prompt: 'Create a beautiful weather dashboard React app. It should have a glassmorphism design, search bar for cities, display current temperature, humidity, wind speed, and a 5-day forecast. Include micro-animations for weather icons.' },
        { label: 'Major Project: E-Commerce', prompt: 'Build a complete E-Commerce React storefront. Include a hero section, product grid with hover effects, a functional shopping cart slide-out, category filters, and a dark/light mode toggle. Make it highly premium and mobile responsive.' },
        { label: 'Hackathon: AI Analytics Dashboard', prompt: 'Design a high-tech AI Analytics Dashboard for a hackathon. Use a dark, cyberpunk or neon theme. Include mock data visualization widgets, a sidebar for navigation, a performance metric grid, and a real-time activity feed.' }
    ];

    const getHtmlPreviewPayload = (reactCode) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
</head>
<body class="bg-gray-900 text-white">
  <div id="root"></div>
  <script type="text/babel" data-type="module">
    const { useState, useEffect, useRef, useMemo } = React;
    
    // AI Generated Code Below:
    ${reactCode.replace(/export\s+default\s+App;?/, '')}
    
    // Mount App
    const root = ReactDOM.createRoot(document.getElementById('root'));
    if (typeof App !== 'undefined') {
      root.render(<App />);
    } else {
      root.render(<div className="p-8 text-red-500">Error: App component not found in generated code.</div>);
    }
  </script>
</body>
</html>`;

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        if (!settings.apiKey) {
            alert('API Key is disabled or missing. Please configure it in Settings.');
            setShowSettings(true);
            return;
        }

        setIsGenerating(true);
        setStatusMessage('Architecting... Compiling Layouts...');
        setGeneratedCode('');
        setSuggestions([]);

        try {
            const systemPrompt = `You are ViDeGen.AI, an expert React web developer and architect engine created by Deepak Prajapati. 
Your task is to generate a COMPLETE, fully-functional, feature-rich single-file web application based on the user's prompt.
Do not just build a simple MVP. You must proactively anticipate user needs and add advanced features, state management, interactive UI, and error handling without being explicitly asked.
For example, if the user asks for a 'todo app', you should add categories, filtering, local storage persistence, animations, and beautiful empty states. Be creative and build the ultimate version of what they ask for.

CONFIGURATION:
- Framework: ${framework}
- Color Palette: ${colorPalette}
- Micro-Animations: ${includeAnimations ? 'Enabled' : 'Disabled'}
- SEO Optimization: ${optimizeSEO ? 'Enabled' : 'Disabled'}
- JS Library: ${jsLibrary !== 'None' ? jsLibrary : 'None'}

MANDATORY RULES:
1. PURE REACT COMPONENT: You MUST return ONLY the raw JSX code for a single 'App' component. DO NOT return HTML boilerplate. DO NOT wrap it in '<!DOCTYPE html>'. 
2. AESTHETICS: Use Tailwind CSS classes. The UI must be stunning, extremely premium, very modern, and highly polished. Use glassmorphism, gradients, hover effects.
3. IMAGES & ICONS: Use https://image.pollinations.ai/prompt/{keyword}?nologo=true. Use Phosphor Icons as if they are globally available (e.g. '<i className="ph ph-heart"></i>').
4. STATE & LOGIC: Use 'useState', 'useEffect', 'useRef' directly (they will be available in the environment). 
5. RESPONSE FORMAT: You must return ONLY raw JSON matching this schema: 
{ 
  "code": "const App = () => {\\n  const [count, setCount] = useState(0);\\n  return <div className=\\"p-8\\">Hello World</div>;\\n};\\n\\nexport default App;", 
  "description": "<string describing what you built>",
  "proactiveFeatures": ["<list of 3-5 advanced features you proactively added to make it better>"]
}`;

            let response;
            for (let i = 0; i < 3; i++) {
                try {
                    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${settings.apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ role: 'user', parts: [{ text: prompt }] }],
                            systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
                            generationConfig: { responseMimeType: "application/json" }
                        })
                    });
                    if (response.ok) break;
                    if (response.status === 429) {
                        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                    } else {
                        const errorData = await response.json();
                        throw new Error(`API Error ${response.status}: ${errorData?.error?.message || 'Unknown Error'}`);
                    }
                } catch (e) {
                    if (i === 2) throw e;
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }
            }

            if (!response || !response.ok) throw new Error("Failed to get a response from the AI Architect.");

            const result = await response.json();
            const jsonText = result.candidates[0].content.parts[0].text;
            let data = JSON.parse(jsonText.replace(/```json|```/g, '').trim());

            if (data.code) {
                setGeneratedCode(data.code);
                setSuggestions(data.proactiveFeatures || []);
                addHistoryItem({
                    id: Date.now(),
                    prompt: prompt,
                    framework: framework,
                    date: new Date().toLocaleString()
                });

                if (iframeRef.current) {
                    iframeRef.current.srcdoc = getHtmlPreviewPayload(data.code);
                }
            }
            setStatusMessage('Build Complete');
        } catch (error) {
            console.error("Generation Error:", error);
            setStatusMessage('Generation Failed. Check Console.');
            alert(`Generation Failed: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadZip = async () => {
        if (!generatedCode) return;
        try {
            const JSZip = window.JSZip;
            if (!JSZip) {
                alert("JSZip library is still loading. Please try again in a moment.");
                return;
            }
            const zip = new JSZip();

            // Generate standard Vite + React project files
            zip.file("package.json", JSON.stringify({
                "name": "videgen-react-app",
                "private": true,
                "version": "1.0.0",
                "type": "module",
                "scripts": {
                    "dev": "vite",
                    "build": "vite build",
                    "preview": "vite preview"
                },
                "dependencies": {
                    "react": "^18.2.0",
                    "react-dom": "^18.2.0"
                },
                "devDependencies": {
                    "@types/react": "^18.2.15",
                    "@types/react-dom": "^18.2.7",
                    "@vitejs/plugin-react": "^4.0.3",
                    "vite": "^4.4.5"
                }
            }, null, 2));

            zip.file("index.html", `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <title>ViDeGen AI App</title>
  </head>
  <body class="bg-gray-900 text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`);

            zip.file("vite.config.js", `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})`);

            zip.folder("src").file("main.jsx", `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`);

            // Add the AI generated code
            let cleanCode = generatedCode;
            if (!cleanCode.includes("import React")) {
                cleanCode = "import React, { useState, useEffect, useRef, useMemo } from 'react';\n" + cleanCode;
            }
            zip.folder("src").file("App.jsx", cleanCode);

            // Generate zip
            const blob = await zip.generateAsync({ type: "blob" });

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "videgen-react-app.zip";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            alert('App Downloaded! Extract the ZIP, run "npm install" then "npm run dev" to start your React project.');
        } catch (err) {
            console.error(err);
            alert('Failed to generate ZIP.');
        }
    };

    const handleFullPreview = () => {
        if (!generatedCode) {
            alert("No build generated yet.");
            return;
        }
        const blob = new Blob([getHtmlPreviewPayload(generatedCode)], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
    };

    return (
        <div id="view-generator" className="space-y-8 animate-fade-in">
            {/* TWO-COLUMN GENERATION / PREVIEW AREA */}
            <div className="flex flex-col lg:flex-row gap-6 min-h-[62vh]">

                {/* LEFT: Generator controls and prompt */}
                <div className="flex-1 p-6 bg-zinc-950 rounded-8xl border border-blue-700/50 shadow-2xl flex flex-col gap-6">
                    <div className="flex-1">
                        <h2 className="metallic-text text-6xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_4px_8px_rgba(255,255,255,0.2)] mb-4">INPUT PROMPT</h2>

                        {/* Prompt Suggestions */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {promptSuggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPrompt(s.prompt)}
                                    className="text-xs font-semibold bg-blue-900/30 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-800/50 rounded-full px-3 py-1.5 transition-all flex items-center gap-1"
                                >
                                    <MagicWand weight="bold" /> {s.label}
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={4}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-300 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            placeholder="// Command the AI to design your web page...&#10;// e.g. Create a sleek landing page for a decentralized finance platform, ensuring mobile responsiveness."
                        />
                    </div>

                    <div className="flex flex-col justify-end gap-3 lg:w-100 w-100 flex-shrink-0 mx-auto">
                        {suggestions.length > 0 && (
                            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mb-2 animate-fade-in text-left">
                                <h4 className="text-blue-400 font-bold text-xs uppercase mb-2 flex items-center gap-2"><Lightning weight="fill" /> Proactive AI Enhancements</h4>
                                <ul className="text-zinc-300 text-xs list-disc pl-5 space-y-1.5 leading-relaxed">
                                    {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        )}
                        <button
                            onClick={handleDownloadZip}
                            disabled={!generatedCode || isGenerating}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-green-900/40 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:shadow-none flex justify-center items-center gap-2"
                        >
                            <DownloadSimple weight="bold" /> Download React Project (ZIP)
                        </button>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-3 text-white text-sm font-bold rounded-lg transition-colors shadow-lg flex justify-center items-center gap-2 ${isGenerating ? 'bg-blue-800 animate-pulse' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/40'}`}
                        >
                            <Lightning weight="bold" /> {isGenerating ? 'Building...' : 'Initialise Build'}
                        </button>

                        <div className="relative mt-2">
                            <button title="Voice Assistant" className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-3">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white font-bold text-xs" style={{ paddingBottom: '2px' }}>🎤</span>
                                <span>Voice Assistant</span>
                            </button>
                            <button title="Voice Help" onClick={() => setShowVoiceHelp(true)} className="absolute -top-10 right-1 p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs text-center w-6 h-6 leading-none">?</button>
                        </div>

                        <button onClick={() => setShowSettings(true)} className="w-full text-xs text-zinc-400 hover:text-blue-400 flex items-center justify-center gap-2 transition-colors mt-2">
                            <Gear weight="fill" /> Config
                        </button>
                    </div>
                </div>

                {/* RIGHT: Preview */}
                <div className="flex-1 flex flex-col p-0 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border border-zinc-800 border-b-0 rounded-t-xl">
                        <div className="flex gap-2">
                            <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded transition-all ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`} title="Desktop View">
                                <Desktop weight="bold" className="text-lg" />
                            </button>
                            <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded transition-all ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`} title="Mobile View">
                                <DeviceMobile weight="bold" className="text-lg" />
                            </button>
                        </div>

                        <div className="text-xs text-zinc-500 font-mono bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                            secure://immersive-sandbox.videgen.ai
                        </div>

                        <button onClick={handleFullPreview} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg border border-zinc-700 transition-all">
                            <ArrowSquareOut weight="bold" /> Full Preview
                        </button>
                    </div>

                    <div id="preview-wrapper" className="flex-1 bg-zinc-800 border border-zinc-800 rounded-b-xl overflow-hidden relative">
                        <div className={`w-full h-full bg-white transition-all duration-500 flex flex-col relative ${previewDevice === 'desktop' ? 'device-desktop' : 'device-mobile'}`}>
                            <iframe ref={iframeRef} id="preview-frame" className="w-full h-full min-h-[60vh] border-none" sandbox="allow-scripts allow-forms allow-same-origin allow-modals"></iframe>

                            {!generatedCode && <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 z-10">
                                <div className={`w-20 h-20 bg-black rounded-3xl border border-zinc-200 shadow-lg flex items-center justify-center mb-4 ${isGenerating ? 'animate-spin' : 'animate-[bounce_3s_infinite]'}`}>
                                    <Desktop weight="duotone" className="text-4xl text-zinc-400" />
                                </div>
                                <h3 className="text-zinc-900 font-bold text-lg">{statusMessage}</h3>
                                <p className="text-zinc-500 text-sm mt-1">ViDeGen Engine React Wrapper</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* ADVANCED OPTIONS */}
            <div className="flex justify-center mt-6 mb-4">
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="bg-zinc-800 text-sm text-zinc-300 font-medium py-2 px-6 rounded-full border border-zinc-700 shadow-md transition-colors duration-200 hover:bg-zinc-700 hover:text-white flex items-center gap-2">
                    {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </button>
            </div>

            {showAdvanced && (
                <div className="mt-8 p-6 glass-panel rounded-xl animate-fade-in mx-auto border border-zinc-700/50">
                    <h3 className="text-xl md:text-2xl font-extrabold uppercase pt-2 tracking-widest flex items-center gap-2 text-gold-400 mb-6 border-b border-zinc-800 pb-4">
                        <Sliders weight="fill" className="text-2xl text-zinc-400" />
                        <span className="text-[#f4f8df]">ADVANCED BUILD OPTIONS</span>
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8 text-base font-medium">
                        <div className="space-y-6">
                            <h3 className="metallic-text text-xl md:text-2xl font-extrabold tracking-tight">STYLING & STRUCTURE</h3>

                            <label className="block">
                                <span className="text-sm font-bold text-zinc-400 block mb-2">Target Framework</span>
                                <select value={framework} onChange={e => setFramework(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm transition-colors text-white focus:outline-none focus:border-blue-500">
                                    <option value="HTML">HTML + Tailwind</option>
                                    <option value="React">React (Single File)</option>
                                    <option value="Angular">Angular (Single File)</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-sm font-bold text-zinc-400 block mb-2">Color Palette</span>
                                <select value={colorPalette} onChange={e => setColorPalette(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm transition-colors text-white focus:outline-none focus:border-blue-500">
                                    <option value="dark">Dark Mode (Default)</option>
                                    <option value="light">Light Mode</option>
                                    <option value="vibrant">Vibrant Gradient</option>
                                    <option value="mono">Monochromatic</option>
                                </select>
                            </label>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xl md:text-2xl font-extrabold uppercase metallic-text tracking-tight">INTERACTIVITY & SEO</h4>

                            <label className="flex items-center justify-between text-zinc-300 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors">
                                Include Micro-Animations (CSS/JS)
                                <input type="checkbox" checked={includeAnimations} onChange={e => setIncludeAnimations(e.target.checked)} className="form-checkbox text-blue-600 bg-zinc-900 border-zinc-500 rounded p-2" />
                            </label>

                            <label className="flex items-center justify-between text-zinc-300 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors">
                                Optimize for SEO Headers (Meta/Title)
                                <input type="checkbox" checked={optimizeSEO} onChange={e => setOptimizeSEO(e.target.checked)} className="form-checkbox text-blue-600 bg-zinc-900 border-zinc-500 rounded p-2" />
                            </label>

                            <label className="block pt-2">
                                <span className="text-sm font-bold text-zinc-400 block mb-2">3D/Data JS Library</span>
                                <select value={jsLibrary} onChange={e => setJsLibrary(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm transition-colors text-white focus:outline-none focus:border-blue-500">
                                    <option value="None">None</option>
                                    <option value="Three.js">Three.js (3D Graphics)</option>
                                    <option value="D3.js">D3.js (Data Visualization)</option>
                                </select>
                            </label>

                            <label className="flex items-center justify-between text-zinc-300 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors">
                                Enable Voice Assistant Context
                                <input type="checkbox" className="form-checkbox text-blue-600 bg-zinc-900 border-zinc-500 rounded p-2" />
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
