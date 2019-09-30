import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import congratz from '../../assets/img/congrats.gif';

const CaptureResultDisplay = ({captured, FAIL_MESSAGE_DURATION}) => {
  const bgcImg = captured ? congratz : '';
  return (
    <div className={css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 250px;
      height: 250px;
      background: url(${bgcImg}) no-repeat center center; 
      background-size: cover;
      color: white;
      position: absolute;
      top: 0;
      text-align: center;
      ${!captured && (css`
        animation: fadeAway ${FAIL_MESSAGE_DURATION}s 1 ease-out normal forwards;
      `)}

      @keyframes fadeAway {
        0% { opacity: 1; }
        70% { opacity: 1; }
        100% { opacity: 0; }
      }
    `}>
      <h3>
        {captured
          ? <>Congratulations! <br/> Pokemon captured! </>
          : 'Pokemon escaped pokeball!'
        }
      </h3>
    </div>
  )
}

CaptureResultDisplay.propTypes = {
  captured: PropTypes.bool.isRequired,
  FAIL_MESSAGE_DURATION: PropTypes.number.isRequired
}

export default CaptureResultDisplay;
