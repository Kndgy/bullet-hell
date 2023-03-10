import React from 'react';
import reactLogo from './assets/react.svg'
import './App.css'
import { PlayerCharacter } from './player';
import { Enemy } from './enemy';


function App() {
  return (
    <div className="App">
      <PlayerCharacter cellSize={20} />
      <Enemy cellSize={20} speed={10}/>
    </div>
  );
}


export default App
