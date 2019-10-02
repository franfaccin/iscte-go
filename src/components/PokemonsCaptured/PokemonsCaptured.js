import React from 'react';
import PokemonImg from '../PokemonImg';
import { css } from 'emotion';
import { MAX_HEIGHT } from '../../config/config';
import pokeBg from '../../assets/img/pokeballgrid_bg_overlay.png';

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
        background-image: url(${pokeBg});
        ${pokemons.length > 0 && css`background-color: #fff;`}
      `}
    >
      {pokemons.map((p, i) => (
        <div key={p.number + '-' + i}
          className={css`
            max-height: 50px;
            max-width: 50px;
            height: 50px;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;`}
        >
          <div
            className={css`
              max-height: 50px;
              max-width: 50px;
            `}
          >
            <PokemonImg pokemon={p} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PokemonsCaptured;
