import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Generator from './Generator';
import Dashboard from './Dashboard';
import History from './History';

export default function AppArchitect() {
    const [currentView, setCurrentView] = useState('generator');

    return (
        <div className="flex min-h-screen bg-[#09090b] text-[#a1a1aa] selection:bg-blue-500/30 selection:text-blue-200">
            <Sidebar setView={setCurrentView} currentView={currentView} />
            <main className="flex-grow overflow-y-auto p-8 min-h-screen flex flex-col relative w-full overflow-hidden">
                {currentView === 'generator' && <Generator />}
                {currentView === 'dashboard' && <Dashboard />}
                {currentView === 'history' && <History />}
            </main>
        </div>
    );
}
