import React from 'react';

export const ToogleBottom = ({ active }: { active: boolean }) => {
  return (
    <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${active ? 'bg-teal-500' : 'bg-slate-200'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
};
