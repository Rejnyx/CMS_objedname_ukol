import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, MessageSquare, Calendar, Utensils, Warehouse, Star, ClipboardList } from 'lucide-react';

const SidebarContainer = styled.aside`
  width: 250px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral.gray200};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;

  &.active {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
  }

  &:hover:not(.active) {
    background-color: ${({ theme }) => theme.colors.neutral.gray100};
  }

  svg {
    margin-right: ${({ theme }) => theme.spacing.md};
  }
`;

const navItems = [
  { to: "/", label: "Nástěnka", icon: Home },
  { to: "/orders", label: "Objednávky", icon: ShoppingCart },
  { to: "/messages", label: "Zprávy", icon: MessageSquare },
  { to: "/calendar", label: "Kalendář", icon: Calendar },
  { to: "/menu", label: "Správa menu", icon: Utensils },
  { to: "/menu-prehled", label: "Přehled pro personál", icon: ClipboardList },
  { to: "/inventory", label: "Sklad", icon: Warehouse },
  { to: "/reviews", label: "Recenze", icon: Star },
];

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <LogoContainer>Objednáme</LogoContainer>
      <NavList>
        {navItems.map((item) => (
          <StyledNavLink to={item.to} key={item.to}>
            <item.icon size={20} />
            {item.label}
          </StyledNavLink>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
