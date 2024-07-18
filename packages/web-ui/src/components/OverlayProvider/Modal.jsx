import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ModalCard, CloseButton, Field, Title } from 'ui-components';
import { useHotkey } from '../../hooks';
import useOverlay from './hooks/useOverlay';

export default function Modal({ children, style, title, onCancel }) {
  const { overlayRef, onMouseDown } = useOverlay({ onCancel });

  const cancelRef = useRef(onCancel);
  useEffect(() => {
    cancelRef.current = onCancel;
  }, [onCancel]);

  const onEscape = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current();
    }
  }, []);

  useHotkey('Escape', onEscape);

  if (!overlayRef.current) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <ModalCard style={style} onMouseDown={onMouseDown}>
        {onCancel && <CloseButton onClick={onCancel} />}
        {title && (
          <Field>
            <Title>{title}</Title>
          </Field>
        )}
        {children}
      </ModalCard>
    ),
    overlayRef.current
  );
}
