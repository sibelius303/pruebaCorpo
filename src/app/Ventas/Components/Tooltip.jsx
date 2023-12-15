'use client'
import React, { useState } from 'react';

const Tooltip = ({ text, children, carrito }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
      setShowTooltip(true);
 
  };

  const handleMouseLeave = () => {
      setShowTooltip(false);

  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 p-2 text-negro bg-BlancoIvory rounded-md">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
