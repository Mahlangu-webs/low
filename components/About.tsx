
import React, { forwardRef, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface AboutProps {
    profileImage: string;
}

const About = forwardRef<HTMLElement, AboutProps>(({ profileImage }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

    return (
        <section id="about" ref={ref} className="py-24 bg-white">
            <div
                ref={sectionRef}
                className={`container mx-auto px-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">About Me</h2>
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
                    <div className="w-full md:w-1/3 flex justify-center">
                       <img 
                            src={https://capeitinitiative-my.sharepoint.com/:i:/g/personal/siyabonga_mahlangu_capaciti_org_za/ES_eRl6-I4VHilzLJFw2PS8BdP_KvoWnoyhQebVrXCrKCw?e=QXfImq}
                            alt="Siyabonga Mahlangu" 
                            className="rounded-full shadow-2xl object-cover w-64 h-64 md:w-80 md:h-80" 
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h3 className="text-2xl font-semibold text-slate-700 mb-4">A Passionate Developer & Analyst on a Mission</h3>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                            My journey into the world of technology began with a simple curiosity: how are digital experiences built? That curiosity led me to pursue a diploma in IT Management at IIE Rosebank College, where I've developed a solid foundation in web development, network architecture, IT support, and data analytics.
                        </p>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                            I thrive on turning complex problems into elegant, user-friendly solutions. With skills in HTML, CSS, and SQL, I enjoy the challenge of building applications that are both functional and impactful. My experience as a student and an intern at Capaciti has taught me the importance of teamwork and communication, and I'm always looking for new opportunities to learn and grow.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            I am keen to leverage my academic knowledge and hands-on experience to contribute
                            effectively in a dynamic IT role, with a particular interest in emerging technologies like
                            cybersecurity and data security.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

About.displayName = 'About';
export default About;
