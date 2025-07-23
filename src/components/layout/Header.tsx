import React from 'react';
import styled from 'styled-components';
import { Search, Bell, Settings } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.gray200};
  background-color: ${({ theme }) => theme.colors.background.paper};
  flex-shrink: 0;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;

  svg {
    position: absolute;
    left: ${({ theme }) => theme.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.neutral.gray500};
  }
`;

const StyledInput = styled(Input)`
  padding-left: 2.5rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <SearchContainer>
        <Search size={18} />
        <StyledInput placeholder="Hledat cokoliv..." />
      </SearchContainer>
      <ActionsContainer>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
        <UserProfile>
          <Avatar>O</Avatar>
          <span>Orlando L.</span>
        </UserProfile>
      </ActionsContainer>
    </HeaderContainer>
  );
};

export default Header;
