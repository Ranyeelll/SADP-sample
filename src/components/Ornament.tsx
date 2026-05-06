import React from 'react';
export function Ornament({ className = '' }: {className?: string;}) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true">
      
      <path d="M10 12 H80" strokeLinecap="round" />
      <path d="M120 12 H190" strokeLinecap="round" />
      <circle cx="100" cy="12" r="3" fill="currentColor" stroke="none" />
      <path d="M100 4 V20 M92 12 H108" strokeLinecap="round" />
      <path d="M85 12 q5 -6 10 0 q-5 6 -10 0 Z" />
      <path d="M115 12 q-5 -6 -10 0 q5 6 10 0 Z" />
    </svg>);

}
export function Flourish({ className = '' }: {className?: string;}) {
  return (
    <svg
      viewBox="0 0 120 30"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true">
      
      <path d="M5 15 C 25 5, 35 25, 55 15" strokeLinecap="round" />
      <path d="M115 15 C 95 25, 85 5, 65 15" strokeLinecap="round" />
      <circle cx="60" cy="15" r="2.5" fill="currentColor" stroke="none" />
    </svg>);

}