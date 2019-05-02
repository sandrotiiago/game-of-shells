import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CupsListItem from './CupsListItem/CupsListItem';

import shuffle from '../../helpers/shuffle';

import './cupsList.css';

class CupsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cupsOrder: this.setCupsOrder(props.settings.totalOfCups)
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.iterations !== prevProps.iterations) {
      this.setState({
        cupsOrder: shuffle(this.state.cupsOrder)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings.totalOfCups !== this.props.settings.totalOfCups) {
      this.setState({
        cupsOrder: this.setCupsOrder(nextProps.settings.totalOfCups)
      });
    }
  }

  setCupsOrder = (totalOfCups) => {
    let cupsOrder = [];

    for (let i = 0; i < totalOfCups; i++) {
      cupsOrder.push(i);
    }

    return cupsOrder;
  }

  itemHasBall = idx => {
    return idx === this.props.ballCup && this.props.isBallPlaced && !this.props.hideBall;
  }

  getItemWidth = () => {
    return (100 / this.state.cupsOrder.length) + '%';
  }

  getItemLeftMargin = idx => {
    return (this.state.cupsOrder[idx] * (100 / this.state.cupsOrder.length)) + '%';
  }

  getCupsListItems = () => {
    const { cupsOrder } = this.state;

    return cupsOrder.map((cup, idx) => (
      <CupsListItem
        key={idx}
        id={idx}
        hasBall={this.itemHasBall(idx)}
        raisedCups={this.props.raisedCups}
        isPickCupDisabled={this.props.isPickCupDisabled}
        onClick={this.props.pickCup}
        style={{
          width: this.getItemWidth(),
          left: this.getItemLeftMargin(idx),
        }}
      />
    ));
  }


  render() {
    return (
      <div className="cups-list-container">
        { this.getCupsListItems() }
      </div>
    )
  }
}

CupsList.propTypes = {
  isBallPlaced: PropTypes.bool.isRequired,
  hideBall: PropTypes.bool.isRequired,
  ballCup: PropTypes.number.isRequired,
  iterations: PropTypes.number.isRequired,
  raisedCups: PropTypes.array.isRequired,
  pickCup: PropTypes.func.isRequired,
  isPickCupDisabled: PropTypes.bool.isRequired
};

CupsList.defaultProps = {
  ballCup: 0,
  iterations: 0
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(CupsList);
