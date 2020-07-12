import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Modal from 'react-bootstrap/Modal';
import CaptureResultDisplay from '../CaptureResultDisplay';
import { Pokemon } from '../../model/Pokemon';
import captureBg from '../../assets/img/capture-bg.png';
import smokeAnimation from '../../assets/img/run-away-smoke-02.gif';
import CapturePokeball from '../CapturePokeball/CapturePokeball';
import {
  CAPTURE_WAIT_TIME,
  FAIL_MESSAGE_DURATION,
  THROW_BALL_DURATION,
  POKEBALL_CATCH_RATE,
} from '../../config/config';
import { getPokeball } from '../../VAs/02-pokeball';
import { getCatchRate } from '../../VAs/03-catch-rate';
import { getRunAwayByTime } from '../../VAs/continua-04-run-away-by-time';
import { getRunAwayRatePerBallThrow } from '../../VAs/continua-02-run-away-per-balls-throw';
import StatsForNerds from '../StatsForNerds/StatsForNerds';
import { CapturePokemon } from './CapturePokemon';

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
    if (!runAway && !captured) {
      setCaptured(null);
      setThrowBall(true);
    }
  };

  const statsForNerds = (
    <StatsForNerds
      items={[
        { key: 'Pokemon', value: pokemon.name },
        { key: 'Rarity', value: pokemon.rarity },
        { key: 'Shiny', value: `${pokemon.isShiny}` },
        { key: 'Pokeball Type', value: pokeballType },
        { key: 'Capture Event', value: captureEventTry },
        { key: 'Run Away Event', value: triesToRunAway },
        { key: 'Time to Run Away', value: `${timeToRunAway.toFixed(2)}s` },
      ]}
    />
  );

  return (
    <>
      <Modal show={show} onHide={handleHide}>
        <Modal.Body
          className={css`
            background: url(${captureBg}) no-repeat center center;
            background-size: cover;
            position: relative;
            overflow: hidden;
            border: 5px solid #6c757d;
            border-radius: 5px;
            height: 650px;
            width: 500px;
          `}>
          <div
            className={css`
              height: 100%;
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
              <CapturePokemon
                pokemon={pokemon}
                showCapturing={showCapturing}
                captured={captured}
                runAway={runAway}
              />
            )}
            {captured !== null && (
              <CaptureResultDisplay
                pokemon={pokemon}
                captured={captured}
                FAIL_MESSAGE_DURATION={FAIL_MESSAGE_DURATION}
              />
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
        {show && statsForNerds}
      </Modal>
    </>
  );
};

CaptureModal.propTypes = {
  pokemon: PropTypes.shape(Pokemon).isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default CaptureModal;
