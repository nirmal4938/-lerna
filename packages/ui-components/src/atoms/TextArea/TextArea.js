import React from 'react';
import styled from 'styled-components';
// import { LinkIcon, DealsIcon, CustomersIcon } from '../icons/old_icons';
import GenericInputStyle from '../styles/GenericInputStyle';
import GenericTextStyle from '../styles/GenericTextStyle';
import PropTypes from 'prop-types'
// import Text from '../Text/Text';

const TextAreaWrapper = styled.div`
  width: 100%;
  position: relative;
`;
TextAreaWrapper.displayName = 'TextAreaWrapper';

const StyledTextArea = styled.textarea`
  ${GenericInputStyle}
  ${GenericTextStyle}
  width: 100%;
  resize: none;
  padding-bottom: 38px;
`;
StyledTextArea.displayName = 'TextArea';

const TextAreaWidgets = styled.div`
  position: absolute;
  bottom: 5px;
  right: 0;
  display: flex;
`;
TextAreaWidgets.displayName = 'TextAreaWidgets';

const TextAreaWidget = styled.div`
  height: 36px;
  border: 1px solid #e1e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  cursor: pointer;
  transition: border-color 0.3s linear;

  &:last-child {
    border-bottom-right-radius: 4px;
  }

  &:hover {
    border-color: black;
  }
`;
TextAreaWidget.displayName = 'TextAreaWidget';

export const TextArea = React.forwardRef(({
  onAddAppLink, onAddSurveyLink, onAddDealLink, onAddDealName, onAddCustomerName, onAddEmoji, ...props
}, ref) => (
  <TextAreaWrapper>
    <StyledTextArea {...props} ref={ref} />

    {/* <TextAreaWidgets>
        {onAddEmoji && (
          <TextAreaWidget style={{ width: '20px' }} onClick={onAddEmoji}>
            <Text style={{ paddingLeft: '2px' }}>😊</Text>
          </TextAreaWidget>
        )}
        {onAddSurveyLink && (
          <TextAreaWidget onClick={onAddSurveyLink}>
            <LinkIcon color="#484848" width="26px" style={{ paddingRight: '16px' }} />
            <Text style={{ fontSize: '13px', color: '#484848' }}>Survey Hyperlink</Text>
          </TextAreaWidget>
        )}
        {onAddAppLink && (
          <TextAreaWidget onClick={onAddAppLink}>
            <LinkIcon color="#484848" width="26px" style={{ paddingRight: '16px' }} />
            <Text style={{ fontSize: '13px', color: '#484848' }}>Store Hyperlink</Text>
          </TextAreaWidget>
        )}
        {onAddDealLink && (
          <TextAreaWidget onClick={onAddDealLink}>
            <LinkIcon color="#484848" width="26px" style={{ paddingRight: '16px' }} />
            <Text style={{ fontSize: '13px', color: '#484848' }}>Deal Hyperlink</Text>
          </TextAreaWidget>
        )}
        {onAddDealName && (
          <TextAreaWidget onClick={onAddDealName}>
            <DealsIcon color="#484848" width="26px" style={{ paddingRight: '16px' }} />
            <Text style={{ fontSize: '13px', color: '#484848' }}>Deal Name</Text>
          </TextAreaWidget>
        )}
        {onAddCustomerName && (
          <TextAreaWidget onClick={onAddCustomerName}>
            <CustomersIcon color="#484848" width="26px" style={{ paddingRight: '16px' }} />
            <Text style={{ fontSize: '13px', color: '#484848' }}>First Name</Text>
          </TextAreaWidget>
        )}
      </TextAreaWidgets> */}
  </TextAreaWrapper>
));

TextArea.propTypes = {
  onAddSurveyLink: PropTypes.func,
  onAddAppLink: PropTypes.func,
  onAddDealLink: PropTypes.func,
  onAddDealName: PropTypes.func,
  onAddCustomerName: PropTypes.func,
  onAddEmoji: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

// export default TextArea;
