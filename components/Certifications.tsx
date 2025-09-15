import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { AI_CERTIFICATIONS_LIST, PROFESSIONAL_CERTIFICATIONS_LIST } from '../constants';
import { Certificate } from '../types';
import Modal from './Modal';
import CertificateViewer from './CertificateViewer';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface CertificationsProps {
    uploadedCertificates: Record<string, string>;
    onCertificateUpload: (certKey: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Certifications = forwardRef<HTMLElement, CertificationsProps>(({ uploadedCertificates, onCertificateUpload }, ref) => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isProfModalOpen, setIsProfModalOpen] = useState(false);
    const [viewingCertificate, setViewingCertificate] = useState<{ url: string; title: string } | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });
    
    const prevUploadedCertsRef = useRef(uploadedCertificates);

    useEffect(() => {
        const prevCerts = prevUploadedCertsRef.current;
        const newCertKey = Object.keys(uploadedCertificates).find(key => !prevCerts[key]);
        if (newCertKey) {
            const allCerts = [...AI_CERTIFICATIONS_LIST, ...PROFESSIONAL_CERTIFICATIONS_LIST];
            const cert = allCerts.find(c => c.link === newCertKey);
            if (cert) {
                setViewingCertificate({ url: uploadedCertificates[newCertKey], title: cert.title });
            }
        }
        prevUploadedCertsRef.current = uploadedCertificates;
    }, [uploadedCertificates]);

    const handleViewCertificate = (cert: Certificate) => {
        if (cert.link.startsWith('http')) {
            window.open(cert.link, '_blank', 'noopener,noreferrer');
        } else {
            const uploadedUrl = uploadedCertificates[cert.link];
            if (uploadedUrl) {
                setViewingCertificate({ url: uploadedUrl, title: cert.title });
            }
        }
    };

    const handleCloseViewer = () => {
        setViewingCertificate(null);
    };

    const CertificateCard: React.FC<{ cert: Certificate }> = ({ cert }) => {
        const isExternal = cert.link.startsWith('http');
        const uploadedUrl = uploadedCertificates[cert.link];
        const fileInputId = `cert-upload-${cert.link.replace(/[^a-zA-Z0-9]/g, '-')}`;

        return (
            <div className="bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="h-40 bg-gradient-to-br from-slate-400 to-slate-600 rounded-t-lg flex items-center justify-center p-4 text-center font-bold text-white">
                    {cert.title}
                </div>
                <div className="p-6">
                    <h3 className="font-semibold text-lg text-slate-800 mb-2 truncate" title={cert.title}>{cert.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">Issued by {cert.issuer}</p>
                    <p className="text-xs text-slate-400 mb-4">Date: {cert.date}</p>
                    {cert.score && <p className="text-sm text-slate-700 mb-4">Score: {cert.score}</p>}
                    {isExternal || uploadedUrl ? (
                         <button
                            onClick={() => handleViewCertificate(cert)}
                            className="text-sky-600 hover:text-sky-800 text-sm font-medium"
                        >
                            View Certificate
                        </button>
                    ) : (
                        <>
                            <label
                                htmlFor={fileInputId}
                                className="text-white bg-sky-600 hover:bg-sky-700 text-sm font-medium px-4 py-2 rounded-md cursor-pointer transition-colors"
                            >
                                Upload Certificate
                            </label>
                            <input
                                id={fileInputId}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => onCertificateUpload(cert.link, e)}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <section id="certifications" ref={ref} className="py-24 bg-slate-50">
                <div
                    ref={sectionRef}
                    className={`container mx-auto px-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">Certifications</h2>
                    <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">I'm committed to continuous learning and have completed the following online certifications through Coursera and other platforms:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        <div onClick={() => setIsProfModalOpen(true)} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                            <img src="https://placehold.co/600x400/94a3b8/white?text=Professional+Development" alt="Professional Development" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-slate-800">Professional Development Certifications</h3>
                                <p className="text-slate-600 mb-4 h-24">Click to view my certifications in soft skills, career planning, and workplace readiness.</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Coursera</span>
                                    <span className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Soft Skills</span>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => setIsAiModalOpen(true)} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                            <img src="https://placehold.co/600x400/64748b/white?text=AI+Certificates" alt="Artificial Intelligence" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-slate-800">Artificial Intelligence (AI) Certifications</h3>
                                <p className="text-slate-600 mb-4 h-24">Click to view a collection of my completed certifications in Artificial Intelligence.</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Coursera</span>
                                    <span className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded-full">AI Fundamentals</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="My AI Certifications">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {AI_CERTIFICATIONS_LIST.map((cert, index) => (
                        <CertificateCard key={index} cert={cert} />
                    ))}
                </div>
            </Modal>

            <Modal isOpen={isProfModalOpen} onClose={() => setIsProfModalOpen(false)} title="My Professional Development Certifications">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROFESSIONAL_CERTIFICATIONS_LIST.map((cert, index) => (
                        <CertificateCard key={index} cert={cert} />
                    ))}
                </div>
            </Modal>

            <CertificateViewer
                isOpen={!!viewingCertificate}
                onClose={handleCloseViewer}
                url={viewingCertificate?.url || ''}
                title={viewingCertificate?.title || 'Certificate'}
            />
        </>
    );
});

Certifications.displayName = 'Certifications';
export default Certifications;