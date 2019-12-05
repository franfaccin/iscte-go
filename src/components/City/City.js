import React from 'react';
import { css } from 'emotion';
import PokemonTile from '../PokemonTile';
import CaptureModal from '../CaptureModal/CaptureModal';
import cityBg from '../../assets/img/city-bg.png';
import { MAX_WIDTH, MAX_HEIGHT } from '../../config/config';
import { getNewPokemon } from '../../VAs/newPokemon';

const getPokeminTile = (pokemon, index, handlePokemonClick) => {
  return <PokemonTile key={pokemon.number + '-' + index} pokemon={pokemon} onClick={handlePokemonClick} />;
};

const getInitPokemons = () => {
  return new Array(5).fill('').map(getNewPokemon);
};

const City = ({ onCaptured }) => {
  const [pokemonToCapture, setPokemonToCapture] = React.useState(null);
  const [pokemonsInCity, setPokemonsInCity] = React.useState(getInitPokemons());

  const handlePokemonClick = pokemon => {
    setPokemonToCapture(pokemon);
  };

  const handleCaptureEnd = (captured, runAway) => {
    if (captured || runAway) {
      const pokemons = [...pokemonsInCity];
      const pokemonIndex = pokemons.findIndex(p => p === pokemonToCapture);
      pokemons[pokemonIndex] = getNewPokemon();
      setPokemonsInCity(pokemons);
    }
    if (captured) {
      onCaptured(pokemonToCapture);
    }
    setPokemonToCapture(null);
  };

  return (
    <div>
      <div
        className={css`
          width: ${MAX_WIDTH}px;
          height: ${MAX_HEIGHT}px;
          background-image: url(${cityBg});
          position: relative;
          border: 5px solid #ccc;
        `}>
        {pokemonsInCity.map((p, i) => getPokeminTile(p, i, handlePokemonClick))}
      </div>
      {pokemonToCapture && <CaptureModal pokemon={pokemonToCapture} onLeave={handleCaptureEnd} />}
    </div>
  );
};

export default City;
