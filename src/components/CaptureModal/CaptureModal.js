import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Modal from 'react-bootstrap/Modal';
import CaptureResultDisplay from '../CaptureResultDisplay';
import PokemonImg from '../PokemonImg';
import { Pokemon } from '../../model/Pokemon';
import captureBg from '../../assets/img/capture-bg.png';
import shinyBackground from '../../assets/img/sparkle.gif';
import CapturePokeball from '../CapturePokeball/CapturePokeball';
import { CAPTURE_WAIT_TIME, FAIL_MESSAGE_DURATION, THROW_BALL_DURATION, POKEBALL_CATCH_RATE } from '../../config/config';
import { getPokeball } from '../../VAs/02-histograma-pokeball';
import { getCatchRate } from '../../VAs/03-catch-rate';

const CaptureModal = ({pokemon, onLeave}) => {
  const [show, setShow] = useState(true);
  const [throwBall, setThrowBall] = useState(false);
  const [showCapturing, setShowCapturing] = useState(false);
  const [captured, setCaptured] = useState(null);
  const [pokeballType] = useState(getPokeball());
  const [captureEventTry] = useState(getCatchRate(POKEBALL_CATCH_RATE[pokeballType]));
  const [currentTry, setCurrentTry] = useState(1);

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
        if (showCapturing) {
          setCaptured(currentTry === captureEventTry);
          setCurrentTry(currentTry + 1);
          setShowCapturing(false);
          setThrowBall(false);
        }
      }, CAPTURE_WAIT_TIME * 1000);
      return () => {
        clearTimeout(capturing);
      };
    }
  }, [showCapturing, pokeballType, currentTry, captureEventTry]);

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
          border: 5px solid #6c757d;
          border-radius: 5px;
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
          <CapturePokeball
            throwBall={throwBall}
            captured={captured}
            onThrowBall={handleThrowBall}
            showCapturing={showCapturing}
            type={pokeballType}
          />
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
