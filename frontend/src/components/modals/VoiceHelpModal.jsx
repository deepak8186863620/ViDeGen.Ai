import { useApp } from '../../context/AppContext';

export default function VoiceHelpModal() {
    const { showVoiceHelp, setShowVoiceHelp } = useApp();

    if (!showVoiceHelp) return null;

    return (
        <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <div className="w-full max-w-lg bg-[#0b0b0d] border border-zinc-800 rounded-xl p-6 text-center shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Voice Commands: Quick Reference</h3>
                <ul className="text-left text-sm text-zinc-300 list-disc pl-5 space-y-3 mb-6 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    <li><span className="font-mono text-blue-400">Open settings</span> / <span className="font-mono text-blue-400">Show settings</span></li>
                    <li><span className="font-mono text-blue-400">Close settings</span> / <span className="font-mono text-blue-400">Hide settings</span></li>
                    <li><span className="font-mono text-blue-400">Set prompt to &lt;your prompt&gt;</span></li>
                    <li><span className="font-mono text-blue-400">Generate</span> / <span className="font-mono text-blue-400">Start build</span></li>
                    <li><span className="font-mono text-blue-400">Copy code</span> / <span className="font-mono text-blue-400">Copy the code</span></li>
                    <li><span className="font-mono text-blue-400">Open dashboard</span> / <span className="font-mono text-blue-400">Go to dashboard</span></li>
                    <li><span className="font-mono text-blue-400">Open history</span> / <span className="font-mono text-blue-400">Show history</span></li>
                </ul>
                <div className="flex items-center justify-center gap-4">
                    <button onClick={() => setShowVoiceHelp(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
}
