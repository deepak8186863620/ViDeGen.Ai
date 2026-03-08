import { useApp } from '../../context/AppContext';
import { X, Key } from '@phosphor-icons/react';
import { useState } from 'react';

export default function SettingsModal() {
    const { showSettings, setShowSettings, settings, updateSettings } = useApp();
    const [apiKey, setApiKey] = useState(settings.apiKey);
    const [demoMode, setDemoMode] = useState(settings.demoMode);

    if (!showSettings) return null;

    const handleSave = () => {
        updateSettings({ apiKey, demoMode });
        setShowSettings(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity">
            <div className="w-[500px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="h-12 bg-zinc-950 border-b border-zinc-800 flex items-center px-6 justify-between">
                    <span className="text-sm font-semibold text-white">System Configuration</span>
                    <button onClick={() => setShowSettings(false)} className="text-zinc-500 hover:text-white">
                        <X weight="bold" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-6">
                        <label className="block text-xs text-blue-400 font-medium mb-2 uppercase tracking-wider">Gemini API Connection</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                                placeholder="AIzaSy..."
                            />
                            <Key weight="fill" className="absolute right-3 top-3 text-zinc-600" />
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-2">Get your key from Google AI Studio. Stored locally.</p>
                    </div>

                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-zinc-300">Platform Version</span>
                            <span className="text-xs text-zinc-500 font-mono">v5.2.0-platinum-react</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-300">Lead Architect</span>
                            <span className="text-xs text-blue-400 font-bold">Deepak Prajapati</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={demoMode}
                                onChange={(e) => setDemoMode(e.target.checked)}
                                className="form-checkbox text-blue-600 bg-zinc-900 border-zinc-700 rounded transition-colors"
                            />
                            <span className="text-xs text-zinc-300">Enable Demo Mode (bypass authentication)</span>
                        </label>
                        <p className="text-[10px] text-zinc-500 mt-2">When enabled, clicking any Login or Sign-in button will open the main app without real authentication. For development only.</p>
                    </div>
                </div>
                <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
                    <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-xs text-zinc-400 hover:text-white font-medium">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
