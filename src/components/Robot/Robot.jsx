import React from 'react';
import './Robot.css';

const Robot = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  return (
    <div className={`robot-container ${sizeClasses[size]} ${className}`}>
      {/* Robot Head */}
      <div className="robot-head">
        {/* Eyes */}
        <div className="robot-eye left-eye"></div>
        <div className="robot-eye right-eye"></div>
        {/* Antenna */}
        <div className="robot-antenna"></div>
      </div>
      {/* Robot Body */}
      <div className="robot-body">
        <div className="robot-panel"></div>
      </div>
      {/* Robot Arms */}
      <div className="robot-arm left-arm"></div>
      <div className="robot-arm right-arm"></div>
    </div>
  );
};

export default Robot;
