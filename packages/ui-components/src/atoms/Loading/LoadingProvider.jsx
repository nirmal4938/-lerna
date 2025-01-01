import React from 'react';
import { func } from 'prop-types';
import withContext from 'recompose/withContext';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import { compose } from 'redux';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ active }) =>
    active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0)'};
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
`;

export const LoadingProvider = compose(
  withState('active', 'updateActive', false),
  withHandlers(() => {
    let _ref;
    return {
      registerChild: () => (ref) => (_ref = ref),
      getChild: () => () => _ref,
      activate:
        ({ updateActive }) =>
        () =>
          updateActive(true),
      deactivate:
        ({ updateActive }) =>
        () =>
          updateActive(false),
    };
  }),
  withContext(
    {
      getLoadingProvider: func,
      activate: func,
      deactivate: func,
    },
    ({ getChild, activate, deactivate }) => ({
      getLoadingProvider: () => getChild(),
      deactivate: () => deactivate(),
      activate: () => activate(),
    })
  )
)(({ registerChild, children, style, overlayStyle, active }) => (
  <Container style={style}>
    {children}
    <Overlay active={active} style={overlayStyle} ref={registerChild} />
  </Container>
));
