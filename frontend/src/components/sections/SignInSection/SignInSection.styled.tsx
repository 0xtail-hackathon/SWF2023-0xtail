import { Link } from "react-router-dom";
import styled from "styled-components";

export const SignInWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 55rem;
    border-radius: 1.875rem;
    overflow: hidden;
    margin-bottom: 1rem;
    background: ${({ theme }) => theme.color.bg};
`;

export const LeftWrapper = styled.div`
    img {
        width: 100%;
        height: 100%;
    }
`;

export const RightWrapper = styled.div`
    display: grid;
    grid-template-rows: 2fr 2fr 3rem 3fr;
    align-items: center;
    padding: 2rem;
`;

export const TopBox = styled.div``;

export const CenterBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1rem;

    h2 {
        color: ${({ theme }) => theme.color.black};
        font-size: 1.5625rem;
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        line-height: 2.5rem;
    }
`;

export const SignInBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 4.75rem;
    border-radius: 0.75rem;
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.lightGray};
    font-size: 1.25rem;
    transition: 0.2s ease;

    &:hover {
        cursor: pointer;
        transform: scale(0.99);
    }

    &.kakao {
        background: #fee500;

        img {
        }

        span {
            color: ${({ theme }) => theme.color.black};
            font-weight: ${({ theme }) => theme.fontWeight.medium};
        }
    }

    &.naver {
        background: #03c75a;
        img {
        }

        span {
            color: ${({ theme }) => theme.color.white};
            font-weight: ${({ theme }) => theme.fontWeight.medium};
        }
    }
`;

export const Splitter = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.color.light};
`;

export const BottomBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1rem;

    h3 {
        color: #000;
        font-size: 1.25rem;
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        line-height: 2rem;
    }
`;

export const LinkBox = styled(Link)`
    width: 100%;
    text-align: center;
    text-decoration: underline;
    color: ${({ theme }) => theme.color.lightGray};
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
