import { func } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  FloatingBox,
  FloatingBoxText,
} from '../../atoms';
// import { FloatingBoxContent } from '../../atoms';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Tooltip = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
`;

export class TooltipProvider extends React.Component {
  state = {
    open: false,
    text: '',
    style: {},
    x: 0,
    y: 0,
  };

  static childContextTypes = {
    onMouseEnter: func,
    onMouseMove: func,
    onMouseLeave: func,
  };

  getChildContext() {
    return {
      onMouseEnter: this.handleMouseEnter,
      onMouseMove: this.handleMouseMove,
      onMouseLeave: this.handleMouseLeave,
    };
  }

  handleMouseEnter = ({ pageX: x, pageY: y }, text, style) => {
    this.setState({
      text, style, x, y,
    });
  };

  handleMouseMove = (x, y) => {
    this.setState({ x, y });
  };

  handleMouseLeave = () => {
    this.setState({ text: '', style: {} });
  };

  render() {
    const {
      text, style, x, y,
    } = this.state;

    return (
      <Wrap>
        {this.props.children}
        <Tooltip>
          {text && (
            <FloatingBox
              secondary
              style={{
                top: `${y + 20}px`, left: `${x - 40}px`, maxWidth: '300px', zIndex: 9999,
              }}
            >
              <FloatingBoxText style={{
                ...style, color: 'white', margin: 0, padding: 0,
              }}
              >
                {text}
              </FloatingBoxText>
            </FloatingBox>
          )}
        </Tooltip>
      </Wrap>
    );
  }
}

TooltipProvider.propTypes = {
  children: func,
};

