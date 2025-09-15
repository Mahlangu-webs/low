
import React, { forwardRef, useRef } from 'react';
import { EXPERIENCE } from '../constants';
import { ExperienceItem as ExperienceItemType } from '../types';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ExperienceItem: React.FC<{ item: ExperienceItemType }> = ({ item }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(itemRef, { threshold: 0.5 });
    
    return (
        <div 
            ref={itemRef}
            className={`timeline-item mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h4 className="font-bold text-lg text-sky-700">{item.type}</h4>
            <h3 className="text-xl font-semibold text-slate-800 mt-1">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.institution} {item.institution && item.period ? '|' : ''} {item.period}</p>
            <p className="mt-2 text-slate-600">{item.description}</p>
        </div>
    );
};


const Experience = forwardRef<HTMLElement>((props, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

    return (
        <section id="experience" ref={ref} className="py-24 bg-white">
            <div 
                ref={sectionRef}
                className={`container mx-auto px-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">Experience & Education</h2>
                <div className="max-w-3xl mx-auto">
                    <div className="relative pl-8">
                        <div className="timeline-line"></div>
                        {EXPERIENCE.map((item, index) => (
                            <ExperienceItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

Experience.displayName = 'Experience';
export default Experience;
