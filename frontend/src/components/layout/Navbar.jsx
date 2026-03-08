import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav id="future-interns-navbar" className="w-full py-4 px-8 flex justify-center sticky top-0 z-50 transition-colors"
            style={{
                backgroundColor: 'var(--panel-bg, #09090b)',
                borderBottom: '1px solid var(--border-color, #27272a)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}>

            <div className="flex items-center justify-between w-full max-w-7xl">

                <div className="flex items-center">
                    <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 18.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zM12 7v8M9.5 9.5l4 4M14.5 9.5l-4 4" stroke="#4CD964" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-2xl font-bold">
                        <span style={{ color: '#e3ebb2' }}>ViDe</span>
                        <span style={{ color: '#e3ebb2' }}>Gen.Ai</span>
                    </span>
                </div>

                <div className="flex items-center space-x-6 text-sm font-medium" style={{ color: 'var(--text-color, #a1a1aa)' }}>
                    <Link to="/" className="hover:text-amber-200 transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-amber-200 transition-colors">About Us</Link>
                    <Link to="/services" className="hover:text-amber-200 transition-colors">Services</Link>
                    <Link to="/architect" className="hover:text-amber-200 transition-colors">App Architect</Link>
                    <a href="#" className="hover:text-amber-200 transition-colors">Contact Us</a>
                </div>

                <Link to="/architect" className="py-3 px-6 rounded-full font-semibold shadow-md transition-all duration-300"
                    style={{
                        backgroundColor: 'white',
                        color: '#333333',
                        border: '1px solid #cccccc',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                    Start Building
                </Link>
            </div>
        </nav>
    );
}
