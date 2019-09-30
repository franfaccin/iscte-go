import React from 'react';
import { css } from 'emotion';
import PokemonTile from '../PokemonTile';
import CaptureModal from '../CaptureModal/CaptureModal';
import cityBg from '../../assets/img/city-bg.png';
import { MAX_WIDTH, MAX_HEIGHT } from '../../config/config';
import { getNewPokemon } from '../../VAs/newPokemon';

const getPokeminTile = (pokemon, index, handlePokemonClick) => {
  return <PokemonTile key={pokemon.number + '-' + index} pokemon={pokemon} onClick={handlePokemonClick} />;
}

const getInitPokemons = () => {
  return new Array(5).fill('').map(getNewPokemon);
}

const City = ({onCaptured}) => {
  const [capture, setCapture] = React.useState(null);
  const [pokemonsInCity, setPokemonsInCity] = React.useState(getInitPokemons());

  const handlePokemonClick = pokemon => {
    setCapture(pokemon);
  }

  const handleCaptureEnd = captured => {
    if (captured) {
      const pokemons = [...pokemonsInCity];
      const pokemonCapturedIndex = pokemons.findIndex(p => p === capture);
      pokemons[pokemonCapturedIndex] = getNewPokemon();
      setPokemonsInCity(pokemons);
      onCaptured(capture);
    }
    setCapture(null);
  }

  return (
    <div>
      <div
        className={css`
          width: ${MAX_WIDTH}px;
          height: ${MAX_HEIGHT}px;
          background-image: url(${cityBg});
          position: relative;
        `}
      >
        {pokemonsInCity.map((p, i) => getPokeminTile(p, i, handlePokemonClick))}
      </div>
      { capture && (
        <CaptureModal
          pokemon={capture}
          onLeave={handleCaptureEnd}
        />
      )}
    </div>
  )
}

export default City;
