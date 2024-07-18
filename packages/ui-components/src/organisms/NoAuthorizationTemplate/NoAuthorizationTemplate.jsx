import React from 'react';
import styled, { withTheme } from 'styled-components';

import { Card } from '../../atoms';
import { Logo } from '../../atoms';
// import { Title } from '../../atoms/Title';
import PropTypes from 'prop-types';

const CenteredPage = styled.div`
  background-color: ${({ theme }) => theme.CTA_COLOR};
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s linear;
`;

export const CenteredHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 40px;
`;

const FloatingCard = styled(Card)`
  margin-top: 0;
  box-shadow: 0px 2px 29px -8px rgba(0,0,0,0.75);
`;

const ContainerWidth = styled.div`
  width: 400px;
`;

const NoAuthorizationTemplateComponent = ({
  theme, containerStyle, topContent, children, noLogo, headerStyle = {}, cardStyle, centerStyle,
}) => (
  <CenteredPage style={centerStyle}>
    {topContent}
    <ContainerWidth style={containerStyle}>
      {children && (
        <FloatingCard style={cardStyle}>
          {!noLogo && (
            <CenteredHeader style={{ paddingBottom: '48px', paddingTop: '24px' }}>
              <Logo color={theme.CTA_COLOR} />
            </CenteredHeader>
          )}

          {children}
        </FloatingCard>
      )}
    </ContainerWidth>
  </CenteredPage>
);

NoAuthorizationTemplateComponent.propTypes = {
  containerStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  title: PropTypes.string,
  topContent: PropTypes.node,
  noLogo: PropTypes.bool,
  headerStyle: PropTypes.object,
  centerStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const NoAuthorizationTemplate = withTheme(NoAuthorizationTemplateComponent);

export default NoAuthorizationTemplate;
