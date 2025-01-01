import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { withHandlers, withStateHandlers } from 'recompose';
import getContext from 'recompose/getContext';
import { compose } from 'redux';
import styled from 'styled-components';
import './SideNavigationItem.scss';

const Icon = styled.div`
  margin-left: 16px;
`;

Icon.displayName = 'Icon';

const Content = styled.div``;

Content.displayName = 'Content';

const Positioner = styled.div``;

Positioner.displayName = 'Positioner';

const SideNavigationItemComponent = ({
  children,
  registerRef,
  active,
  icon,
  disabled,
  isSubItem,
  collapsed,
  className,
  ...props
}) => (
  <div
    className={clsx('nav-item', className, {
      collapsed,
      disabled,
      active,
      'is-sub-item': isSubItem,
    })}
    ref={registerRef}
    {...props}
  >
    <Icon>{icon}</Icon>
    {(!collapsed || isSubItem) && (
      <div className="nav-item-content">{children}</div>
    )}
  </div>
);

SideNavigationItemComponent.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  isSubItem: PropTypes.bool,
  noClick: PropTypes.bool,
  registerRef: PropTypes.func,
  className: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
};

export const SideNavigationItem = compose(
  getContext({
    collapsed: PropTypes.bool.isRequired,
    getElement: PropTypes.func.isRequired,
  })
)(SideNavigationItemComponent);

// export default SideNavigationItem;
