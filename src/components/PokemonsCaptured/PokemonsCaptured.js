import React from 'react';
import PokemonImg from '../PokemonImg';
import { css } from 'emotion';
import { MAX_HEIGHT } from '../../config/config';
import pokeBg from '../../assets/img/pokeballgrid_bg_overlay.png';

const PokemonsCaptured = ({ pokemons }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow: auto;
        height: ${MAX_HEIGHT}px;
        min-width: 60px;
        padding: 0 5px;
        background-image: url(${pokeBg});
        ${pokemons.length > 0 &&
          css`
            background-color: #fff;
          `}
      `}>
      {pokemons.map((p, i) => (
        <PokemonImg
          key={p.number + '-' + i}
          pokemon={p}
          className={css`
            max-height: 50px;
            max-width: 50px;
            padding: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        />
      ))}
    </div>
  );
};

export default PokemonsCaptured;
