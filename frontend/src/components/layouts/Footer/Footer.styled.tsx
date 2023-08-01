import styled from "styled-components";

export const FooterWrapper = styled.footer`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: ${({ theme }) => theme.heights.footer};
    padding: 4rem;
    background: ${({ theme }) => theme.color.black};
    z-index: ${({ theme }) => theme.zIndex.footer};
`;

// Left Box
export const LeftBox = styled.div``;
export const Logo = styled.img`
    width: 5.0625rem;
    height: 1.4375rem;
`;

// Right Box
export const RightBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
`;

export const SocialBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const SocialLink = styled.a`
    color: ${({ theme }) => theme.color.white};
    font-size: 0.625rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    padding: 0.25rem;
    border-radius: 0.25rem;

    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.color.bg};
        color: ${({ theme }) => theme.color.black};
    }
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Info = styled.span`
    color: ${({ theme }) => theme.color.white};
    font-size: 0.625rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export const PreventOverlapBox = styled.div`
    position: relative;
    width: 100%;
    height: ${({ theme }) => theme.heights.footer};
    z-index: ${({ theme }) => theme.zIndex.background};
`;
