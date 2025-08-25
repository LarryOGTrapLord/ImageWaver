
import { useState, useCallback } from 'react';
import { apiService, GenerationParams, AspectRatio } from '../services/apiService';

const getStyleModifier = (style: string): string => {
    const styleMap: { [key: string]: string } = {
        'photographic': ', photorealistic, 4k, high detail, professional photography',
        'cinematic': ', cinematic lighting, film grain, dramatic, movie still, sharp focus',
        'anime': ', anime style, manga, vibrant colors, detailed line art, by studio ghibli',
        'fantasy': ', fantasy art, epic, detailed illustration, magical, by greg rutkowski',
        '3d-render': ', 3d render, octane render, trending on artstation, hyper-realistic',
        'watercolor': ', watercolor painting, soft, blended colors, artistic, paper texture',
    };
    return styleMap[style] || '';
};


export const useImageGeneration = () => {
    const [prompt, setPrompt] = useState<string>('a stunning photo of an astronaut riding a horse on mars, cinematic lighting');
    const [negativePrompt, setNegativePrompt] = useState<string>('');
    const [apiProvider, setApiProvider] = useState<string>('gemini');
    const [stylePreset, setStylePreset] = useState<string>('none');
    const [aspectRatio, setAspectRatio] = useState<string>('1:1');
    const [seed, setSeed] = useState<string>('');
    const [numberOfImages, setNumberOfImages] = useState<number>(1);

    const [lastPrompt, setLastPrompt] = useState<string>('');
    const [lastAspectRatio, setLastAspectRatio] = useState<string>('1:1');
    const [imageUrls, setImageUrls] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!prompt || isLoading) return;

        setIsLoading(true);
        setError(null);
        setImageUrls(null);
        
        const finalPrompt = prompt + getStyleModifier(stylePreset);
        setLastPrompt(finalPrompt);
        setLastAspectRatio(aspectRatio);

        try {
            const seedValue = seed ? parseInt(seed, 10) : undefined;
            if (seedValue && isNaN(seedValue)) {
                throw new Error("Seed must be a valid number.");
            }

            const params: GenerationParams = {
                prompt: finalPrompt,
                negativePrompt: negativePrompt || undefined,
                aspectRatio: aspectRatio as AspectRatio,
                seed: seedValue,
                numberOfImages: numberOfImages,
            };
            
            const urls = await apiService.generateImages(apiProvider, params);
            setImageUrls(urls);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [prompt, negativePrompt, apiProvider, stylePreset, aspectRatio, seed, numberOfImages, isLoading]);

    return {
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
        lastAspectRatio
    };
};
