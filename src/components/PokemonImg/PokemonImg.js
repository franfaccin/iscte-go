import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { pokemonList } from '../../config/pokemon-list.json';
import { Pokemon } from '../../model/Pokemon.js';

const getPokemonName = num => pokemonList[num];

const getPokemonSprite = (name, isShiny) => {
  const type = isShiny ? 'shiny' : 'normal';
  return `https://img.pokemondb.net/sprites/black-white/anim/${type}/${name}.gif`;
}

const PokemonImg = ({pokemon}) => {
  const { number, isShiny } = pokemon;
  const [name] = React.useState(getPokemonName(number));

  return (
    <img 
      className={css`
        width: 100%;
        height: 100%;
      `}
      src={getPokemonSprite(name, isShiny)}
      alt={`pokemon ${name} mini`}
    />
  )
}

PokemonImg.protoTypes = {
  pokemon: PropTypes.shape(Pokemon).isRequired
}

export default PokemonImg;
