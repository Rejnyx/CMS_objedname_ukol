import React from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const MainContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentWrapper = styled.main`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <AppContainer>
      <Sidebar />
      <MainContentContainer>
        <Header />
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContentContainer>
    </AppContainer>
  );
};

export default DashboardLayout;
