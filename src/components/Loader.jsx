import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full ">
      <div className="animate-spin rounded-full border-t-4 border-rojo-pantone border-solid h-16 w-16"></div>
    </div>
  );
};

export default Loader;
