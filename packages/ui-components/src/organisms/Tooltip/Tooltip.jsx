import { func } from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

class Tooltip extends React.Component {
  static contextTypes = {
    onMouseEnter: func.isRequired,
    onMouseMove: func.isRequired,
    onMouseLeave: func.isRequired,
  };

  handleMouseEnter = (e) => {
    if (this.props.disabled) {
      return;
    }
    this.context.onMouseEnter(e, this.props.content || this.props.children, this.props.style || {});
  };

  handleMouseMove = (e) => {
    if (this.props.disabled) {
      return;
    }
    const { pageX, pageY } = e;
    requestAnimationFrame(() => {
      this.context.onMouseMove(pageX, pageY);
    });
  };

  handleMouseLeave = () => {
    if (this.props.disabled) {
      return;
    }
    this.context.onMouseLeave();
  };

  componentWillUnmount() {
    this.context.onMouseLeave();
  }

  render() {
    return (
      <div
        style={styles.wrapper}
        {...this.props}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Tooltip;
