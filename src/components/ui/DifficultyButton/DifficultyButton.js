import React from 'react';
import PropTypes from 'prop-types';

import './difficultyButton.css';

const DifficultyButton = ({
  className,
  onClick,
  text
}) => (
  <li
    className={className}
    onClick={onClick}
  >
    {text}
  </li>
);

DifficultyButton.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default DifficultyButton;
