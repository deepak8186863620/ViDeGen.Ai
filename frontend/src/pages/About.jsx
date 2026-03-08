export default function About() {
    return (
        <div className="bg-[#0d1117] text-[#e6e6e6] min-h-screen">

            {/* HER0 SECTION */}
            <section className="py-24 bg-[#161b22]">
                <div className="max-w-[1152px] mx-auto px-6 max-w-5xl">
                    <span className="text-sm font-semibold uppercase text-[#38bdf8] mb-2 block">About Hero</span>
                    <h1 className="text-5xl font-extrabold leading-tight text-[#d1d5db] mb-4">
                        Empowering the Future of Web Development
                    </h1>
                    <p className="text-lg text-[#9ca3af] mb-8 max-w-3xl">
                        ViDeGen AI is an innovative platform that transforms plain language into high-fidelity, production-ready websites, instantly.
                    </p>
                    <button className="px-8 py-3 rounded-lg font-bold text-base bg-[#38bdf8] text-[#0d1117] shadow-[0_4px_15px_rgba(56,189,248,0.4)] hover:opacity-90 hover:scale-105 transition-all">
                        Join Our Journey
                    </button>
                </div>
            </section>

            {/* PURPOSE SECTION */}
            <section className="py-20 max-w-[1152px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                <div className="w-full lg:w-[45%] max-w-[400px] shrink-0 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
                    <img src="https://thumbs.dreamstime.com/b/robot-hand-touching-web-hologram-futuristic-technology-ai-finger-glowing-hud-diverse-internet-icons-security-global-283997577.jpg"
                        alt="Digital illustration of an AI brain/circuitry"
                        className="w-full h-auto object-cover" />
                </div>

                <div className="flex-grow text-center lg:text-left">
                    <span className="text-sm font-semibold uppercase text-[#38bdf8] mb-2 block">Our Purpose</span>
                    <h2 className="text-4xl font-extrabold text-[#d1d5db] mb-4">
                        Mission: To Democratize Web Creation
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 text-[0.95rem] text-[#9ca3af]">
                        <p className="flex-1">
                            We believe that everyone should be able to turn down the bare web, responsive, static sites to bring you the answers you ask for.
                        </p>
                        <p className="flex-1">
                            To accelerate the idea-to-deployment time for websites, making professional-grade web presence accessible to everyone, regardless of coding expertise.
                        </p>
                    </div>
                </div>
            </section>

            {/* PURPOSE SECTION 2 */}
            <section className="py-20 max-w-[1152px] mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="w-full lg:w-[45%] max-w-[400px] shrink-0 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
                    <img src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901770.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="Digital illustration of programming"
                        className="w-full h-auto object-cover" />
                </div>

                <div className="flex-grow text-center lg:text-left">
                    <span className="text-sm font-semibold uppercase text-[#38bdf8] mb-2 block">Our Purpose</span>
                    <h2 className="text-4xl font-extrabold text-[#d1d5db] mb-4">
                        Mission: To Democratize Web Creation
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 text-[0.95rem] text-[#9ca3af]">
                        <p className="flex-1">
                            To Democratize Web Creation by empowering users to bypass traditional coding barriers and generate high-fidelity websites instantly.
                        </p>
                        <p className="flex-1">
                            Guided by the principles of Innovation, Code Integrity, Universal Access, and fostering a strong Developer Community.
                        </p>
                    </div>
                </div>
            </section>

            {/* TECHNOLOGY SECTION */}
            <section className="py-20 pb-32 max-w-[1152px] mx-auto px-6">
                <div className="max-w-4xl mx-auto text-left mb-12">
                    <span className="text-sm font-semibold uppercase text-[#38bdf8] mb-2 block">Technology</span>
                    <h2 className="text-4xl font-extrabold text-[#d1d5db] mb-4">
                        How It Works: The Power of Instant Development AI
                    </h2>
                    <p className="text-lg text-[#9ca3af]">
                        Our proprietary AI model is trained on millions of examples, and fine-tuned to generate pixel-perfect websites you get back from your fast lines and minimally.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg bg-[#1f2937] border border-[#374151] shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                        <div className="text-2xl text-[#38bdf8] mb-3">🧠</div>
                        <h4 className="text-lg font-bold text-[#e6e6e6] mb-2">Advanced NLP</h4>
                        <p className="text-sm text-[#9ca3af]">Understands & interprets and prediction design for amateur coder needs.</p>
                    </div>

                    <div className="p-6 rounded-lg bg-[#1f2937] border border-[#374151] shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                        <div className="text-2xl text-[#38bdf8] mb-3">✨</div>
                        <h4 className="text-lg font-bold text-[#e6e6e6] mb-2">High-Fidelity Code</h4>
                        <p className="text-sm text-[#9ca3af]">Generates clean, semantic & production-ready HTML/CSS/Tailwind.</p>
                    </div>

                    <div className="p-6 rounded-lg bg-[#1f2937] border border-[#374151] shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                        <div className="text-2xl text-[#38bdf8] mb-3">⚙️</div>
                        <h4 className="text-lg font-bold text-[#e6e6e6] mb-2">Customizable</h4>
                        <p className="text-sm text-[#9ca3af]">Easily modify existing elements and generated code to fit your needs.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
