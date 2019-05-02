import React from 'react';
import styled from 'styled-components';


const MainFlexWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;
const Content = styled('div')`
  width: 100%;
  padding: 10px;

  @media(min-width: 768px) {
    max-width: 900px;
  }
  @media(min-width: 767px) {

  }
`;

const withMaxWidthContainer = ComposedComponent => props => (
  <MainFlexWrapper>
    <Content>
      <ComposedComponent />
    </Content>
  </MainFlexWrapper>
);

export default withMaxWidthContainer;
