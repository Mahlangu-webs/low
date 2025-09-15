
import React, { useState, RefObject } from 'react';

type SectionRefs = {
    [key: string]: RefObject<HTMLElement>;
};

interface HeaderProps {
    sectionRefs: SectionRefs;
}

const Header: React.FC<HeaderProps> = ({ sectionRefs }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (ref: RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };
    
    const navLinks = [
        { name: 'About', key: 'about' },
        { name: 'Skills', key: 'skills' },
        { name: 'Experience', key: 'experience' },
        { name: 'Certifications', key: 'certifications' },
        { name: 'Projects', key: 'projects' },
        { name: 'Contact', key: 'contact' },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <button onClick={() => scrollToSection(sectionRefs.home)} className="text-2xl font-bold text-slate-800">
                        Siyabonga Mahlangu
                    </button>
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                             <button
                                key={link.key}
                                onClick={() => scrollToSection(sectionRefs[link.key])}
                                className="text-slate-600 hover:text-sky-600 transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>
                    <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
                 {navLinks.map((link) => (
                    <button
                        key={link.key}
                        onClick={() => scrollToSection(sectionRefs[link.key])}
                        className="block w-full text-left py-2 px-6 text-slate-600 hover:bg-slate-100"
                    >
                        {link.name}
                    </button>
                ))}
            </div>
        </header>
    );
};

export default Header;
