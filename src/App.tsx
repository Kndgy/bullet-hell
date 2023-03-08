import React from 'react';
import reactLogo from './assets/react.svg'
import './App.css'
import { PlayerCharacter } from './player';


function App() {
  return (
    <div className="App">
      <PlayerCharacter cellSize={20} />
    </div>
  );
}


export default App
