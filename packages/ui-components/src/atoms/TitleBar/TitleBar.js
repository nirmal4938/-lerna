// packages/ui-components/src/components/TitleBar/TitleBar.js

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../Button';
import { ComponentBar } from '../ComponentBar';
// import Grid from '../Grid';
import { BackArrow } from '../icons/BackArrow';
import { Title } from '../Title';
import { Grid } from '../Grid';

const BackButton = styled(Button)`
  width: 80px;
  height: 80px;
  position: absolute;
  color: ${({ theme }) => theme.CTA_COLOR};
  border-color: ${({ theme }) => theme.BG_GREY};
  border-radius: 0;
`;

const DraggableComponentBar = styled(ComponentBar)`
  app-region: drag;
  position: ${({ fixed }) => (fixed ? 'fixed' : 'relative')};
  padding-right: ${({ fixed }) => (fixed ? '196px' : '0')};
  height: 80px;
  background-color: white;
  z-index: 10;
`;

const StyledTitleBar = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const Extra = styled.div`
  display: flex;
  flex-direction: row;
`;

const Spacer = styled.div`
  height: 80px;
`;

Spacer.displayName = 'Spacer';

export const TitleBar = ({ title, onBackClicked, right = [], fixed }) => (
  <>
    <DraggableComponentBar fixed={fixed}>
      {onBackClicked && (
        <BackButton secondary onClick={onBackClicked}><BackArrow /></BackButton>
      )}
      <Grid ignoreResponsiveness={!!onBackClicked}>
        <StyledTitleBar>
          <Title>{title}</Title>
        </StyledTitleBar>
        <Extra>
          {right}
        </Extra>
      </Grid>
    </DraggableComponentBar>
    {fixed && <Spacer />}
  </>
);

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  titleRender: PropTypes.node,
  onBackClicked: PropTypes.func,
  buttonText: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  right: PropTypes.array,
  fixed: PropTypes.bool,
};

TitleBar.defaultProps = {
  titleRender: null,
  onBackClicked: null,
  buttonText: null,
  buttonDisabled: false,
  right: [],
  fixed: false,
};

// export default TitleBar;
