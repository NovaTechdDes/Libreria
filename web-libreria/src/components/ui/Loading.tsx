import React from 'react';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full p-8 space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-12 h-12 rounded-full border-4 border-slate-100 animate-pulse"></div>
        {/* Inner Spinning Ring */}
        <div className="absolute w-12 h-12 rounded-full border-4 border-transparent border-t-[#0096B1] border-r-[#0096B1] animate-spin"></div>
        {/* Center glowing dot */}
        <div className="absolute w-3 h-3 rounded-full bg-[#0096B1] animate-ping"></div>
      </div>
      <p className="text-sm font-bold text-slate-500 tracking-wider uppercase animate-pulse">
        Cargando...
      </p>
    </div>
  );
};

