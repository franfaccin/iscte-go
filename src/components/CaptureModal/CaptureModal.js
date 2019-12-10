import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Modal from 'react-bootstrap/Modal';
import CaptureResultDisplay from '../CaptureResultDisplay';
import PokemonImg from '../PokemonImg';
import { Pokemon } from '../../model/Pokemon';
import captureBg from '../../assets/img/capture-bg.png';
import shinyBackground from '../../assets/img/sparkle.gif';
import smokeAnimation from '../../assets/img/run-away-smoke-02.gif';
import CapturePokeball from '../CapturePokeball/CapturePokeball';
import {
  CAPTURE_WAIT_TIME,
  FAIL_MESSAGE_DURATION,
  THROW_BALL_DURATION,
  POKEBALL_CATCH_RATE,
} from '../../config/config';
import { getPokeball } from '../../VAs/02-histograma-pokeball';
import { getCatchRate } from '../../VAs/03-catch-rate';
import { getRunAwayByTime } from '../../VAs/continua-04-run-away-by-time';
import { getRunAwayRatePerBallThrow } from '../../VAs/continua-02-run-away-per-balls-throw';

const CaptureModal = ({ pokemon, onLeave }) => {
  const [show, setShow] = useState(true);
  const [throwBall, setThrowBall] = useState(false);
  const [showCapturing, setShowCapturing] = useState(false);
  const [captured, setCaptured] = useState(null);
  const [pokeballType] = useState(getPokeball());
  const [captureEventTry] = useState(getCatchRate(POKEBALL_CATCH_RATE[pokeballType]));
  const [currentTry, setCurrentTry] = useState(1);
  const [triesToRunAway] = useState(parseInt(getRunAwayRatePerBallThrow())); // Time in seconds
  const [timeToRunAway] = useState(getRunAwayByTime()); // Time in seconds
  const [runAway, setRunAway] = useState(false);

  useEffect(() => {
    if (throwBall) {
      const captureTimeout = setTimeout(() => {
        setShowCapturing(true);
      }, THROW_BALL_DURATION * 1000);
      return () => {
        clearTimeout(captureTimeout);
      };
    }
  }, [throwBall]);

  useEffect(() => {
    if (showCapturing) {
      const capturing = setTimeout(() => {
        if (showCapturing) {
          setCaptured(currentTry === captureEventTry && !runAway);
          setCurrentTry(currentTry + 1);
          setShowCapturing(false);
          setThrowBall(false);
        }
      }, CAPTURE_WAIT_TIME * 1000);
      return () => {
        clearTimeout(capturing);
      };
    }
  }, [showCapturing, pokeballType, currentTry, captureEventTry, runAway]);

  useEffect(() => {
    if (currentTry - 1 === triesToRunAway) {
      setRunAway(true);
    }
  }, [currentTry, triesToRunAway]);

  useEffect(() => {
    if (captured === false) {
      const resetCaptured = setTimeout(() => {
        setCaptured(null);
      }, FAIL_MESSAGE_DURATION * 1000);
      return () => {
        clearTimeout(resetCaptured);
      };
    }
  }, [captured]);

  const handleHide = useCallback(
    e => {
      setShow(false);
      onLeave(captured, runAway);
    },
    [setShow, onLeave, captured, runAway]
  );

  const closeModalCallback = useCallback(() => {
    handleHide();
  }, [handleHide]);

  const runAwayPokemon = useCallback(() => {
    if (!captured && (currentTry !== captureEventTry || !showCapturing)) {
      setRunAway(true);
    }
  }, [captured, captureEventTry, currentTry, showCapturing]);

  useEffect(() => {
    const runAwayTimer = setTimeout(runAwayPokemon, timeToRunAway * 1000);
    return () => clearTimeout(runAwayTimer);
  }, []);

  useEffect(() => {
    if (runAway && !showCapturing && !captured) {
      const closeModalTimeout = setTimeout(closeModalCallback, 750);
      return () => clearTimeout(closeModalTimeout);
    }
  }, [runAway, showCapturing, closeModalCallback, captured]);

  const handleThrowBall = e => {
    if (!runAway) {
      setCaptured(null);
      setThrowBall(true);
    }
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Body
        className={css`
          background: url(${captureBg}) no-repeat center center fixed;
          background-size: cover;
          position: relative;
          overflow: hidden;
          border: 5px solid #6c757d;
          border-radius: 5px;
        `}>
        <div
          className={css`
            height: 75vh;
            max-height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}>
          {runAway && !showCapturing && !captured && (
            <img
              className={css`
                max-width: 250px;
                max-height: 250px;
                transform: translateY(50%);
              `}
              src={smokeAnimation}
              alt="smoke animation"
            />
          )}

          {!captured && (
            <div
              className={css`
              max-width: 250px;
              max-height: 500px;
              min-width: 200px;
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
                  animation: capture 2s 1 ease-in reverse;
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
              @keyframes runAway {
                0% { transform: translate(0, 0); }
                100% { transform: translate(-200%, 0); }
              }
            `}>
              <PokemonImg pokemon={pokemon} />
            </div>
          )}
          {captured !== null && (
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
  );
};

CaptureModal.prototype = {
  pokemon: PropTypes.shape(Pokemon).isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default CaptureModal;
