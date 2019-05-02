import React from 'react';
import PropTypes from 'prop-types';

import './playButton.css';

const PlayButton = ({
  text,
  onClick,
  disabled,
  ...props
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    {...props}
  >{text}</button>
);

PlayButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default PlayButton;
