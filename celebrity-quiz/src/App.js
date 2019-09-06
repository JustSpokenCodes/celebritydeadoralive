import React from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Celebrity Dead or Alive!?</h2>
      </header>
      <Question content="Is this person Alive or Dead?" />
    </div>
  );
}

export default App;
