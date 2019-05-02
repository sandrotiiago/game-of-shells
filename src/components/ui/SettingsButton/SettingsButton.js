import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SettingsPopover from '../SettingsPopover/SettingsPopover';

import './settingsButton.css';

class SettingsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false
    };
  }

  toggleSettingsPopover = val => {
    if (this.props.isDisabled) return;

    this.setState({
      isPopoverOpen: val !== undefined ? val : !this.state.isPopoverOpen
    });
  }

  closePopover = () => {
    this.toggleSettingsPopover(false);
  }

  render() {
    const { isPopoverOpen } = this.state;
    const { isDisabled } = this.props;

    return (
      <div
        className="settings-btn-wrapper"
      >
        <div
          className={'settings-btn link' + (isDisabled ? ' disabled' : '')}
          onClick={() => this.toggleSettingsPopover()}
        >
          <i className="icon-settings"></i>
        </div>
        <SettingsPopover
          isOpen={isPopoverOpen}
          close={this.closePopover}
        />
      </div>
    );
  }
}

SettingsButton.propTypes = {
  isDisabled: PropTypes.bool,
};

export default SettingsButton;
