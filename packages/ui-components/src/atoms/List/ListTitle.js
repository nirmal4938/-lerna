import React from 'react';
import styled from 'styled-components';
import { ICCaratDefault, ICCaratDown, ICCaratUp } from '../icons';
import { GenericNoWrapStyle } from '../styles';
import { Text } from '../Text';

// Mapping for sorter icons
const sorts = {
    default: <ICCaratDefault />,
    down: <ICCaratDown />,
    up: <ICCaratUp />,
};

// Styled component for the title container
const StyledListTitle = styled.div`
  flex: 1;
  flex-grow: ${(props) => (props.basis ? '0' : props.grow || 1)};
  flex-basis: ${(props) => (props.basis || '0')};
  cursor: ${(props) => (props.hasSort ? 'pointer' : 'default')};
  padding-right: 20px;
`;

// Default props for StyledListTitle
StyledListTitle.defaultProps = { grow: 1 };

// Function to evaluate text alignment
const evaluateTextAlign = ({ right, center }) => {
    if (right) return 'right';
    if (center) return 'center';
    return 'left';
};

// Styled component for the text inside the title
const ListTitleText = styled(Text)`
  display: inline;
  ${GenericNoWrapStyle}
  color: #9e9faa;
  padding-right: 6px;
  text-align: ${(props) => evaluateTextAlign(props)};
`;

ListTitleText.displayName = 'ListTitleText';

// Styled component for positioning the sorter icon
const Positioner = styled.div`
  position: relative;
  bottom: 2px;
  display: inline;
`;

Positioner.displayName = 'Positioner';

// ListTitle functional component
export const ListTitle = ({
    children,
    sort,
    onClick,
    name,
    right,
    ...props
}) => (
    <StyledListTitle
        {...props}
        onClick={() => onClick && onClick({ target: { name } })}
        hasSort={!!sort}
    >
        <ListTitleText right={right}>{children}</ListTitleText>
        {sort && (
            <Positioner>
                {sorts[sort]}
            </Positioner>
        )}
    </StyledListTitle>
);
