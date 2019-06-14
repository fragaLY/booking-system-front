import React from 'react';
import {SocialIcon} from 'react-social-icons';
import {FooterWrapper, SocialIconContainer, SocialIconWrapper} from "./styles";

export class Footer extends React.Component {
  render() {
    return (
        <FooterWrapper>
          <footer className="page-footer font-small special-color-dark pt-4">
            <SocialIconContainer>
              <SocialIconWrapper>
                <SocialIcon url="http://vk.com/belyptah" target="_blank"/>
              </SocialIconWrapper>
              <SocialIconWrapper>
                <SocialIcon url="http://www.instagram.com/usadba_bely.ptah/" target="_blank"/>
              </SocialIconWrapper>
              <SocialIconWrapper>
                <SocialIcon url="https://www.facebook.com/groups/usadba.bely.ptah/" target="_blank"/>
              </SocialIconWrapper>
              <SocialIconWrapper>
                <SocialIcon url="https://ok.ru/agrousadba.belyptah" target="_blank"/>
              </SocialIconWrapper>
            </SocialIconContainer>
          </footer>
        </FooterWrapper>
    );
  }
}
