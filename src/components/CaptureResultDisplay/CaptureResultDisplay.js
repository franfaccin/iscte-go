import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { Pokemon } from '../../model/Pokemon';

const CaptureResultDisplay = ({ captured, pokemon, FAIL_MESSAGE_DURATION }) => {
  const { name } = pokemon;
  return (
    <p
      className={css`
        max-width: 70%;
        padding: 5px 10px;
        font-size: 1.75rem;
        color: #fff;
        position: absolute;
        top: 25%;
        text-align: center;
        border-radius: 10px;
        background-color: rgba(1, 1, 1, 0.5);
        box-shadow: 0px 0px 40px 3px rgba(0, 0, 0, 0.6);
        z-index: 1;
        ${!captured &&
          css`
            animation: fadeAway ${FAIL_MESSAGE_DURATION}s 1 ease-out normal forwards;
          `}

        @keyframes fadeAway {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}>
      {captured ? (
        <>
          Congratulations! <br /> {name} was caught!{' '}
        </>
      ) : (
        `${name} escaped the pokeball!`
      )}
    </p>
  );
};

CaptureResultDisplay.propTypes = {
  captured: PropTypes.bool.isRequired,
  pokemon: PropTypes.shape(Pokemon).isRequired,
  FAIL_MESSAGE_DURATION: PropTypes.number.isRequired,
};

export default CaptureResultDisplay;
