
import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => (
  <header className="py-6 px-4 md:px-8">
    <div className="container mx-auto flex items-center justify-center gap-4">
      <LogoIcon />
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        AI Business Pitch Generator
      </h1>
    </div>
  </header>
);
