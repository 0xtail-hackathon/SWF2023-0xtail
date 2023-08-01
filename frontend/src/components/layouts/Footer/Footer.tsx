import {
    SocialBox,
    FooterWrapper,
    Info,
    LeftBox,
    Logo,
    RightBox,
    SocialLink,
    InfoBox,
    PreventOverlapBox,
} from "./Footer.styled";
const LOGO_ROOT_IMG = "/images/LogoRoot.svg";

const Footer = () => {
    return (
        <>
            <FooterWrapper>
                <LeftBox>
                    <Logo src={LOGO_ROOT_IMG} alt="Logo" />
                </LeftBox>

                <RightBox>
                    <SocialBox>
                        <SocialLink href="https://twitter.com/">
                            Twitter
                        </SocialLink>
                        <SocialLink href="https://instagram.com/">
                            Instagram
                        </SocialLink>
                        <SocialLink href="https://medium.com/">
                            Medium
                        </SocialLink>
                    </SocialBox>
                    <InfoBox>
                        <Info>상호명 | 0xtail</Info>
                        <Info>
                            사업장소재지 | 서울특별시 성동구 아차산로 13길 11,
                            1층
                        </Info>
                        <Info>사업자등록번호 | 211-88-79575</Info>
                        <Info>전화번호 | 1644-0560</Info>
                        <Info>이메일 | customer@29cm.co.kr</Info>
                    </InfoBox>
                </RightBox>
            </FooterWrapper>
            <PreventOverlapBox />
        </>
    );
};

export default Footer;
