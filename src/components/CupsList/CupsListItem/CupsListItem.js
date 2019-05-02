import React from 'react';
import PropTypes from 'prop-types';

import cupImg from '../../../assets/images/silver-cup.png';
import ballImg from '../../../assets/images/blue-ball.png';

import './cupsListItem.css';

const CupsListItem = ({
  id,
  hasBall,
  raisedCups,
  isPickCupDisabled,
  style,
  onClick
}) => (
  <div
    id={'cup-' + (id + 1)}
    className={'cup' + (!isPickCupDisabled ? ' link' : '')}
    style={style}
    onClick={() => onClick(id)}
  >
    <div className="cup-wrapper">
      <img
        src={cupImg}
        alt={'Cup ' + id}
        className={'cup-image' + (raisedCups[id] === true ? ' cup-raised' : '')}
      />
      {
        hasBall &&
        <img
          src={ballImg}
          alt="Ball"
          className="ball"
          width={80}
        />
      }
    </div>
  </div>
)

CupsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  hasBall: PropTypes.bool.isRequired,
  raisedCups: PropTypes.array.isRequired,
  isPickCupDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};

CupsListItem.defaultProps = {
  id: 0,
  style: {}
};

export default CupsListItem;
