import React from 'react';
import {SocialIcon} from 'react-social-icons';
import {SocialIconContainer, SocialIconWrapper} from "./styles";

export class Footer extends React.Component {
  render() {
    return (
        <footer className="page-footer font-small special-color-dark pt-4">
          <SocialIconContainer>
            <SocialIconWrapper>
              <SocialIcon url="http://vk.com/belyptah"/>
            </SocialIconWrapper>
            <SocialIconWrapper>
              <SocialIcon url="http://www.instagram.com/usadba_bely.ptah/"/>
            </SocialIconWrapper>
          </SocialIconContainer>
        </footer>
    );
  }
}
