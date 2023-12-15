import React from 'react';

const LoaderButton = () => {
  return (
    <div className="relative h-full w-full inset-0 px-4 flex justify-center items-center bg-opacity-50 z-50">
      <div className="animate-spin rounded-full border-t-4 border-Cobre border-solid h-8 w-8"></div>
    </div>
  );
};

export default LoaderButton;