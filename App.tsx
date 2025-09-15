import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { profileImageBase64 } from './profileImageData';

const App: React.FC = () => {
    const homeRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const skillsRef = useRef<HTMLElement>(null);
    const experienceRef = useRef<HTMLElement>(null);
    const certificationsRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const [profileImage, setProfileImage] = useState<string>(profileImageBase64);
    const [uploadedCertificates, setUploadedCertificates] = useState<Record<string, string>>({});

    useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
        const savedCerts = localStorage.getItem('uploadedCertificates');
        if (savedCerts) {
            try {
                setUploadedCertificates(JSON.parse(savedCerts));
            } catch (e) {
                console.error("Failed to parse uploaded certificates from localStorage", e);
            }
        }
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfileImage(base64String);
                localStorage.setItem('profileImage', base64String);
            };
            reader.readAsDataURL(file);
        }
        if (event.target) {
            event.target.value = '';
        }
    };
    
    const handleCertificateUpload = (certKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const newCerts = { ...uploadedCertificates, [certKey]: base64String };
                setUploadedCertificates(newCerts);
                localStorage.setItem('uploadedCertificates', JSON.stringify(newCerts));
            };
            reader.readAsDataURL(file);
        }
        if (event.target) {
            event.target.value = '';
        }
    };

    const sectionRefs = {
        home: homeRef,
        about: aboutRef,
        skills: skillsRef,
        experience: experienceRef,
        certifications: certificationsRef,
        projects: projectsRef,
        contact: contactRef,
    };

    return (
        <>
            <Header sectionRefs={sectionRefs} />
            <main>
                <Home ref={homeRef} profileImage={profileImage} onImageUpload={handleImageUpload} />
                <About ref={aboutRef} profileImage={profileImage} />
                <Skills ref={skillsRef} />
                <Experience ref={experienceRef} />
                <Certifications 
                    ref={certificationsRef}
                    uploadedCertificates={uploadedCertificates}
                    onCertificateUpload={handleCertificateUpload}
                />
                <Projects ref={projectsRef} />
                <Contact ref={contactRef} />
            </main>
            <Footer />
        </>
    );
};

export default App;