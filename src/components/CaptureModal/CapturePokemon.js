import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import PokemonImg from '../PokemonImg';
import shinyBackground from '../../assets/img/sparkle.gif';
import { Pokemon } from '../../model/Pokemon';

export const CapturePokemon = ({ pokemon, showCapturing, captured, runAway }) => {
  const { height } = pokemon;
  const maxHeight = Math.min(height * 1.2, 250);
  const imgHeight = Math.max(maxHeight, 80);
  return (
    <div
      className={css`
        max-width: 75%;
        max-height: 75%;
        padding: 30px;
        ${pokemon.isShiny &&
          css`
            background: url(${shinyBackground}) no-repeat center center;
            background-size: cover;
          `}
        ${showCapturing &&
          css`
            animation: capture 0.5s 1 ease-out normal forwards;
          `}
        ${captured === false &&
          css`
            animation: release 0.5s ease-in normal forwards;
          `}
        ${runAway &&
          !showCapturing &&
          css`
            animation: runAway 0.2s 1 ease-out normal forwards;
          `}
        @keyframes capture {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(.2); opacity: 0; }
        }
        @keyframes release {
          0% { transform: scale(.2); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes runAway {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-200%, 0); }
        }
    `}>
      <PokemonImg
        className={css`
          height: ${imgHeight}px;
        `}
        pokemon={pokemon}
      />
    </div>
  );
};

CapturePokemon.protoTypes = {
  pokemon: PropTypes.shape(Pokemon).isRequired,
  showCapturing: PropTypes.bool,
  captured: PropTypes.bool,
  runAway: PropTypes.bool,
};
