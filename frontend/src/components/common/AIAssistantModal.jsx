import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>
    </div>
);

const AIAssistantModal = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal closes
            setPrompt('');
            setResponse('');
            setError(null);
            setIsLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);
        setResponse('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: 'You are EduBot, a friendly and helpful learning assistant for students on the MindMile platform. Explain concepts clearly, concisely, and in an easy-to-understand manner. Use analogies and simple examples. Format your responses with markdown for readability (e.g., use headings, lists, bold text).',
                }
            });
            setResponse(result.text);
        } catch (e) {
            console.error(e);
            setError('Sorry, something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 w-full max-w-md h-[70vh] rounded-t-2xl lg:rounded-2xl shadow-2xl m-0 lg:m-6 flex flex-col transform transition-transform animate-in slide-in-from-bottom-5"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">EduBot Assistant</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">&times;</button>
                </div>

                {/* Chat Area */}
                <div className="flex-grow p-4 overflow-y-auto">
                    { !response && !isLoading && !error && (
                            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                                <p className="font-semibold">Welcome to your AI Learning Assistant!</p>
                                <p className="text-sm mt-2">Ask me to explain a concept, summarize an article, or help you with a problem.</p>
                            </div>
                    )}
                    {isLoading && (
                        <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0"></div>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3"><LoadingSpinner /></div>
                        </div>
                    )}
                    {error && <p className="text-red-600 font-medium">{error}</p>}
                    {response && (
                            <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }} />
                    )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                            placeholder="e.g., Explain recursion..."
                            className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-full focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                            disabled={isLoading}
                        />
                        <button onClick={handleGenerate} disabled={isLoading} className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white bg-purple-600 rounded-full transform scale-90 hover:bg-purple-700 disabled:bg-gray-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantModal;