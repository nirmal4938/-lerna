import React, { useContext } from 'react';
import {
  Field, Buttons, Button,
} from 'ui-components';
import Modal from '../OverlayProvider/Modal';
import { HotkeyContext } from './HotkeyContext';
import { KeyboardButton } from './KeyboardButton';
import styled from 'styled-components';

const keysFromString = (combination) => {
  if (combination === '+') {
    return ['+'];
  }

  combination = combination.replace(/\+{2}/g, '+plus');
  return combination.split('+');
};

const HotkeyRow = styled.div`
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`;


export const HotkeyModalPane = ({
  onClose,
}) => {
  const { hotkeys } = useContext(HotkeyContext);
  return (
    <Modal title="Hotkeys" style={{ maxWidth: '480px' }} onCancel={onClose}>
      {
        hotkeys.map(({
          keys,
          name,
          section,
          description,
        }) => (
          <HotkeyRow>
            <div>{name}</div>
            <div>
              {
                keys?.map((k) => (
                  <div>
                    {
                      keysFromString(k).map((key) => (
                        <KeyboardButton>{key}</KeyboardButton>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </HotkeyRow>
        ))
      }

      <Field flex right style={{ marginTop: '10px', paddingBottom: '0' }}>
        <Buttons>
          <Button type="button" onClick={onClose} secondary>Close</Button>
        </Buttons>
      </Field>
    </Modal>
  );
};

export const HotkeyModal = () => {
  const { state, setState } = useContext(HotkeyContext);

  if (!state.help) {
    return null;
  }

  return (
    <HotkeyModalPane onClose={() => (setState((state) => ({ ...state, help: false })))} />
  );
};
