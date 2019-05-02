import React from 'react';
import PropTypes from 'prop-types';

import './headerMessage.css';

const HeaderMessage = ({ message, isBlinking }) => (
  <div className={ 'header-message' + (isBlinking ? ' blinking' : '') }>{ message }</div>
);

HeaderMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isBlinking: PropTypes.bool
};

export default HeaderMessage;
