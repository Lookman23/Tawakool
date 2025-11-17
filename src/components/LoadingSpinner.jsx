import React from 'react';

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex justify-center items-center h-screen bg-background/80 backdrop-blur-sm z-50" aria-label="Chargement en cours">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default LoadingSpinner;