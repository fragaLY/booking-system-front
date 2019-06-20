import React from 'react';

import {HeaderWrapper, Logo, NavItem, RoutesWrapper} from './styles';
import {routes} from '../../asserts/routes';
import NavLink from "react-bootstrap/NavLink";
import Image from "react-bootstrap/Image";

export class Header extends React.Component {
  render() {
    return (
        <HeaderWrapper>
          <Logo
              as={NavItem} to='/'
              style={{color: 'black', fontSize: '2.4rem'}}
          >
            Bely Ptah
          </Logo>
          <RoutesWrapper>
            {
              routes.map(route =>
                  route.text === 'Login'
                      ? <Image as={NavLink} src={'asset(\'login.png\')'} to={route.to} key={route.text} activestyle={{ color: '#0071ba', backgroundColor: '#fafafa' }} roundedCircle/>
                      : <NavItem to={route.to} children={route.text} key={route.text} activestyle={{ color: '#0071ba', backgroundColor: '#fafafa' }}/>
              )
            }
          </RoutesWrapper>
        </HeaderWrapper>
    );
  }
}
