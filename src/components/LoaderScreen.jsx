import React from 'react';

const LoaderScreen = () => {
  return (
    <div className="relative h-full w-full inset-0 flex justify-center items-center bg-white z-50">
      <div className="animate-spin rounded-full border-t-4 border-rojo-pantone border-solid h-16 w-16"></div>
    </div>
  );
};

export default LoaderScreen;