import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 6rem;
  background-color: #f5f5f5;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2rem 0 10rem;
  font-size: 2.4rem;
`;

export const RoutesWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 0 2rem;
  padding: 0 2rem;
  height: 100%;
  font-size: 1.6rem;
  color: #2196f3;
  text-decoration: none;
`;
