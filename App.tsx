
import React from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { useImageGeneration } from './hooks/useImageGeneration';

const App: React.FC = () => {
  const {
    prompt,
    setPrompt,
    negativePrompt,
    setNegativePrompt,
    apiProvider,
    setApiProvider,
    stylePreset,
    setStylePreset,
    aspectRatio,
    setAspectRatio,
    seed,
    setSeed,
    numberOfImages,
    setNumberOfImages,
    imageUrls,
    isLoading,
    error,
    handleGenerate,
    lastPrompt,
    lastAspectRatio,
  } = useImageGeneration();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray-900 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-center lg:text-left text-brand-gray-100">Describe Your Vision</h2>
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              negativePrompt={negativePrompt}
              setNegativePrompt={setNegativePrompt}
              apiProvider={apiProvider}
              setApiProvider={setApiProvider}
              stylePreset={stylePreset}
              setStylePreset={setStylePreset}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              seed={seed}
              setSeed={setSeed}
              numberOfImages={numberOfImages}
              setNumberOfImages={setNumberOfImages}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
             <ImageDisplay
              imageUrls={imageUrls}
              isLoading={isLoading}
              error={error}
              prompt={lastPrompt}
              aspectRatio={lastAspectRatio}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
