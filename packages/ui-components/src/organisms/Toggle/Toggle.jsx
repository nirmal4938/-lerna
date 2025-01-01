import React, { Component } from 'react';
import { ToggleComponent } from '../../atoms';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleClick() {
    this.toggle();
  }

  handleKeyUp(e) {
    switch (e.which) {
      case 32: // space
      case 13: // enter
        this.toggle();
        break;
      default:
        break;
    }
  }

  toggle() {
    this.setState(
      (prevState) => ({ checked: !prevState.checked }),
      () => {
        const { name, onChange, onChecked, onUnchecked } = this.props;
        const { checked } = this.state;

        if (onChange) {
          onChange({ target: { name, checked } });
        }

        if (onChecked && checked) {
          onChecked({ target: { name, checked: true } });
        }

        if (onUnchecked && !checked) {
          onUnchecked({ target: { name, checked: false } });
        }
      }
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render() {
    return (
      <ToggleComponent
        checked={this.state.checked}
        onKeyUp={this.handleKeyUp}
        onClick={this.handleClick}
      />
    );
  }
}

export default Toggle;
