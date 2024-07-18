import { Chip, LetterAvatar } from 'ui-components';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { useMe } from '../../hooks/useMe';
// import { UserEdit } from '../../views/UserView/UserEdit';
// import { HotkeyContext } from '../HotkeyProvider/HotkeyContext';
// import { PermissionPickerModal } from '../PermissionPicker/PermissionPickerModal';
import generic from './generic.jpg';

const Wrapper = styled.div`
  width: 100%;
  height: ${({ collapsed }) => (collapsed ? '60px' : '148px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.CTA_COLOR_HOVER};
`;

const StyledAvatar = styled.img`
  width: ${({ collapsed }) => (collapsed ? '34px' : '96px')};
  height: ${({ collapsed }) => (collapsed ? '34px' : '96px')};
  border-radius: 64px;
  border: 1px solid ${({ theme }) => theme.CTA_COLOR_HOVER};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`;

const DebugChip = styled(Chip)`
  position: absolute;
  top: 3px;
  left: 3px;
  color: white;
  padding: 1px 3px;
  font-size: 12px;
  border-radius: 2px;
`;

export const Avatar = ({ collapsed }) => {
  const [open, setOpen] = useState(false);
//   const { state, setState } = useContext(HotkeyContext);
  const { me } = useMe();

  const god_mode = me?.god_mode;

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

//   const onDisableDebug = useCallback(() => {
//     setState((s) => ({ ...s, debug: false }));
//   }, [setState]);

  return (
    <Wrapper collapsed={collapsed}>
      {/* {state.debug && (
        <DebugChip onClick={onDisableDebug} color="green">
          DEBUG
        </DebugChip>
      )} */}
      <LetterAvatar
        text={me?.first_name?.[0] || ''}
        img={generic}
        onClick={onClick}
        collapsed={collapsed}
      />
      {/* {open && (god_mode ? <PermissionPickerModal onCancel={() => setOpen(false)} /> : <UserEdit onCancel={() => setOpen(false)} />)} */}
    </Wrapper>
  );
};
