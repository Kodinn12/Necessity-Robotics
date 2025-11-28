import React from "react";
import "./ShinyText.css";

/**
 * ShinyText - Animated shiny text effect for React
 * @param {object} props
 * @param {string} props.children - The text to animate
 * @param {string} [props.className] - Optional additional className
 * @param {object} [props.style] - Optional style
 */
const ShinyText = ({ children, className = "", style = {} }) => {
  return (
    <span className={`shiny-text ${className}`} style={style}>
      <span className="shiny-text-inner">{children}</span>
      <span className="shiny-text-shine" />
    </span>
  );
};

export default ShinyText;
