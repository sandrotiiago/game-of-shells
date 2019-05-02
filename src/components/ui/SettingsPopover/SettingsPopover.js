import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DifficultyButton from '../DifficultyButton/DifficultyButton';

import { updateSettings } from '../../../actions/settingsActions';
import { capitalize } from '../../../helpers/capitalize';

import { MIN_CUPS, MAX_CUPS, DIFFICULTIES } from '../../../config/settings';
import { DIFFICULTY, TOTAL_OF_CUPS } from '../../../config/strings';

import './settingsPopover.css';

class SettingsPopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: props.settings.difficulty,
      totalOfCups: props.settings.totalOfCups,
    };
  }

  changeDifficulty = difficulty => {
    this.setState({
      difficulty
    }, () => {
      this.updateSettings();
    });
  }

  onChangeTotalOfCups = e => {
    this.setState({
      totalOfCups: parseInt(e.target.value)
    }, () => {
      this.updateSettings();
    });
  }

  updateSettings = () => {
    this.props.updateSettings(this.state.difficulty, this.state.totalOfCups);
    this.closePopover();
  }

  closePopover = () => {
    this.props.close();
  }

  getTotalCupsItems = () => {
    let items = [];

    for(let i = MIN_CUPS; i <= MAX_CUPS; i++) {
      items.push(<option key={i} value={i}>{i}</option>);
    }

    return items;
  }

  getDifficultyButtons = () => {
    return DIFFICULTIES.map((diff, idx) => (
      <DifficultyButton
        key={idx}
        className={ 'difficulty-button link' + (this.props.settings.difficulty === diff.name ? ' selected' : '') }
        onClick={() => this.changeDifficulty(diff.name)}
        text={capitalize(diff.name)}
      />
    ));
  }

  render() {
    const { isOpen } = this.props;
    const { totalOfCups } = this.state;

    const totalCupsItems = this.getTotalCupsItems();
    const difficultyButtons = this.getDifficultyButtons();

    return (
      <div className={ 'settings-popover' + (isOpen ? ' visible' : '') }>
        <div className="difficulty">
          <label>{ DIFFICULTY }</label>
          <ul>{difficultyButtons}</ul>
        </div>
        <div>
          <label>{ TOTAL_OF_CUPS }</label>
          <select
            value={totalOfCups}
            onChange={this.onChangeTotalOfCups}
          >
            {totalCupsItems}
          </select>
        </div>
      </div>
    );
  }
}

SettingsPopover.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = {
  updateSettings: (difficulty, total) => updateSettings(difficulty, total)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPopover);
