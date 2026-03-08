import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`mb-4 rounded-lg border bg-[#0e0202] text-left transition-colors duration-200 overflow-hidden ${isOpen ? 'border-[#e3ebb2]' : 'border-[#e3ebb2]/30 hover:border-[#e3ebb2]'}`}>
            <button
                className="flex w-full items-center justify-between p-5 text-lg font-semibold text-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {question}
                <span className={`text-[#38bdf8] text-2xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-96 px-6 pb-5 pt-2 opacity-100' : 'max-h-0 px-6 py-0 opacity-0'}`}
            >
                <p className="text-[#ddeaec]">{answer}</p>
            </div>
        </div>
    );
};

export default function Services() {
    return (
        <div className="bg-[#09090a] text-[#e6e6e6] min-h-screen text-center">

            {/* HERO SECTION */}
            <section className="py-24 bg-[#0c0c0c]">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-sm font-semibold uppercase text-[#38bdf8] mb-2 block">Our Offerings</span>
                    <h1 className="text-5xl font-extrabold text-[#d1d5db] mb-4">
                        Seamless Web Creation for Everyone
                    </h1>
                    <p className="text-lg text-[#ddeaec] max-w-2xl mx-auto">
                        ViDeGen AI provides a suite of powerful services designed to streamline your web development workflow, from concept to code.
                    </p>
                </div>
            </section>

            {/* SERVICES LIST */}
            <section className="py-20 max-w-6xl mx-auto px-6">
                <span className="text-sm font-semibold uppercase text-[#38bdf8] mb-2 block">Core Services</span>
                <h2 className="text-4xl font-extrabold text-[#d1d5db] mb-4">
                    What ViDeGen AI Delivers
                </h2>
                <p className="text-lg text-[#ddeaec] max-w-2xl mx-auto mb-16">
                    Experience the future of web development with our intelligent, efficient, and flexible solutions.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Service 1 */}
                    <div className="bg-[#0e0202] border border-[#e3ebb2]/30 rounded-xl p-8 text-left shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(16,0,0,0.3)] transition-all flex flex-col">
                        <div className="text-4xl text-[#38bdf8] mb-4 shrink-0">📝</div>
                        <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">Prompt-to-Code Generation</h3>
                        <p className="text-[#ddeaec] flex-grow mb-4">Instantly transform your natural language descriptions into complete, production-ready web code.</p>
                        <ul className="text-[0.95rem] text-[#ddeaec] space-y-2">
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Intuitive text input</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Fast generation speeds</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Highly accurate interpretations</li>
                        </ul>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-[#0e0202] border border-[#e3ebb2]/30 rounded-xl p-8 text-left shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(16,0,0,0.3)] transition-all flex flex-col">
                        <div className="text-4xl text-[#38bdf8] mb-4 shrink-0">✨</div>
                        <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">High-Fidelity UI/UX</h3>
                        <p className="text-[#ddeaec] flex-grow mb-4">Receive visually stunning and fully responsive designs that meet modern user experience standards.</p>
                        <ul className="text-[0.95rem] text-[#ddeaec] space-y-2">
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Modern aesthetic principles</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Responsive across all devices</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Semantic HTML structure</li>
                        </ul>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-[#0e0202] border border-[#e3ebb2]/30 rounded-xl p-8 text-left shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(16,0,0,0.3)] transition-all flex flex-col">
                        <div className="text-4xl text-[#38bdf8] mb-4 shrink-0">⚙️</div>
                        <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">Framework & Style Flexibility</h3>
                        <p className="text-[#ddeaec] flex-grow mb-4">Choose the output format that best suits your project's needs and your team's expertise.</p>
                        <ul className="text-[0.95rem] text-[#ddeaec] space-y-2">
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Clean Tailwind CSS</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Pure HTML/CSS</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Easy-to-customize code</li>
                        </ul>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-[#0e0202] border border-[#e3ebb2]/30 rounded-xl p-8 text-left shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(16,0,0,0.3)] transition-all flex flex-col">
                        <div className="text-4xl text-[#38bdf8] mb-4 shrink-0">🚀</div>
                        <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">Rapid Prototyping</h3>
                        <p className="text-[#ddeaec] flex-grow mb-4">Quickly generate functional prototypes for new ideas, client presentations, or A/B testing.</p>
                        <ul className="text-[0.95rem] text-[#ddeaec] space-y-2">
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Accelerated development cycles</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Reduced time-to-market</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Ideal for quick iterations</li>
                        </ul>
                    </div>

                    {/* Service 5 */}
                    <div className="bg-[#0e0202] border border-[#e3ebb2]/30 rounded-xl p-8 text-left shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(16,0,0,0.3)] transition-all flex flex-col">
                        <div className="text-4xl text-[#38bdf8] mb-4 shrink-0">🛠️</div>
                        <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">Code Refinement & Expansion</h3>
                        <p className="text-[#ddeaec] flex-grow mb-4">Input existing code snippets and prompts to refine elements or expand sections of your website.</p>
                        <ul className="text-[0.95rem] text-[#ddeaec] space-y-2">
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Intelligent code completion</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Style consistency enforcement</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Component generation</li>
                        </ul>
                    </div>

                    {/* Service 6 */}
                    <div className="bg-[#0e0202] border border-[#e3ebb2]/30 rounded-xl p-8 text-left shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(16,0,0,0.3)] transition-all flex flex-col">
                        <div className="text-4xl text-[#38bdf8] mb-4 shrink-0">📚</div>
                        <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">Learning & Documentation</h3>
                        <p className="text-[#ddeaec] flex-grow mb-4">Generate commented code that serves as an excellent learning resource for new web developers.</p>
                        <ul className="text-[0.95rem] text-[#ddeaec] space-y-2">
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Well-structured code</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Inline comments for clarity</li>
                            <li className="flex items-center"><span className="text-[#38bdf8] font-bold mr-2">✓</span>Best practice examples</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 pb-32 max-w-4xl mx-auto px-6">
                <span className="text-sm font-semibold uppercase text-[#38bdf8] mb-2 block">Questions & Answers</span>
                <h2 className="text-4xl font-extrabold text-[#d1d5db] mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-[#ddeaec] max-w-2xl mx-auto mb-12">
                    Find quick answers to common questions about ViDeGen AI's services and functionality.
                </p>

                <div className="max-w-[800px] mx-auto space-y-4">
                    <FAQItem
                        question="What kind of websites can ViDeGen AI generate?"
                        answer="ViDeGen AI can generate a wide range of static, responsive websites, including landing pages, portfolios, small business sites, and informational pages. It's ideal for projects that primarily involve HTML and CSS structures, with support for modern frameworks like Tailwind CSS."
                    />
                    <FAQItem
                        question="Do I need to know how to code to use ViDeGen AI?"
                        answer="Not at all! ViDeGen AI is designed for both beginners and experienced developers. You can use plain language prompts, and the AI will handle the code generation. For those who want more control, the generated code is clean and easily customizable."
                    />
                    <FAQItem
                        question="Can I integrate the generated code with existing projects?"
                        answer="Absolutely! The code outputted by ViDeGen AI is modular and clean, whether it's Pure HTML/CSS or Tailwind CSS. You can easily copy and paste sections, components, or even entire pages into your existing web projects."
                    />
                    <FAQItem
                        question="Is the generated code mobile-responsive?"
                        answer="Yes, all code generated by ViDeGen AI is built with responsiveness in mind. It automatically adapts to various screen sizes, ensuring your website looks great on desktops, tablets, and mobile devices."
                    />
                </div>
            </section>
        </div>
    );
}
