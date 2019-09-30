import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import PokemonImg from '../PokemonImg';
import { Pokemon } from '../../model/Pokemon';
import { MAX_HEIGHT, MAX_WIDTH } from '../../config/config';


const PokemonTile = ({pokemon, onClick}) => {
  const {
    x,
    y,
  } = pokemon;

  return (
    <div
      className={css`
        max-width: 50px;
        max-height: 50px;
        position: absolute;
        top: ${Math.abs((y - 50) % MAX_HEIGHT)}px;
        left: ${Math.abs((x - 50) % MAX_WIDTH)}px;
        cursor: pointer;
      `}
      onClick={e => onClick(pokemon)}
    >
      <PokemonImg pokemon={pokemon} />
  </div>
  )
}

PokemonTile.prototype = {
  pokemon: PropTypes.shape(Pokemon).isRequired,
  onClick: PropTypes.func.isRequired
}

export default PokemonTile;
