import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import poke from '../../assets/img/pokeball.png';
import great from '../../assets/img/pokeball-great.png';
import ultra from '../../assets/img/pokeball-ultra.png';
import master from '../../assets/img/pokeball-master.png';
import { THROW_BALL_DURATION, FAIL_MESSAGE_DURATION, POKEBALL_TYPE } from '../../config/config';

const getPokeballImg = type => {
  switch (type) {
    case POKEBALL_TYPE.MASTER:
      return master;
    case POKEBALL_TYPE.ULTRA:
      return ultra;
    case POKEBALL_TYPE.GREAT:
      return great;
    case POKEBALL_TYPE.POKE:
    default:
      return poke;
  }
};

const CapturePokeball = ({ throwBall, captured, onThrowBall, showCapturing, type }) => {
  const pokeball = getPokeballImg(type);

  return (
    <div
      className={css`
        position: absolute;
        bottom: -25%;
        width: 300px;
        height: 300px;

        ${!throwBall &&
          !captured &&
          css`
            cursor: pointer;
            animation: bounce 0.5s infinite alternate;
          `}

        ${throwBall &&
          !showCapturing &&
          css`
            animation: throw ${THROW_BALL_DURATION}s 1 ease-out normal forwards;
          `}

        ${captured === false &&
          css`
            animation: throw ${FAIL_MESSAGE_DURATION}s 1 ease-out reverse;
          `}

        ${throwBall &&
          showCapturing &&
          css`
            animation: shake 1s ease-in-out infinite alternate;
          `}

        ${captured &&
          css`
            transform: translate(0, -80%) scale(0.5);
          `}

        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }
        @keyframes throw {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          70% { transform: translateY(-120%) scale(0.75) rotate(500deg); }
          100% { transform: translateY(-80%) scale(0.5) rotate(720deg); }
        }
        @keyframes shake {
          0% { transform: translate(0, -80%) rotate(0) scale(0.5); }
          30% { transform: translate(30px, -80%) rotate(20deg) scale(0.5); }
          60% { transform: translate(-30px, -80%) rotate(-20deg) scale(0.5); }
          100% { transform: translate(0, -80%) rotate(0) scale(0.5); }
        }
      `}
      onClick={onThrowBall}>
      <img
        className={css`
          width: 100%;
          height: 100%;
        `}
        src={pokeball}
        alt="pokeball"
      />
    </div>
  );
};

CapturePokeball.prototype = {
  throwBall: PropTypes.bool,
  captured: PropTypes.captured,
  onThrowBall: PropTypes.func.isRequired,
};

CapturePokeball.defaultTypes = {
  throwBall: false,
  captured: null,
};

export default CapturePokeball;
