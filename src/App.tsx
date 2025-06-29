import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './components/LandingPage';
import { IdeaForm } from './components/IdeaForm';
import { SlidesViewer } from './components/SlidesViewer';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<IdeaForm />} />
            <Route path="/slides" element={<SlidesViewer />} />
          </Routes>
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'dark:bg-gray-800 dark:text-white',
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;