import React from 'react';

import {
  HeaderWrapper,
  Logo,
  RoutesWrapper,
  NavItem
} from './styles';
import { routes } from '../../asserts/routes';

export class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Logo
          as={NavItem} to='/'
          style={{ color: 'black', fontSize: '2.4rem' }}
        >
          Booking System
        </Logo>
        <RoutesWrapper>
          {
            routes.map(route =>
              <NavItem
                to={route.to}
                children={route.text}
                key={route.text}
                activeStyle={{ color: '#0071ba', backgroundColor: '#fafafa' }}
              />
            )
          }
        </RoutesWrapper>
      </HeaderWrapper>
    );
  }
}
