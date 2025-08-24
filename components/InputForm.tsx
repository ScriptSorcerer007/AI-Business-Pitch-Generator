
import React from 'react';
import { GenerateIcon } from './icons';

interface InputFormProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ userInput, setUserInput, onGenerate, isLoading }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-2xl p-6 md:p-8 flex flex-col ring-1 ring-slate-700/50">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">Your Startup Idea</h2>
      <p className="text-slate-400 mb-6">
        Provide a few bullet points about your idea. The more detail you give, the better the pitch will be.
      </p>
      <textarea
        className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow duration-300 resize-none"
        placeholder="- A mobile app that connects local gardeners...
- Uses geolocation to find nearby users...
- Includes a marketplace for trading plants and produce..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-6 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <GenerateIcon />
            Generate Pitch
          </>
        )}
      </button>
    </div>
  );
};
