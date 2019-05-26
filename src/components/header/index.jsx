import React from 'react';

import {
  HeaderWrapper,
  Logo,
  RoutesWrapper,
  NavItem
} from './styles';
import { routes } from '../../mock-data/routes';

export class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Logo>Booking System</Logo>
        <RoutesWrapper>
          {
            routes.map(route =>
              <NavItem
              to={route.to}
              children={route.text}
              key={route.text}
              activeStyle={{color: 'black', backgroundColor: '#e0e0e0'}}
              />
            )
          }
        </RoutesWrapper>
      </HeaderWrapper>
    );
  }
}
