// packages/ui-components/src/components/Grid/Grid.js

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import media from '../../components/media';

const StyledGrid = styled.div`
  width: 100%;
  ${({ container }) => (container ? '' : 'height: 100%;')}
`;

StyledGrid.displayName = 'Grid';

const margin = (px, isLeft) => ({ fluid, ignoreResponsiveness }) => {
  if (isLeft && ignoreResponsiveness) {
    return '96px';
  }

  if (fluid) {
    return 0;
  }

  return px;
};

const evaluateJustification = ({ children }) => {
  if (typeof children === 'object' && children.length && children.length > 1) {
    return 'space-between';
  }

  return 'flex-start';
};

const GridContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${evaluateJustification};
  height: 100%;
  margin-left: ${margin('64px', true)};
  margin-right: ${margin('64px')};

  ${media.landscape`
    margin-left: ${margin('32px', true)};
    margin-right: ${margin('32px')};
  `}

  ${media.portrait`
    margin-left: ${margin('16px', true)};
    margin-right: ${margin('16px')};
  `}
`;

GridContent.displayName = 'GridContent';

const Grid = ({ innerStyle, ignoreResponsiveness, ...props }) => (
  <StyledGrid {...props}>
    <GridContent
      style={innerStyle}
      ignoreResponsiveness={ignoreResponsiveness}
      fluid={props.fluid}
    >
      {props.children}
    </GridContent>
  </StyledGrid>
);

Grid.propTypes = {
  innerStyle: PropTypes.object,
  ignoreResponsiveness: PropTypes.bool,
  container: PropTypes.bool,
  fluid: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};

Grid.defaultProps = {
  innerStyle: {},
  ignoreResponsiveness: false,
  container: false,
  fluid: false,
  style: {},
  children: null,
};

export default Grid;
