
import React from 'react';

interface ImageDisplayProps {
  imageUrls: string[] | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
  aspectRatio: string;
}

const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-brand-gray-400 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold">Your generated image will appear here</h3>
        <p className="mt-2">Enter a prompt and click "Generate Image" to start.</p>
    </div>
);

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-purple-light"></div>
        <p className="mt-4 text-brand-gray-300">Generating your vision...</p>
    </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-8">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold">Oops! Something went wrong.</h3>
        <p className="mt-2 text-sm bg-brand-gray-800 p-2 rounded">{message}</p>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrls, isLoading, error, prompt, aspectRatio }) => {
  const getAspectRatioClass = (ratio: string) => {
    switch(ratio) {
        case '16:9': return 'aspect-[16/9]';
        case '9:16': return 'aspect-[9/16]';
        case '4:3': return 'aspect-[4/3]';
        case '3:4': return 'aspect-[3/4]';
        case '1:1':
        default:
            return 'aspect-square';
    }
  }

  const getGridClass = (count: number) => {
    if (count <= 1) return '';
    // This 2x2 grid handles 2, 3, or 4 images gracefully.
    return 'grid grid-cols-2 grid-rows-2';
  }

  const gridClass = imageUrls ? getGridClass(imageUrls.length) : '';

  return (
    <div className={`w-full ${getAspectRatioClass(aspectRatio)} bg-brand-gray-800 border-2 border-brand-gray-700 rounded-lg flex items-center justify-center overflow-hidden shadow-xl transition-all duration-300`}>
      {isLoading && <LoadingSpinner />}
      {error && !isLoading && <ErrorDisplay message={error} />}
      {imageUrls && !isLoading && !error && (
        <div className={`w-full h-full ${gridClass} gap-1`}>
            {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${prompt} (${index + 1} of ${imageUrls.length})`}
                  className="w-full h-full object-cover"
                />
            ))}
        </div>
      )}
      {!imageUrls && !isLoading && !error && <Placeholder />}
    </div>
  );
};
