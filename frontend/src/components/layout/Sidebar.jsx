import { Link, useLocation } from 'react-router-dom';
import {
    Lightning, Gauge, ClockCounterClockwise, Headset, Gear, SignOut
} from '@phosphor-icons/react';

export default function Sidebar({ setView }) {
    const location = useLocation();

    return (
        <nav id="sidebar" className="w-64 flex-shrink-0 bg-[#0c0c0e] border-r border-zinc-800 p-4 flex flex-col justify-between sticky top-0 h-screen transition-all duration-300">
            <div>
                {/* Logo/Title: Updated with platinum style */}
                <div className="h-16 flex items-center mb-6 px-2">
                    <span className="font-bold text-2xl platinum-text tracking-tight">ViDeGen<span className="text-blue-500 text-xl">.AI</span></span>
                    <div id="auth-status-indicator" className="ml-3 text-xs text-green-400 hidden"></div>
                </div>

                {/* Nav Links */}
                <div className="space-y-1">
                    <button onClick={() => setView('generator')} className="nav-item w-full active-tab">
                        <Lightning weight="fill" className="text-lg" />
                        <span>AI Architect</span>
                    </button>
                    <button onClick={() => setView('dashboard')} className="nav-item w-full">
                        <Gauge weight="fill" className="text-lg" />
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => setView('history')} className="nav-item w-full">
                        <ClockCounterClockwise weight="fill" className="text-lg" />
                        <span>Build History</span>
                    </button>
                    <button className="nav-item w-full">
                        <Headset weight="fill" className="text-lg" />
                        <span>Support (Chat)</span>
                    </button>
                </div>
            </div>

            {/* Profile & Settings Block */}
            <div className="p-2 border-t border-zinc-800 pt-4">
                <div className="flex items-center justify-end text-sm mb-3">
                    <button className="text-zinc-500 hover:text-white transition-colors" title="Settings">
                        <Gear weight="fill" className="text-lg" />
                    </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-blue-900/20" id="user-avatar">D</div>
                        <span id="user-email-header" className="text-sm font-medium text-white truncate max-w-[100px]">test@user.com</span>
                    </div>
                    <Link to="/" className="text-zinc-500 hover:text-red-400 transition-colors" title="Logout">
                        <SignOut weight="bold" className="text-lg" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
