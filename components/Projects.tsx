import React, { forwardRef, useRef } from 'react';
import { PROJECTS } from '../constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ProjectCard: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <img src={project.imageUrl} alt={project.imageText} className="w-full h-48 object-cover flex-shrink-0" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-slate-800">{project.title}</h3>
                <p className="text-slate-600 my-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                        <span key={index} className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            index === 0 ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                            {tag}
                        </span>
                    ))}
                </div>
                 {(project.link || project.githubLink) && (
                    <div className="mt-6 flex flex-wrap gap-4">
                        {project.link && (
                             <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-sky-600 text-white font-bold py-2 px-5 rounded-full hover:bg-sky-700 transition-transform transform hover:scale-105 shadow-md"
                            >
                                Live Demo
                            </a>
                        )}
                        {project.githubLink && (
                             <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-slate-700 text-white font-bold py-2 px-5 rounded-full hover:bg-slate-800 transition-transform transform hover:scale-105 shadow-md"
                            >
                                View Code
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const Projects = forwardRef<HTMLElement>((props, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

    return (
        <section id="projects" ref={ref} className="py-24 bg-white">
            <div
                ref={sectionRef}
                className={`container mx-auto px-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">Projects</h2>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Here are some of the projects I've worked on, showcasing my ability to apply AI and development concepts to build practical applications. These are based on my training at the Tech Career Accelerator.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';
export default Projects;