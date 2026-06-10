import React from 'react'

interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <div className="relative">
      <div className={`rounded-full border-4 border-gray-200 animate-spin ${className}`}></div>
      <div className={`absolute top-0 left-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin ${className}`}></div>
    </div>
  )
}