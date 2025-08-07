
import React from 'react';



const LoadingSpinner = () => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                    Searching...
                </h2>
                <div className="flex justify-center items-center py-6 md:py-8">
                    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-500"></div>
                    <p className="ml-4 text-sm md:text-base text-gray-600">Searching for Pokémon...</p>
                </div>
            </div>

        </>
    );
};

export default LoadingSpinner;