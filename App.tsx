
import React, { useState, useCallback } from 'react';
import { PitchData } from './types';
import { generatePitch } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { PitchDisplay } from './components/PitchDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Welcome } from './components/Welcome';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [pitchData, setPitchData] = useState<PitchData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePitch = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter your startup idea.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPitchData(null);

    try {
      const data = await generatePitch(userInput);
      setPitchData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate pitch. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <InputForm
            userInput={userInput}
            setUserInput={setUserInput}
            onGenerate={handleGeneratePitch}
            isLoading={isLoading}
          />
          <div className="bg-slate-800/50 rounded-xl shadow-2xl ring-1 ring-slate-700/50 p-6 md:p-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && !pitchData && <Welcome />}
            {pitchData && <PitchDisplay data={pitchData} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
