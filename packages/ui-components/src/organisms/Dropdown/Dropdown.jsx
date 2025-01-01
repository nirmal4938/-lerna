import find from 'lodash/find';
import React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';
import {
  DropdownComponent,
  FloatingBox,
  FloatingBoxItem,
  SubTitle,
} from '../../atoms';
import { CheckBox } from '../CheckBox';
import { withSelectability } from './withSelectability';

const DropdownIcon = styled.div`
  outline: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  width: 18px;
  height: 18px;
  background-color: transparent;
  transition: background-color 0.1s linear;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export const Dropdown = compose(withSelectability)(
  class Dropdown extends React.Component {
    /**
     * Render the internal content that is typically displayed inside a
     * container.
     * @param item The item
     * @param i The index of the item
     * @returns Component
     */
    renderItemContent(item, i) {
      if (item.render) {
        return item.render();
      }
      if (
        this.props.multiple &&
        item.value !== 'DIVIDER' &&
        item.selectable !== false
      ) {
        let isSelected = false;
        const values = this.props._value || [];
        if (values.includes(item.value)) {
          isSelected = true;
        }
        return (
          <CheckBox checked={isSelected} tabIndex="-1" label={item.text} />
        );
      }
      return item.text;
    }

    renderItem(item, i) {
      const icon = item.icon
        ? React.cloneElement(item.icon, {
            width: '16px',
            height: '16px',
            color: 'BLACK',
          })
        : null;
      if (item.value === 'DIVIDER') {
        return (
          <SubTitle style={{ padding: '8px 0 8px 16px', fontSize: '16px' }}>
            {this.renderItemContent(item, i)}
          </SubTitle>
        );
      }
      return (
        <FloatingBoxItem
          ref={this.props.itemRef(i)}
          key={`${item.value}-${i}`}
          icon={icon}
          active={i === this.props.itemFocusIndex}
          onClick={
            item.selectable !== false &&
            this.props._onSelect(item.action || item.value)
          }
        >
          {this.renderItemContent(item, i)}
        </FloatingBoxItem>
      );
    }

    render() {
      let displayValue = this.props.placeholder;

      if (this.props.multiple) {
        if (this.props.displayValue && (this.props._value || []).length) {
          displayValue = this.props.displayValue;
        }
      } else if (this.props._value) {
        const item = find(this.props.items, { value: this.props._value });
        if (item) {
          displayValue = item.text;
        }
      }

      const sharedProps = {
        onFocus: (e) => this.props._onFocus(e),
        onClick: (e) => this.props._onClick(e),
        onKeyDown: (e) => this.props._onKeyDown(e),
        onKeyUp: (e) => this.props._onKeyUp(e),
        disabled: this.props.disabled,
      };

      const dropdownItemsStyle = {
        right: 0,
        top: '55px',
        minWidth: '100%',
        zIndex: 20,
        ...(this.props.floatingBoxStyle || {}),
      };

      if (this.props.maxHeight) {
        dropdownItemsStyle.maxHeight = this.props.maxHeight;
      }

      return (
        <div
          tabIndex={this.props.disabled ? '-1' : this.props.tabIndex || '0'}
          {...sharedProps}
          style={{
            position: 'relative',
            width: '100%',
            outline: 'none',
            ...this.props.style,
          }}
          ref={this.props.wrapperRef}
        >
          {this.props.icon ? (
            <DropdownIcon tabIndex={-1} disabled={sharedProps.disabled}>
              {this.props.icon}
            </DropdownIcon>
          ) : (
            <DropdownComponent
              tabIndex={-1}
              disabled={sharedProps.disabled}
              open={this.props.open}
            >
              {displayValue}
            </DropdownComponent>
          )}

          {this.props.open && this.props.items && (
            <FloatingBox style={dropdownItemsStyle}>
              {this.props.items.map((item, i) => this.renderItem(item, i))}
            </FloatingBox>
          )}
        </div>
      );
    }
  }
);
