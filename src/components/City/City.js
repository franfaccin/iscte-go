import React, { useState, useEffect, useCallback } from 'react';
import { css } from 'emotion';
import PokemonTile from '../PokemonTile';
import CaptureModal from '../CaptureModal/CaptureModal';
import cityBg from '../../assets/img/city-bg.png';
import { MAX_WIDTH, MAX_HEIGHT } from '../../config/config';
import { getNewPokemon } from '../../VAs/newPokemon';
import { getTimeNextPokemon } from '../../VAs/continua-03-new-pokemon-by-time';

const getPokeminTile = (pokemon, index, handlePokemonClick) => {
  return <PokemonTile key={pokemon.number + '-' + index} pokemon={pokemon} onClick={handlePokemonClick} />;
};

const getInitPokemons = () => {
  return new Array(10).fill('').map(getNewPokemon);
};

const City = ({ onCaptured }) => {
  const [pokemonToCapture, setPokemonToCapture] = useState(null);
  const [pokemonsInCity, setPokemonsInCity] = useState(getInitPokemons());
  const [timeToNextPokemon, setTimeToNextPokemon] = useState(getTimeNextPokemon());
  const [startNewPokemonTimeout, setStartNewPokemonTimeout] = useState(true);

  const handlePokemonClick = pokemon => {
    setPokemonToCapture(pokemon);
  };

  const newPokemonInTown = useCallback(() => {
    const newPokemon = getNewPokemon();
    setPokemonsInCity(currentPokemonsInCity => [...currentPokemonsInCity, newPokemon]);
  }, []);

  const newPokemonTimeout = useCallback(() => {
    setTimeToNextPokemon(getTimeNextPokemon());
    newPokemonInTown();
    setStartNewPokemonTimeout(true);
  }, [newPokemonInTown]);

  useEffect(() => {
    if (startNewPokemonTimeout) {
      const time = getTimeNextPokemon();
      setTimeToNextPokemon(time);
      setStartNewPokemonTimeout(false);
      setTimeout(newPokemonTimeout, time * 1000);
    }
  }, [startNewPokemonTimeout, timeToNextPokemon, newPokemonTimeout]);

  const handleCaptureEnd = useCallback(
    (captured, runAway) => {
      if (captured || runAway) {
        setPokemonsInCity(pokemonsInCity.filter(p => !p.equals(pokemonToCapture)));
      }
      if (captured) {
        onCaptured(pokemonToCapture);
      }
      setPokemonToCapture(null);
    },
    [onCaptured, pokemonsInCity, pokemonToCapture]
  );

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
