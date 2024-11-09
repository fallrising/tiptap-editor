import React from 'react';
import TiptapEditor from './components/editor/TiptapEditor';
import './App.css';

const App: React.FC = () => {
  return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow mb-4">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Rich Text Editor
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4">
          <TiptapEditor />
        </main>
      </div>
  );
};

export default App;