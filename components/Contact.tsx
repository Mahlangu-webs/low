import React, { forwardRef, useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Contact = forwardRef<HTMLElement>((props, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validate = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
            isValid = false;
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required.';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setStatus('loading');
        // Simulate an API call. In a real application, you would send this
        // data to a backend endpoint or a serverless function.
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000); // Reset form status after 4 seconds
        }, 1500);
    };

    return (
        <section id="contact" ref={ref} className="py-24 bg-slate-50">
            <div
                ref={sectionRef}
                className={`container mx-auto px-6 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-slate-800">Get In Touch</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    I'm currently seeking new opportunities and would love to hear from you. Whether you have a question or just want to connect, feel free to reach out using the form below.
                </p>
                <div className="mt-10 max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative">
                                <label htmlFor="name" className="absolute -top-2 left-2 inline-block bg-slate-50 px-1 text-sm font-medium text-slate-600">Name</label>
                                <input type="text" id="name" value={formData.name} onChange={handleChange} className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" required />
                                {errors.name && <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>}
                            </div>
                             <div className="relative">
                                <label htmlFor="email" className="absolute -top-2 left-2 inline-block bg-slate-50 px-1 text-sm font-medium text-slate-600">Email</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" required />
                                {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="relative">
                            <label htmlFor="message" className="absolute -top-2 left-2 inline-block bg-slate-50 px-1 text-sm font-medium text-slate-600">Message</label>
                            <textarea id="message" value={formData.message} onChange={handleChange} rows={5} className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" required></textarea>
                            {errors.message && <p className="text-red-500 text-xs mt-1 text-left">{errors.message}</p>}
                        </div>

                        <div>
                            {status === 'success' ? (
                                <p className="text-emerald-600 bg-emerald-100 p-3 rounded-md text-center">Thank you! Your message has been sent.</p>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center mx-auto"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 text-slate-600">
                    <p className="mb-2">Alternatively, you can reach me directly at:</p>
                    <a href="mailto:mahlangusiyabonga30@gmail.com" className="text-xl font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                        mahlangusiyabonga30@gmail.com
                    </a>
                    <div className="mt-2 text-base">
                        <p>Pretoria, Gauteng</p>
                        <p>084 891 5192</p>
                    </div>
                </div>
            </div>
        </section>
    );
});

Contact.displayName = 'Contact';
export default Contact;