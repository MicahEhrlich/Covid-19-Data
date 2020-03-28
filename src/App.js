import React from 'react';
import './App.css';
import Home from '../src/components/pages/Home';
import Navbar from '../src/components/layout/Navbar';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Navbar />
      </header>
      <Home />
    </div>
  );
}

export default App;
