import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
// import { Scrollbar } from 'react-scrollbars-custom';
import styled from 'styled-components';
// import { Logo, CaretDownIcon } from '../icons';
import { Logo } from '../icons/Logo';
import { CaretDownIcon } from '../icons/CaretDownIcon';
import './SideNavigation.scss';

const ScrollDownIndicator = ({ visible, ...props }) => (
  <div className={clsx('sidebar-scroll-down-indicator-container', { visible })} {...props}>
    <CaretDownIcon color="rgba(255,255,255,0.8)" />
  </div>
);

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
      if (!this.container) {
        return;
      }

      const { clientHeight, scrollHeight, scrollTop } = this.container;

      const newState = {};

      const hasUp = scrollTop > 0;
      let hasDown = false;
      const hasScroll = clientHeight !== scrollHeight;

      if (clientHeight !== scrollHeight) {
        if ((clientHeight + scrollTop) !== scrollHeight) {
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
    const { hasUp: up, hasDown: down, hasScroll: scrolled, first } = this.state;

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
          <div style={{ position: 'relative', display: 'flex', flex: 1, overflowY: 'auto' }}>
            {/* <Scrollbar
              style={{ width: '100%', height: '100%' }}
              ref={(r) => (this.container = r)}
              className="react-scrollbar-custom"
            > */}
              <div className={clsx('sidebar-items', { scrolled, collapsed })}>{children}</div>
            {/* </Scrollbar> */}
            <div className={clsx('sidebar-scroll-indicator', { up, down })}>
              <ScrollDownIndicator visible={down && first} />
            </div>
          </div>
        )}
        {footer && <div className={clsx('sidebar-footer', { collapsed })}>{footer}</div>}
        <SideFloatingBox collapsed={collapsed} ref={(r) => (this.portalElement = r)} />
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

