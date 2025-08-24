
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in" role="alert">
    <div className="bg-red-900/50 border border-red-700 text-red-300 px-6 py-4 rounded-lg">
      <strong className="font-bold">Oops! Something went wrong.</strong>
      <p className="block sm:inline mt-2">{message}</p>
    </div>
  </div>
);
