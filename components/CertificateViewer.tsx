import React from 'react';
import Modal from './Modal';

interface CertificateViewerProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ isOpen, onClose, url, title }) => {
    if (!isOpen) return null;

    // This component now only displays local URLs.
    // External URLs are handled by the parent component to open in a new tab.
    const displayUrl = url;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="w-full h-[75vh]">
                <iframe
                    src={displayUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title={title}
                    allowFullScreen
                />
            </div>
        </Modal>
    );
};

export default CertificateViewer;