import React from 'react';
import PropTypes from 'prop-types';

import PlayButton from '../ui/PlayButton/PlayButton';

import { START_GAME_BTN, REPLAY_GAME_BTN } from '../../config/strings';

import './footer.css';

const Footer = ({ play, isStartGameDisabled, hasPickedCup }) => (
  <footer className="footer">
    <div className="container">
    {
      !isStartGameDisabled &&
      <PlayButton
        text={!hasPickedCup ? START_GAME_BTN : REPLAY_GAME_BTN}
        onClick={play}
        disabled={isStartGameDisabled}
        className="play-button"
      />
    }
    </div>
  </footer>
);

Footer.propTypes = {
  play: PropTypes.func.isRequired,
  hasPickedCup: PropTypes.bool.isRequired,
  isStartGameDisabled: PropTypes.bool.isRequired
};

export default Footer;
