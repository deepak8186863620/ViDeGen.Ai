import { useAuth } from '../../context/AuthContext';
import { X } from '@phosphor-icons/react';
import { useState } from 'react';

export default function AuthModal() {
    const { showAuthModal, setShowAuthModal, login } = useAuth();
    const [loginMode, setLoginMode] = useState('social');

    if (!showAuthModal) return null;

    const handleLogin = (e) => {
        e.preventDefault();
        login({ id: 'guest-1234', email: 'test@user.com', name: 'Guest User' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-black/95 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden relative">
                {/* Close Button top-right */}
                <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white z-10"><X weight="bold" className="text-xl" /></button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Headline and actions */}
                    <div className="p-10 text-center bg-gradient-to-b from-black/90 to-transparent">
                        <div className="mb-6">
                            <h1 className="text-4xl font-extrabold tracking-tight text-[#e3ebb2] metallic-text">ViDeGen.AI</h1>
                            <p className="mt-3 text-lg text-zinc-400">Build Full-Stack Web & Mobile Apps in minutes</p>
                        </div>

                        {loginMode === 'social' ? (
                            <div className="mt-12 space-y-4">
                                <button onClick={handleLogin} className="w-full text-left px-6 py-4 bg-gradient-to-r from-[#f0f3df] to-yellow-500 text-black font-semibold rounded-full shadow-lg flex items-center gap-4 hover:opacity-90">
                                    <span className="font-medium">Continue with Google (Demo)</span>
                                </button>

                                <div className="flex items-center gap-3 my-4">
                                    <div className="flex-1 h-px bg-zinc-800"></div>
                                    <div className="text-xs text-zinc-500">OR</div>
                                    <div className="flex-1 h-px bg-zinc-800"></div>
                                </div>

                                <div className="space-y-2">
                                    <button onClick={() => setLoginMode('email')} className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-full font-semibold text-white">Continue with Email</button>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 text-left animate-fade-in">
                                <button onClick={() => setLoginMode('social')} className="text-xs text-blue-400 mb-4 hover:underline">&larr; Back to Social</button>
                                <h2 className="text-2xl text-white font-bold mb-4">Sign in with Email</h2>
                                <form onSubmit={handleLogin} className="space-y-4 text-left">
                                    <div>
                                        <label className="block text-xs text-zinc-400 mb-1">Email</label>
                                        <input type="email" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-zinc-400 mb-1">Password</label>
                                        <input type="password" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-sm text-zinc-400">Forgot Password?</div>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-medium">Sign In</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="mt-8 text-xs text-zinc-600">
                            By continuing, you agree to our <a className="underline text-zinc-400" href="#">Terms of Service</a> and <a className="underline text-zinc-400" href="#">Privacy Policy</a>.
                        </div>
                    </div>

                    {/* Right: Decorative graphic (optional, empty or custom) */}
                    <div className="hidden md:flex p-8 bg-[#0b0b0d] border-l border-zinc-800 items-center justify-center">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/034/810/104/small_2x/graphic-illustration-of-tribal-art-design-flying-dragon-spitting-fire-free-vector.jpg"
                            alt="ViDeGen AI Dragon Logo - Tribal Art"
                            className="w-1/2 opacity-30 drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
