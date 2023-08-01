import styled from "styled-components";

export const TopWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    /* padding-left: 5rem; */
`;

export const MainImg = styled.img`
    width: 100%;
    height: 15.25rem;
    object-fit: cover;
`;

export const TopBox = styled.div`
    position: absolute;
    top: 0;
    left: 5rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;

    h1 {
        display: inline-block;
        position: absolute;
        top: 5rem;
        left: 6rem;
        width: 45rem;
        color: ${({ theme }) => theme.color.white};
        font-size: 6.25rem;
        font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    }
`;
export const LogoImg = styled.img``;

export const RoundTextBox = styled.div`
    border-radius: 1.8rem;
    border: 1px solid ${({ theme }) => theme.color.white};
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.color.white};
    font-size: 1.125rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    margin-top: 2rem;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5rem;
    gap: 4rem;
    width: 100%;
`;

export const StatusWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 45rem;
`;
export const StatusBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 12rem;
    height: 12rem;
    border: 1px dashed black;
    border-radius: 50%;
    padding: 2.5rem;

    font-size: 1.5rem;
    text-align: center;
    color: ${({ theme }) => theme.color.black};

    &.prev-status {
        color: ${({ theme }) => theme.color.white};
        background: ${({ theme }) => theme.color.darkGray};
    }

    &.current-status {
        color: ${({ theme }) => theme.color.white};
        background: ${({ theme }) => theme.color.black};
    }
`;

export const Line = styled.div`
    width: 4.25rem;
    height: 0rem;
    border: 1px dashed black;

    &.solid {
        border: 1px solid black;
    }
`;

export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    img {
        width: 32.5rem;
        height: 40.875rem;
    }
    a {
        font-size: 1.2rem;
        color: blue;
        text-decoration: underline;
    }
`;

export const NextButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    font-size: 1.25rem;
    font-weight: 400;
    width: 26.625rem;
    height: 4.0625rem;
    border-radius: 1.875rem;

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.color.light};
        color: ${({ theme }) => theme.color.black};
    }
`;
