
import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9a9.75 9.75 0 001.373-3.612 9.75 9.75 0 00-1.373-3.612h9.027a9.75 9.75 0 001.373 3.612 9.75 9.75 0 00-1.373 3.612zM12 15.75v3M7.5 11.25H4.5m15 0h-3M12 21.75V18.75m0-9.75V3.75m0 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM4.5 9.75h15"
    />
  </svg>
);

export default TrophyIcon;