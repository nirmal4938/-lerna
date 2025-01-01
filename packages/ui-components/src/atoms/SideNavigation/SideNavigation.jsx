import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
// import { Scrollbar } from 'react-scrollbars-custom';
import styled from 'styled-components';
// import { Logo, CaretDownIcon } from '../icons';
import { Logo } from '../icons/Logo';
import { CaretDownIcon } from '../icons/CaretDownIcon';
import './SideNavigation.scss';

const SideBarItems = styled.div`
  width: 100%;
  flex: 1;
  overflow-x: auto;
  position: relative;

  padding-bottom: ${(props) => (props.hasScroll ? '32px' : '0')};

  ${(props) =>
    props.collapsed
      ? `
    & > div > div:nth-child(2) {
      display: none;
    }
    & > div > div:nth-child(1) {
      margin-left: 14px;
    }
  `
      : ''}
`;
// Function to evaluate scroll indicators
const evaluateScrollIndicators = ({ hasUp, hasDown }) => {
  const top = `inset 0 5px 5px -5px rgba(0,0,0,${hasUp ? '0.3' : '0'})`;
  const bottom = `inset 0 -5px 5px -5px rgba(0,0,0,${hasDown ? '0.3' : '0'})`;
  return [top, bottom].join(',');
};

// Styled component for sidebar scroll indicator
const SideBarItemsScrollIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: ${(props) => evaluateScrollIndicators(props)};
  transition: box-shadow 0.12s linear;

  pointer-events: none;
`;

// Styled component for scroll down indicator container
const ScrollDownIndicatorContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.25s linear;
`;

ScrollDownIndicatorContainer.displayName = 'ScrollDownIndicatorContainer';

// Scroll down indicator component
const ScrollDownIndicator = (props) => (
  <ScrollDownIndicatorContainer {...props}>
    <CaretDownIcon color="rgba(255,255,255,0.8)" />
  </ScrollDownIndicatorContainer>
);

SideBarItemsScrollIndicator.displayName = 'SideBarItemsScrollIndicator';

const LogoContainer = styled.div`
  position: relative;
  left: -10px;
  top: 2px;
`;

const SideFloatingBox = styled.div`
  position: absolute;
  z-index: 99999;
  left: ${({ collapsed }) => (collapsed ? '60px' : '236px')};
`;
SideFloatingBox.displayName = 'SideFloatingBox';

const logo = (
  <LogoContainer>
    <Logo color="white" width={45} height={45} />
  </LogoContainer>
);

export class SideNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      hasUp: false,
      hasDown: false,
      hasScroll: false,
      first: true,
    };

    this.portalElement = null;
    this.container = null;
  }

  getChildContext() {
    return {
      collapsed: this.props.collapsed,
      getElement: this.getElement,
    };
  }

  getElement = () => this.portalElement;

  componentDidMount() {
    window.addEventListener('resize', this.investigate);
    this.investigate();
  }

  componentDidUpdate() {
    this.investigate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.investigate);
  }

  investigate = () => {
    requestAnimationFrame(() => {
      console.log('this.container', this.container);
      if (!this.container) {
        return;
      }

      const { clientHeight, scrollHeight, scrollTop } = this.container;
      // console.log({ clientHeight, scrollHeight, scrollTop });

      const newState = {};

      const hasUp = scrollTop > 0;
      let hasDown = false;
      const hasScroll = clientHeight !== scrollHeight;

      if (clientHeight !== scrollHeight) {
        if (clientHeight + scrollTop !== scrollHeight) {
          hasDown = true;
        }
      }

      if (hasUp !== this.state.hasUp) {
        newState.hasUp = hasUp;
        newState.first = false;
      }
      if (hasDown !== this.state.hasDown) {
        newState.hasDown = hasDown;
      }
      if (hasScroll !== this.state.hasScroll) {
        newState.hasScroll = hasScroll;
      }

      if (Object.keys(newState).length > 0) {
        this.setState(newState);
      }
    });
  };

  handleScroll = () => {
    this.investigate();
  };

  render() {
    const { title, children, footer, collapsed } = this.props;
    // const { hasUp: up, hasDown: down, hasScroll: scrolled, first } = this.state;
    const { hasUp, hasDown, hasScroll, first } = this.state;
    return (
      <div className={clsx('sidebar', { collapsed })}>
        {title && (
          <div className="sidebar-title-area">
            <div className={clsx('sidebar-title-text', { collapsed })}>
              {collapsed ? logo : title}
            </div>
          </div>
        )}
        {children && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              overflowY: 'auto',
            }}
          >
            <SideBarItems
              hasScroll={hasScroll}
              collapsed={collapsed}
              ref={(r) => (this.container = r)}
            >
              {children}
            </SideBarItems>
            <SideBarItemsScrollIndicator hasUp={hasUp} hasDown={hasDown}>
              <ScrollDownIndicator visible={hasDown && first} />
            </SideBarItemsScrollIndicator>
          </div>
        )}
        {footer && (
          <div className={clsx('sidebar-footer', { collapsed })}>{footer}</div>
        )}
        <SideFloatingBox
          collapsed={collapsed}
          ref={(r) => (this.portalElement = r)}
        />
      </div>
    );
  }
}

SideNavigation.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.any,
  collapsed: PropTypes.bool,
};

SideNavigation.childContextTypes = {
  collapsed: PropTypes.bool,
  getElement: PropTypes.func,
};
