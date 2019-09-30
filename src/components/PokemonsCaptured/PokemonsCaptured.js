import React from 'react';
import PokemonImg from '../PokemonImg';
import { css } from 'emotion';
import { MAX_HEIGHT } from '../../config/config';

const PokemonsCaptured = ({pokemons}) => {

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow: auto;
        height: ${MAX_HEIGHT}px;
        min-width: 50px;
        ${pokemons.length > 0 && css`background-color: #fff;`}
      `}
    >
      {pokemons.map((p, i) => (
        <div key={p.number + '-' + i}
          className={css`
            max-height: 50px;
            max-width: 50px;
          `}
        >
          <PokemonImg pokemon={p} />
        </div>
      ))}
    </div>
  )
}

export default PokemonsCaptured;
