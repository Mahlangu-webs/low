import React, { forwardRef, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface HomeProps {
    profileImage: string;
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Home = forwardRef<HTMLElement, HomeProps>(({ profileImage, onImageUpload }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3, triggerOnce: true });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <section id="home" ref={ref} className="min-h-screen flex items-center bg-slate-100 pt-24 md:pt-20">
            <div
                ref={sectionRef}
                className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left order-2 md:order-1">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 leading-tight">Siyabonga Mahlangu</h1>
                        <p className="mt-4 text-xl md:text-2xl text-sky-700 font-medium">IT Management Student | IT Support | Data Analytics | Aspiring Web Developer</p>
                        <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-slate-600">
                            A motivated and detail-oriented IT professional-in-training with a passion for web development, IT support, and data analytics. I am driven to solve complex technical challenges and create effective solutions.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                            <a href="#contact" className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-transform transform hover:scale-105 shadow-lg">
                                Get In Touch
                            </a>
                             <a href="https://capeitinitiative-my.sharepoint.com/:b:/g/personal/siyabonga_mahlangu_capaciti_org_za/Ea7HlPvapUpPgRV9LvD_IQAB1donJRCyyzIcXwrYtxegfQ?e=ah2Qcl" target="_blank" rel="noopener noreferrer" className="bg-white text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-transform transform hover:scale-105 shadow-lg">
                                View Resume
                            </a>
                            <a href="https://www.linkedin.com/in/siyabonga-mahlangu-6a1a6921a" target="_blank" rel="noopener noreferrer" className="bg-white text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-transform transform hover:scale-105 shadow-lg">
                                View LinkedIn
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center order-1 md:order-2">
                        <div className="relative group cursor-pointer" onClick={handleImageClick} role="button" aria-label="Change profile picture">
                            <img 
                                src={profileImage} 
                                alt="Siyabonga Mahlangu" 
                                className="rounded-full shadow-2xl object-cover w-3/4 sm:w-2/3 md:w-full max-w-md aspect-square transition-opacity duration-300 group-hover:opacity-70" 
                            />
                             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={onImageUpload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Home.displayName = 'Home';
export default Home;