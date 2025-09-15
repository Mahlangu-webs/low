
import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4 transition-opacity duration-300 animate-[fade-in_0.3s_ease-out]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-[slide-up_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-lg z-10">
                    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-800 text-3xl leading-none"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </header>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>,
        document.body
    );
};

export default Modal;
