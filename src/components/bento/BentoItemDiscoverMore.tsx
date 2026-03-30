import React from 'react';

export default function BentoItemDiscoverMore() {
  return (
    <a href="#projects" className="flex h-full items-center justify-between group cursor-pointer">
      <div className="relative">
        <span className="text-white">Discover more projects</span>
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1EF4AE] transition-all duration-300 group-hover:w-full" />
      </div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="size-6 transition-transform duration-300 group-hover:rotate-90" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
} 