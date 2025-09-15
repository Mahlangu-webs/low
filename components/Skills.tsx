
import React, { forwardRef, useRef } from 'react';
import { TECHNICAL_SKILLS, SOFT_SKILLS } from '../constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const SkillBar: React.FC<{ name: string; level: number }> = ({ name, level }) => {
    const barRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(barRef, { threshold: 0.8 });

    return (
        <div ref={barRef}>
            <p className="font-medium text-slate-600">{name}</p>
            <div className="bg-slate-200 rounded-full h-4 mt-2">
                <div
                    className="bg-sky-600 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? `${level}%` : '0%' }}
                ></div>
            </div>
        </div>
    );
};

const Skills = forwardRef<HTMLElement>((props, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

    return (
        <section id="skills" ref={ref} className="py-24 bg-slate-50">
            <div
                ref={sectionRef}
                className={`container mx-auto px-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">Technical & Soft Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 text-slate-700">Technical Proficiencies</h3>
                        <div className="space-y-6">
                            {TECHNICAL_SKILLS.map((skill) => (
                                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 text-slate-700">Soft Skills</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {SOFT_SKILLS.map((skill) => (
                                <div key={skill.name} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                                    <span className="text-sky-600 text-2xl mr-4">{skill.icon}</span>
                                    <span className="font-medium text-slate-700">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Skills.displayName = 'Skills';
export default Skills;
