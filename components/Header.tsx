
import React from 'react';

const ArtIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-purple-light" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-brand-gray-800 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-center">
                 <ArtIcon />
                <h1 className="ml-3 text-3xl font-bold text-white tracking-tight">AI Image Weaver</h1>
            </div>
        </header>
    );
};
