
import React from 'react';

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"] as const;
type AspectRatio = typeof aspectRatios[number];

const stylePresets = [
    { id: 'none', name: 'None (Default)' },
    { id: 'photographic', name: 'Photographic' },
    { id: 'cinematic', name: 'Cinematic' },
    { id: 'anime', name: 'Anime / Manga' },
    { id: 'fantasy', name: 'Fantasy Art' },
    { id: '3d-render', name: '3D Render' },
    { id: 'watercolor', name: 'Watercolor' },
];

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  negativePrompt: string;
  setNegativePrompt: (prompt: string) => void;
  apiProvider: string;
  setApiProvider: (provider: string) => void;
  stylePreset: string;
  setStylePreset: (style: string) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: AspectRatio) => void;
  seed: string;
  setSeed: (seed: string) => void;
  numberOfImages: number;
  setNumberOfImages: (num: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const RandomizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm12 14a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 01-1 1z" clipRule="evenodd" />
    </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({ 
    prompt, setPrompt, 
    negativePrompt, setNegativePrompt,
    apiProvider, setApiProvider,
    stylePreset, setStylePreset,
    aspectRatio, setAspectRatio,
    seed, setSeed,
    numberOfImages, setNumberOfImages,
    onSubmit, isLoading 
}) => {
    
    const handleRandomizeSeed = () => {
        const randomSeed = Math.floor(Math.random() * 2147483647);
        setSeed(String(randomSeed));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-brand-gray-300 mb-2">Prompt</label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., a photo of an astronaut riding a horse on mars"
                    className="w-full h-32 p-4 bg-brand-gray-800 border-2 border-brand-gray-700 rounded-lg text-brand-gray-100 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition duration-200 resize-y"
                    disabled={isLoading}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="api-provider" className="block text-sm font-medium text-brand-gray-300 mb-2">API Provider</label>
                    <select
                        id="api-provider"
                        value={apiProvider}
                        onChange={(e) => setApiProvider(e.target.value)}
                        disabled={isLoading}
                        className="w-full p-2 bg-brand-gray-800 border-2 border-brand-gray-700 rounded-lg text-brand-gray-100 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition duration-200"
                    >
                        <option value="gemini">Google Gemini</option>
                        <option value="stability" disabled>Stability AI (Coming Soon)</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="style-preset" className="block text-sm font-medium text-brand-gray-300 mb-2">Style</label>
                    <select
                        id="style-preset"
                        value={stylePreset}
                        onChange={(e) => setStylePreset(e.target.value)}
                        disabled={isLoading}
                        className="w-full p-2 bg-brand-gray-800 border-2 border-brand-gray-700 rounded-lg text-brand-gray-100 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition duration-200"
                    >
                        {stylePresets.map(preset => (
                            <option key={preset.id} value={preset.id}>{preset.name}</option>
                        ))}
                    </select>
                </div>
            </div>

             <div>
                <label htmlFor="negative-prompt" className="block text-sm font-medium text-brand-gray-300 mb-2">Negative Prompt</label>
                <input
                    id="negative-prompt"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="e.g., blurry, cartoon, text"
                    className="w-full p-2 bg-brand-gray-800 border-2 border-brand-gray-700 rounded-lg text-brand-gray-100 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition duration-200"
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-brand-gray-300">Aspect Ratio</label>
                <div className="grid grid-cols-5 gap-2">
                    {aspectRatios.map(ratio => (
                        <button
                            type="button"
                            key={ratio}
                            onClick={() => setAspectRatio(ratio)}
                            disabled={isLoading}
                            className={`py-2 px-1 text-sm font-semibold rounded-md transition duration-200 disabled:cursor-not-allowed ${
                                aspectRatio === ratio
                                    ? 'bg-brand-purple text-white shadow-lg'
                                    : 'bg-brand-gray-700 text-brand-gray-300 hover:bg-brand-gray-600'
                            }`}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="seed" className="block text-sm font-medium text-brand-gray-300">Seed</label>
                <div className="flex items-center gap-2">
                    <input
                        id="seed"
                        type="number"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="Random"
                        className="w-full p-2 bg-brand-gray-800 border-2 border-brand-gray-700 rounded-lg text-brand-gray-100 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition duration-200"
                        disabled={isLoading}
                    />
                    <button 
                      type="button" 
                      onClick={handleRandomizeSeed} 
                      disabled={isLoading}
                      className="p-2 bg-brand-gray-700 hover:bg-brand-gray-600 rounded-lg text-brand-gray-300 transition duration-200 disabled:cursor-not-allowed disabled:bg-brand-gray-800"
                      aria-label="Randomize seed"
                    >
                        <RandomizeIcon />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="numberOfImages" className="block text-sm font-medium text-brand-gray-300">
                    Number of Images: <span className="font-bold text-brand-purple-light">{numberOfImages}</span>
                </label>
                <input
                    id="numberOfImages"
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={numberOfImages}
                    onChange={(e) => setNumberOfImages(Number(e.target.value))}
                    disabled={isLoading}
                    className="w-full h-2 bg-brand-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
            </div>
            
            <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full flex items-center justify-center py-3 px-6 bg-brand-purple hover:bg-brand-purple-light disabled:bg-brand-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 shadow-md transform hover:scale-105 disabled:scale-100"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Weaving Magic...
                    </>
                ) : (
                    'Generate Image'
                )}
            </button>
        </form>
    );
};
