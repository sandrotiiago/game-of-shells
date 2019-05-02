import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SettingsButton from '../ui/SettingsButton/SettingsButton';
import CupsList from '../CupsList/CupsList';

import {
  DURATIONS,
  getIterationDuration,
  getNumberOfIterations,
  getShufflingAndBallPlacingDuration,
} from '../../config/settings';
import { CHOOSE_CUP, WON, LOST } from '../../config/strings';
import { getRandomCup } from '../../helpers/randomCup';

import '../../assets/styles/reset.css';
import '../../assets/styles/icons.css';
import './app.css';
import '../../assets/styles/mediaQueries.css';

class App extends Component {
  state = {
    isStartGameDisabled: false,
    isPickCupDisabled: true,
    hasPickedCup: false,
    isBallPlaced: false,
    hideBall: false,
    message: '',
    isMessageBlinking: false,
    raisedCups: [],
    cupIterations: 0,
    ballCup: getRandomCup(),
  }

  shuffle = () => {
    this.setState({ hideBall: true });

    for (let i = 0; i < getNumberOfIterations(this.props.settings.difficulty); i++) {
      setTimeout(() => {
        this.setState({
          cupIterations: this.state.cupIterations + 1
        });
      }, i * getIterationDuration(this.props.settings.difficulty));
    }
  }

  enableUserInteraction = () => {
    this.setState({
      isPickCupDisabled: false,
      message: CHOOSE_CUP,
      isMessageBlinking: true,
    });
  }

  placeBall = () => {
    this.setState({
      isStartGameDisabled: true,
      hasPickedCup: false,
      hideBall: false,
      isBallPlaced: true,
      message: ''
    });
  }

  raiseCup = (cup, lost) => {
    this.toggleRaiseCup(cup);

    setTimeout(() => {
      this.toggleRaiseCup(cup, false);

      if (lost)
        this.raiseCup(this.state.ballCup);
    }, DURATIONS.ballPlacing);
  }

  toggleRaiseCup = (cup, val) => {
    const raisedCups = this.state.raisedCups.slice();
    raisedCups[cup] = (val !== undefined) ? val : !raisedCups[cup];

    this.setState({
      raisedCups: raisedCups
    });
  }

  play = () => {
    this.placeBall();
    this.raiseCup(this.state.ballCup);

    setTimeout(() => {
      this.shuffle();
    }, DURATIONS.ballPlacing + DURATIONS.delayAfterBallPlacing);

    setTimeout(() => {
      this.enableUserInteraction();
    }, getShufflingAndBallPlacingDuration(this.props.settings.difficulty))
  }

  pickCup = (cupId) => {
    if (this.state.isPickCupDisabled || this.state.hasPickedCup) return;

    this.raiseCup(cupId, cupId !== this.state.ballCup);

    this.setState({
      hideBall: false,
      isMessageBlinking: false,
      hasPickedCup: true,
      message: (cupId === this.state.ballCup) ? WON : LOST,
      isStartGameDisabled: false,
      isPickCupDisabled: true,
    });
  }

  render() {
    const {
      isStartGameDisabled,
      isPickCupDisabled,
      hasPickedCup,
      message,
      isMessageBlinking,
      isBallPlaced,
      hideBall,
      ballCup,
      raisedCups,
      cupIterations
    } = this.state;

    return (
      <div id="content">
        <Header
          message={message}
          isMessageBlinking={isMessageBlinking}
        />
        <div id="cups-list">
          <CupsList
            isBallPlaced={isBallPlaced}
            hideBall={hideBall}
            ballCup={ballCup}
            iterations={cupIterations}
            raisedCups={raisedCups}
            isPickCupDisabled={isPickCupDisabled}
            pickCup={this.pickCup}
          />
        </div>
        <Footer
          play={this.play}
          hasPickedCup={hasPickedCup}
          isStartGameDisabled={isStartGameDisabled}
        />
        <SettingsButton isDisabled={isStartGameDisabled} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(App);
