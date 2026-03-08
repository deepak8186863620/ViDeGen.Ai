import { ClockCounterClockwise, Code } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function History() {
    const { history } = useApp();

    return (
        <div id="view-history" className="space-y-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Build History</h1>
            <div className="p-6 bg-[#0c0c0e] rounded-xl border border-zinc-800 shadow-xl">
                <h3 className="text-xl font-bold text-zinc-300 mb-4 flex items-center gap-2">
                    <ClockCounterClockwise weight="duotone" className="text-blue-500" /> Recent Blueprints
                </h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {history.length === 0 ? (
                        <div className="text-center py-10 text-sm text-zinc-500 flex flex-col items-center">
                            <ClockCounterClockwise weight="light" className="text-4xl mb-3 text-zinc-700" />
                            No architecture blueprints generated yet.
                        </div>
                    ) : (
                        history.map(item => (
                            <div key={item.id} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs text-blue-400 font-mono bg-blue-900/20 px-2 py-1 rounded">{item.framework}</span>
                                    <span className="text-xs text-zinc-500">{item.date}</span>
                                </div>
                                <p className="text-sm text-zinc-300 font-medium">"{item.prompt}"</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
