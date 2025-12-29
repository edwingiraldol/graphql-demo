import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const [open, setOpen] = useState(false);
    const linkClass = (isActive: boolean) =>
        `block px-3 py-2 rounded ${isActive ? 'bg-blue-700 text-white' : 'text-gray-200 hover:bg-blue-600 hover:text-white'}`;

    return (
        <header className="bg-blue-600 text-white">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
                <div className="flex items-center gap-4">
                    <NavLink to="/" className="text-xl font-bold">SpaceX Explorer</NavLink>
                    <nav className="hidden md:flex gap-2 items-center">
                        <NavLink to="/launches" className={({ isActive }) => linkClass(isActive)}>Launches</NavLink>
                        <NavLink to="/rockets" className={({ isActive }) => linkClass(isActive)}>Rockets</NavLink>
                        <NavLink to="/ships" className={({ isActive }) => linkClass(isActive)}>Ships</NavLink>
                        <NavLink to="/statistics" className={({ isActive }) => linkClass(isActive)}>Statistics</NavLink>
                        <NavLink to="/history" className={({ isActive }) => linkClass(isActive)}>History</NavLink>
                        <NavLink to="/users" className={({ isActive }) => linkClass(isActive)}>Users</NavLink>
                        <NavLink to="/about" className={({ isActive }) => linkClass(isActive)}>About</NavLink>
                    </nav>
                </div>

                <div className="md:hidden">
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setOpen((s) => !s)}
                        className="p-2 rounded hover:bg-blue-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden bg-blue-700 border-t border-blue-500">
                    <nav className="px-2 py-3 space-y-1">
                        <NavLink to="/launches" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>Launches</NavLink>
                        <NavLink to="/rockets" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>Rockets</NavLink>
                        <NavLink to="/ships" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>Ships</NavLink>
                        <NavLink to="/statistics" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>Statistics</NavLink>
                        <NavLink to="/history" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>History</NavLink>
                        <NavLink to="/users" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>Users</NavLink>
                        <NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>About</NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
}