import React from 'react';
import { css } from 'emotion';
import City from './components/City';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PokemonsCaptured from './components/PokemonsCaptured/PokemonsCaptured';
import logo from './assets/img/iscte-go_logo.png';

function App() {
  const [pokemons, setPokemons] = React.useState([]);
  return (
    <div
      className={css`
        display: block;
        min-width: 100vw;
        min-height: 100vh;
        overflow: auto;
        background: #000;
      `}>
      <div
        className={css`
          width: 100%;
          > img {
            margin: auto;
            display: block;
          }
        `}>
        <img src={logo} alt="logo" />
      </div>
      <div
        className={css`
          display: flex;
          justify-content: center;
          width: 100%;
          min-width: 850px;
        `}>
        <City onCaptured={p => setPokemons([...pokemons, p])} />
        <PokemonsCaptured pokemons={pokemons} />
      </div>
    </div>
  );
}

export default App;
