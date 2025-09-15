
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 text-white py-8">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://www.linkedin.com/in/siyabonga-mahlangu-6a1a6921a" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
                </div>
                <p>&copy; {new Date().getFullYear()} Siyabonga Mahlangu. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
