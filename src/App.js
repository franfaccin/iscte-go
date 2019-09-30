import React from 'react';
import { css } from 'emotion';
import City from './components/City';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PokemonsCaptured from './components/PokemonsCaptured/PokemonsCaptured';

function App() {
  const [pokemons, setPokemons] = React.useState([]);
  return (
    <div className={css`
      display: block;
      width: 100vw;
      height: 100vh;
      display: flex;
      background: #000;
      justify-content: center;
      align-items: center;
    `}>
      <City onCaptured={p => setPokemons([...pokemons, p])} />
      <PokemonsCaptured pokemons={pokemons} />
    </div>
  );
}

export default App;
