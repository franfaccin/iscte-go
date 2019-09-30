import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Modal from 'react-bootstrap/Modal';
import { getCaptureResult } from '../../VAs/captureProbability';
import CaptureResultDisplay from '../CaptureResultDisplay';
import PokemonImg from '../PokemonImg';
import { Pokemon } from '../../model/Pokemon';
import captureBg from '../../assets/img/capture-bg.png';
import pokeball from '../../assets/img/pokeball.png';
import pokeballSpining from '../../assets/img/pokeball-spining.gif';
import shinyBackground from '../../assets/img/sparkle.gif';

const THROW_BALL_DURATION = 1; // seconds
const CAPTURE_WAIT_TIME = 2;   // seconds
const FAIL_MESSAGE_DURATION = 3; // seconds

const CaptureModal = ({pokemon, onLeave}) => {
  const [show, setShow] = React.useState(true);
  const [throwBall, setThrowBall] = React.useState(false);
  const [showCapturing, setShowCapturing] = React.useState(false);
  const [captured, setCaptured] = React.useState(null);

  React.useEffect(() => {
    if (throwBall) {
      const captureTimeout = setTimeout(() => {
        setShowCapturing(true);
      }, THROW_BALL_DURATION * 1000);
      return () => {
        clearTimeout(captureTimeout);
      };
    }
  }, [throwBall]);

  React.useEffect(() => {
    if (showCapturing) {
      const capturing = setTimeout(() => {
        setCaptured(getCaptureResult());
        setShowCapturing(false);
        setThrowBall(false);
      }, CAPTURE_WAIT_TIME * 1000);
      return () => {
        clearTimeout(capturing);
      };
    }
  }, [showCapturing]);

  React.useEffect(() => {
    if (captured === false) {
      const resetCaptured = setTimeout(() => {
        setCaptured(null);
      }, FAIL_MESSAGE_DURATION * 1000);
      return () => {
        clearTimeout(resetCaptured);
      };
    }
  }, [captured]);

  const handleHide = e => {
    setShow(false);
    onLeave(captured);
  }

  const handleThrowBall = e => {
    setCaptured(null);
    setThrowBall(true);
  }

  return (
    <Modal
      show={show}
      onHide={handleHide}
    >
      <Modal.Body
        className={css`
          background: url(${captureBg}) no-repeat center center fixed; 
          background-size: cover;
          position: relative;
          overflow: hidden;
        `}
      >
        <div className={css`
          min-height: 75vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}>
          { !captured && (
            <div className={css`
              max-width: 250px;
              max-height: 500px;
              min-width: 200px;
              padding: 30px;
              ${pokemon.isShiny && (css`
                background: url(${shinyBackground}) no-repeat center center; 
                background-size: cover;
              `
              )}
              ${showCapturing && (css`
                animation: capture .5s 1 ease-out normal forwards;
              `)}
              ${captured === false && (css`
                animation: capture 2s 1 ease-in reverse;
              `)}
              @keyframes capture {
                  0% { transform: scale(1); opacity: 1; }
                  100% { transform: scale(.2); opacity: 0; }
                }
            `}>
              <PokemonImg pokemon={pokemon} />
            </div>
            
          )}
          { captured !== null && (
            <CaptureResultDisplay captured={captured} FAIL_MESSAGE_DURATION={FAIL_MESSAGE_DURATION} />
          )}
          <div
            className={css`
              position: absolute;
              bottom: -25%;
              width: 300px;
              height: 300px;

              ${!throwBall && !captured && (css`
                cursor: pointer;
                animation: bounce .5s infinite alternate;
              `)}

              ${throwBall && !showCapturing && (css`
                animation: throw ${THROW_BALL_DURATION}s 1 ease-out normal forwards;
              `)}

              ${captured === false && (css`
                animation: throw ${FAIL_MESSAGE_DURATION}s 1 ease-out reverse;
              `)}

              ${throwBall && showCapturing && (css`
                animation: shake 1s ease-in-out infinite alternate;
              `)}

              ${captured && (css`
                transform: translate(0, -80%) scale(0.5); 
              `)}

              @keyframes bounce {
                0% { transform: translateY(0); }
                100% { transform: translateY(-30px); }
              }
              @keyframes throw {
                0% { transform: translateY(0) scale(1); }
                70% { transform: translateY(-120%) scale(0.75); }
                100% { transform: translateY(-80%) scale(0.5); }
              }
              @keyframes shake {
                0% { transform: translate(0, -80%) rotate(0) scale(0.5); }
                30% { transform: translate(30px, -80%) rotate(20deg) scale(0.5); }
                60% { transform: translate(-30px, -80%) rotate(-20deg) scale(0.5); }
                100% { transform: translate(0, -80%) rotate(0) scale(0.5); }
              }
            `}
            onClick={handleThrowBall}
          >
            <img 
              className={css`
                width: 100%;
                height: 100%;
              `} 
              src={!captured && throwBall && !showCapturing ? pokeballSpining : pokeball} alt='pokeball'
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}


CaptureModal.prototype = {
  pokemon: PropTypes.shape(Pokemon).isRequired,
  onLeave: PropTypes.func.isRequired
}

export default CaptureModal;
