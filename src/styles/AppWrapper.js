import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #19191aff;
  
`;

export const ContentWrapper = styled.main`
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  @media (max-width: 480px){
    padding: 0;
  }
`;