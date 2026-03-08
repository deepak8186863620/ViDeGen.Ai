import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen bg-[#09090b] text-[#a1a1aa]">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
