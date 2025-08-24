
import React from 'react';
import { RocketIcon } from './icons';

export const Welcome: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 animate-fade-in">
    <div className="text-purple-500 mb-4">
      <RocketIcon />
    </div>
    <h3 className="text-2xl font-bold text-slate-100">Your Pitch Awaits</h3>
    <p className="mt-2 max-w-md">
      Enter your startup idea on the left, and our AI will generate a complete pitch structure to kickstart your journey.
    </p>
  </div>
);
