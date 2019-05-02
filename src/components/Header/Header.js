import React from 'react';
import PropTypes from 'prop-types';

import HeaderMessage from './HeaderMessage/HeaderMessage';

import { GAME_NAME } from '../../config/strings';

import './header.css';

const Header = ({ message, isMessageBlinking }) => (
  <header className="header">
    <div className="container">
      <h1>{ GAME_NAME }</h1>
      <HeaderMessage
        message={ message ? message : '' }
        isBlinking={ isMessageBlinking }
      />
    </div>
  </header>
);

Header.propTypes = {
  message: PropTypes.string,
  isMessageBlinking: PropTypes.bool
};

export default Header;
