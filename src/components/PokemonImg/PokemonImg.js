import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import { Pokemon } from '../../model/Pokemon.js';

const getPokemonSprite = (name, isShiny) => {
  const type = isShiny ? 'shiny' : 'normal';
  return `https://img.pokemondb.net/sprites/black-white/anim/${type}/${name}.gif`;
};

const PokemonImg = ({ pokemon, className }) => {
  const { isShiny, key } = pokemon;
  const [pokeKey] = React.useState(key);

  return (
    <img
      className={cx(
        css`
          width: 100%;
          height: 100%;
        `,
        className
      )}
      src={getPokemonSprite(pokeKey, isShiny)}
      alt={`pokemon ${pokeKey} mini`}
    />
  );
};

PokemonImg.protoTypes = {
  pokemon: PropTypes.shape(Pokemon).isRequired,
};

export default PokemonImg;
