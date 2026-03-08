import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="bg-[#0d1117] text-[#e6e6e6] min-h-screen text-center flex flex-col items-center">

            {/* HERO SECTION */}
            <section className="py-20 min-h-[80vh] flex flex-col items-center justify-center w-full px-6 max-w-3xl">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/034/810/104/small_2x/graphic-illustration-of-tribal-art-design-flying-dragon-spitting-fire-free-vector.jpg"
                    alt="ViDeGen AI Dragon Logo - Tribal Art"
                    className="h-24 mb-8 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                />

                <p className="text-sm font-semibold uppercase tracking-widest text-[#9ca3af] mb-2">
                    The Future of Web Development
                </p>

                <h1 className="text-6xl md:text-7xl font-black leading-tight text-[#d1d5db] mb-6">
                    Generate High-Fidelity Websites Instantly
                </h1>

                <p className="text-xl opacity-80 mb-12 max-w-[600px] mx-auto text-[#e6e6e6]">
                    Turn your plain language prompts into functional, clean, and customizable Tailwind CSS or pure HTML/CSS code.
                </p>

                <Link to="/architect" className="px-10 py-4 rounded-lg font-bold text-lg bg-[#1f2937] text-[#e6e6e6] border border-sky-400/20 shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] hover:scale-105 transition-all">
                    Start Building Now (It's Free!)
                </Link>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-20 w-full px-6 max-w-6xl">
                <h2 className="text-4xl font-black mb-3 text-[#d1d5db]">
                    🔥 What We Provide
                </h2>
                <p className="text-lg opacity-80 mb-12 text-[#e6e6e6]">
                    Leverage the power of AI to build websites without writing boiler plate code.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {/* Card 1 */}
                    <div className="p-6 rounded-xl bg-[#1a202c] border border-[#2d3748] shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all h-full">
                        <div className="text-2xl mb-3 text-[#38bdf8]">✨</div>
                        <h3 className="text-xl font-semibold mb-2 text-[#e6e6e6]">Pixel-Perfect Designs</h3>
                        <p className="text-sm text-[#9ca3af]">
                            Our AI generates production-ready code that matches modern design standards, ensuring your website looks professional on any device.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 rounded-xl bg-[#1a202c] border border-[#2d3748] shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all h-full">
                        <div className="text-2xl mb-3 text-[#38bdf8]">🛠️</div>
                        <h3 className="text-xl font-semibold mb-2 text-[#e6e6e6]">Tailwind & Pure CSS/HTML</h3>
                        <p className="text-sm text-[#9ca3af]">
                            Choose your output style. Get clean, utility-first <span className="font-bold">Tailwind CSS</span> or simple, elegant <span className="font-bold">Pure HTML/CSS</span>, ready for customization.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 rounded-xl bg-[#1a202c] border border-[#2d3748] shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all h-full">
                        <div className="text-2xl mb-3 text-[#38bdf8]">⚡</div>
                        <h3 className="text-xl font-semibold mb-2 text-[#e6e6e6]">Start Building Instantly</h3>
                        <p className="text-sm text-[#9ca3af]">
                            Simply type your request and receive the full code. No complex installations, dependencies, or sign-up hurdles needed.
                        </p>
                    </div>
                </div>

                <div className="mt-16">
                    <Link to="/architect" className="px-8 py-3 rounded-lg font-bold text-base bg-[#38bdf8] text-[#0d1117] shadow-[0_4px_20px_rgba(56,189,248,0.6)] hover:opacity-90 hover:-translate-y-0.5 transition-all inline-block">
                        Try ViDeGen AI Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
