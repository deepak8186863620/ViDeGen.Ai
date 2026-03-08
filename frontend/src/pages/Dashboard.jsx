import { Gauge, FilePdf, UserCircle, FloppyDisk } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { history } = useApp();
    const { user } = useAuth();

    return (
        <div id="view-dashboard" className="space-y-10 animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">User Account Dashboard</h1>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* STATS / QUICK INFO */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-6 bg-[#0c0c0e] rounded-xl border border-blue-800/50 shadow-xl">
                        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2"><Gauge weight="duotone" /> Account Metrics</h3>
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-zinc-800 pb-2">
                                <dt className="text-zinc-400">Builds Completed</dt>
                                <dd className="font-bold text-white text-lg">{history.length}</dd>
                            </div>
                            <div className="flex justify-between border-b border-zinc-800 pb-2">
                                <dt className="text-zinc-400">Member Since</dt>
                                <dd className="text-zinc-300">Just now</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-zinc-400">Account Type</dt>
                                <dd className="text-green-400 font-medium">Architect (Free)</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="p-6 bg-[#0c0c0e] rounded-xl border border-zinc-800 shadow-xl font-mono text-xs">
                        <h3 className="text-sm font-semibold text-zinc-500 mb-2">IDENTIFICATION</h3>
                        <p className="break-all text-zinc-300 leading-relaxed">
                            <span className="text-blue-500 mr-2 font-bold">UID:</span> <span>{user ? user.id : 'guest-1234'}</span>
                        </p>
                    </div>

                    <div className="p-6 bg-[#0c0c0e] rounded-xl border border-zinc-800 shadow-xl">
                        <h3 className="text-xl font-bold text-zinc-300 mb-4 flex items-center gap-2"><FilePdf weight="duotone" /> Billing & Reports</h3>
                        <button className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-zinc-300 rounded-lg transition-colors">
                            Download Invoice (Coming Soon)
                        </button>
                    </div>
                </div>

                {/* PROFILE MANAGEMENT */}
                <div className="lg:col-span-2">
                    <div className="p-8 bg-[#0c0c0e] rounded-xl border border-zinc-800 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><UserCircle weight="duotone" /> Profile & Contact Details</h3>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">Email (Read-Only)</label>
                                    <input type="email" value={user ? user.email : "test@user.com"} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-500 focus:outline-none" readOnly />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">Profile Image URL</label>
                                    <input type="url" placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors" />
                                    <p className="text-[10px] text-zinc-500 mt-1">Paste a public image URL to use as your profile picture.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-400 mb-1">Preview</label>
                                        <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700">
                                            <span className="text-zinc-400 text-sm">No img</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">Phone Number</label>
                                    <input type="text" placeholder="+91 12345 67890" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <h4 className="text-md font-medium text-blue-300 pt-3 border-t border-zinc-800">Social & Professional Links</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">Instagram Handle</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-zinc-500 text-sm">@</span>
                                        <input type="text" placeholder="your_handle" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 pl-8 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">LinkedIn Profile URL</label>
                                    <input type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button type="submit" className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-green-900/40 flex items-center gap-2">
                                    <FloppyDisk weight="bold" /> Save Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
