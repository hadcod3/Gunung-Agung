import React from "react";

interface DirectDownIconProps {
  size?: number; 
  fill?: string; 
  stroke?: string; 
}

const DirectDownIcon = ({
  size, 
  fill, 
  stroke, 
} : DirectDownIconProps) => (
  <svg
    width={80}
    height={80}
    viewBox={`0 0 10 10`}
    fill={!fill ? 'none' : fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.17005 19.2899L3.07005 7.6999C1.62005 4.9499 4.55005 1.9599 7.33005 3.3499L10.57 4.9699C11.47 5.4199 12.53 5.4199 13.43 4.9699L16.67 3.3499C19.45 1.9599 22.37 4.9499 20.93 7.6999L14.83 19.2899C13.63 21.5699 10.37 21.5699 9.17005 19.2899Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DirectDownIcon;
