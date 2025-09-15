import React, { useState } from 'react';
import Modal from './Modal';
import { GoogleGenAI, Modality } from "@google/genai";

interface AiImageProps {
    isOpen: boolean;
    onClose: () => void;
    baseImage: string;
    onAccept: (newImage: string) => void;
}

// Helper to extract base64 data and mime type from data URL
const parseDataUrl = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid data URL");
    }
    return { mimeType: match[1], data: match[2] };
};

const AiImage: React.FC<AiImageProps> = ({ isOpen, onClose, baseImage, onAccept }) => {
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Please enter a prompt.');
            return;
        }
        if (!process.env.API_KEY) {
            setError('API key is not configured.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const { mimeType, data } = parseDataUrl(baseImage);

            const imagePart = {
                inlineData: {
                    mimeType,
                    data,
                },
            };

            const textPart = {
                text: prompt,
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            const imagePartResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

            if (imagePartResponse && imagePartResponse.inlineData) {
                const newImageData = imagePartResponse.inlineData.data;
                const newMimeType = imagePartResponse.inlineData.mimeType;
                setGeneratedImage(`data:${newMimeType};base64,${newImageData}`);
            } else {
                const textResponse = response.text;
                setError(textResponse || 'AI could not generate an image. Please try a different prompt.');
            }
        } catch (e) {
            console.error(e);
            setError('An error occurred while generating the image.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceptOriginal = () => {
        onAccept(baseImage);
    };

    const handleAcceptGenerated = () => {
        if (generatedImage) {
            onAccept(generatedImage);
        }
    };
    
    const handleClose = () => {
        setPrompt('');
        setGeneratedImage(null);
        setIsLoading(false);
        setError(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Edit Image with AI">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="font-semibold text-lg text-slate-700 mb-2">Original Image</h3>
                        <img src={baseImage} alt="Original profile" className="rounded-lg shadow-md w-full object-contain max-h-96" />
                    </div>
                    <div>
                        <label htmlFor="ai-prompt" className="font-semibold text-lg text-slate-700 mb-2 block">Describe your edits</label>
                        <textarea
                            id="ai-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., Change the background to a professional office setting..."
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            rows={3}
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt}
                        className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : 'Generate with AI'}
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                     <h3 className="font-semibold text-lg text-slate-700 mb-2">AI Generated Image</h3>
                    <div className="w-full aspect-square bg-slate-100 rounded-lg shadow-inner flex items-center justify-center p-4">
                       {isLoading && (
                           <div className="text-slate-500 text-center">
                               <p>AI is thinking...</p>
                               <p className="text-sm">This can take a moment.</p>
                           </div>
                       )}
                       {error && (
                           <div className="text-red-700 bg-red-100 rounded-md p-4">
                               <p className="font-bold">Error</p>
                               <p>{error}</p>
                           </div>
                       )}
                       {generatedImage && !isLoading && (
                            <img src={generatedImage} alt="AI Generated" className="rounded-lg shadow-md w-full object-contain max-h-96" />
                       )}
                       {!generatedImage && !isLoading && !error && (
                           <p className="text-slate-500">Your new image will appear here.</p>
                       )}
                    </div>
                    {generatedImage && (
                        <button
                            onClick={handleAcceptGenerated}
                            className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            Use This Image
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
                 <button
                    onClick={handleAcceptOriginal}
                    className="bg-slate-200 text-slate-800 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition-colors"
                >
                    Use Original Image
                </button>
                <button
                    onClick={handleClose}
                    className="bg-white text-slate-700 font-bold py-2 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default AiImage;