import React from 'react';
import styled from 'styled-components';

import {
  FloatingBox,
  FloatingBoxItem,
  Text,
  SearchIcon,
  SubTitle,
} from '../../atoms';



import { XIcon } from '../../atoms/icons';
import { GenericInputStyle, GenericTextStyle } from '../../atoms/styles';

import useSearchAndSelect from './hooks/useSearchAndSelect';
export const InputWrapper = styled.div`
  ${GenericInputStyle}
  ${GenericTextStyle}
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'text')};
  height: unset;
  padding: unset;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  padding-left: 16px;
  padding-bottom: 6px;
  padding-right: 32px;
`;
InputWrapper.displayName = 'InputWrapper';

const ActualInput = styled.input`
  ${GenericTextStyle}
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
  margin-top: 11px;
  margin-right: 11px;
  margin-bottom: 5.5px;
  flex-grow: 1;
  width: 100%;
`;
ActualInput.displayName = 'ActualInput';

const InputWidth = styled.span`
  width: ${({ width }) => width};
`;
InputWidth.displayName = 'InputWidth';

const Chip = styled.div`
  ${GenericTextStyle}
  border-radius: 4px;
  padding: 5px;
  margin-top: 6px;
  margin-right: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: ${({ theme }) => theme.CTA_COLOR};
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.1s linear;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  & path {
    transition: fill 0.1s linear !important;
    fill: rgba(255, 255, 255, 0.5) !important;
  }

  & svg:hover path {
    fill: white !important;
  }
`;
Chip.displayName = 'Chip';

const SearchPositioner = styled.div`
  position: absolute;
  right: 8px;
  height: 100%;
  display: flex;
  align-items: center;
`;
SearchPositioner.displayName = 'SearchPositioner';
export const SearchAndSelect = (props) => {
  const {
    selectedItems,
    onSelect,
    onDelete,
    searchingItems,
    searchOpen,
    inputValue,
    wrapperRef,
    inputRef,
    inputWidth,
    onInputChange,
    onSetInputFocus,
    focusedItemIndex,
    onKeyDown,
    onKeyUp,
    onBlur,
    onFocus,
  } = useSearchAndSelect(props);

  const styles = {
    floatingBox: { zIndex: 40 },
    text: { marginTop: '12px' },
    placeholder: {
      marginTop: '12px',
      position: 'absolute',
      color: 'rgba(0,0,0,0.4)',
    },
  };

  return (
    <div ref={wrapperRef} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onBlur={onBlur} onFocus={onFocus}>
      <InputWrapper disabled={props.disabled} onClick={onSetInputFocus} {...(props.wrapper || {})}>
        {selectedItems.map(({ text, value }, i) => (props.multi ? (
          <Chip key={value}>
            {text}{' '}
            {!props.disabled && <XIcon onClick={() => onDelete(i)} style={{ marginLeft: '2px' }} />}
          </Chip>
        ) : (
          <Text key={value} style={styles.text}>
            {text}
          </Text>
        )))}
        {!selectedItems.length && props.placeholder && !inputValue && (
          <Text style={styles.placeholder}>{props.placeholder}</Text>
        )}
        <InputWidth width={inputWidth}>
          <ActualInput ref={inputRef} value={inputValue} disabled={props.disabled} onChange={onInputChange} />
        </InputWidth>
        <SearchPositioner>
          <SearchIcon />
        </SearchPositioner>
      </InputWrapper>
      {searchOpen && (
        <FloatingBox style={{ ...styles.floatingBox, ...props.floatingBoxStyle }}>
          {searchingItems.map(({ text, value, disabled = false, ref }, i) => {
            if (value === 'DIVIDER') {
              return (
                <SubTitle key={`${value}-${i}-${text}`} style={{ padding: '8px 0 8px 16px', fontSize: '16px' }}>
                  {text}
                </SubTitle>
              );
            }
            return (
              <FloatingBoxItem
                key={value}
                ref={ref}
                style={{ fontWeight: value === 'add' ? 'bold' : 'unset' }}
                onClick={(e) => {
                  e.stopPropagation();
                  !disabled && onSelect(i);
                }}
                active={i === focusedItemIndex && !disabled}
                disabled={disabled}
              >
                {text}
              </FloatingBoxItem>
            );
          })}
        </FloatingBox>
      )}
    </div>
  );
};

