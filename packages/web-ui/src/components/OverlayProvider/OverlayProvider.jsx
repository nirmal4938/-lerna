/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { setDragging } from '../../store/drag/drag.actions';
import OverlayProviderContext from './context/OverlayProviderContext';
import useOverlayProvider from './hooks/useOverlayProvider';
import { setDragging } from '../../store/drag/drag.actions';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
Container.displayName = 'Container';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 11;
  padding-bottom: 16px;
  transition: background-color 0.2s linear;
  background-color: ${({ active }) => (active ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)')};
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
`;
Overlay.displayName = 'Overlay';

export const OverlayProvider = ({ children }) => {
  const {
    active,
    overlayRef,
    contextObject,
  } = useOverlayProvider();

  const dispatch = useDispatch();

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDragging(false));
  }, [dispatch]);

  const onDragOver = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const onDragEnter = useCallback((e) => {
    dispatch(setDragging(true));
  }, [dispatch]);

  const onDragLeave = useCallback((e) => {
    dispatch(setDragging(false));
  }, [dispatch]);

  return (
    <OverlayProviderContext.Provider value={contextObject}>
      <Container
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        {children}
        <Overlay active={active} ref={overlayRef} />
      </Container>
    </OverlayProviderContext.Provider>
  );
};
