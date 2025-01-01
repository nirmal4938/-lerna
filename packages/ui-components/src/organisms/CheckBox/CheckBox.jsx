import keycode from 'keycode';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms';
import { CheckBoxIcon, CheckBoxTickedIcon } from '../../atoms/icons';

const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  outline: none;
  transition: all 0.1s ease-in-out;

  & path {
    fill: ${({ theme, checked }) =>
      checked ? theme.DARKISH_GREEN : theme.GREY};
  }

  &:focus path,
  :hover path {
    fill: ${({ theme }) => theme.CTA_COLOR};
  }
`;

ToggleContainer.displayName = 'ToggleContainer';

const SvgFix = styled.div`
  position: relative;
  top: 1px;
`;

const SubText = styled(Text)`
  padding-left: 24px;
  position: absolute;
  font-size: 13px;
  top: 22px;
`;

SubText.displayName = 'SubText';

export class CheckBox extends Component {
  static defaultProps = {
    checked: false,
    tabIndex: '0',
  };

  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  handleKeyDown(e) {
    switch (keycode(e)) {
      case 'space':
      case 'enter':
        this.handleClick();
        break;
      default:
        break;
    }
  }

  handleClick(e) {
    if (this.props.tabIndex === '-1') {
      return;
    }

    this.setState(
      { checked: !this.state.checked },
      () =>
        this.props.onChange &&
        this.props.onChange({
          target: { name: this.props.name, value: this.state.checked },
        })
    );
  }

  render() {
    return (
      <ToggleContainer
        checked={this.state.checked}
        tabIndex={this.props.tabIndex}
        onKeyDown={(e) => this.handleKeyDown(e)}
        onClick={(e) => this.handleClick(e)}
        style={this.props.style}
      >
        <SvgFix>
          {this.state.checked ? <CheckBoxTickedIcon /> : <CheckBoxIcon />}
        </SvgFix>
        <Text style={{ paddingLeft: '8px' }}>{this.props.label}</Text>
        {this.props.sublabel && <SubText>{this.props.sublabel}</SubText>}
      </ToggleContainer>
    );
  }
}
