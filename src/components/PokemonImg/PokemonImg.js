import React from 'react';
import PropTypes from 'prop-types';
import { Pokemon } from '../../model/Pokemon.js';

const getPokemonSprite = (name, isShiny) => {
  const type = isShiny ? 'shiny' : 'normal';
  return `https://img.pokemondb.net/sprites/black-white/anim/${type}/${name}.gif`;
};

const PokemonImg = ({ pokemon, className }) => {
  const { isShiny, key } = pokemon;
  const [pokeKey] = React.useState(key);

  return (
    <img className={className} src={getPokemonSprite(pokeKey, isShiny)} alt={`pokemon ${pokeKey} mini`} />
  );
};

PokemonImg.protoTypes = {
  pokemon: PropTypes.shape(Pokemon).isRequired,
};

export default PokemonImg;
