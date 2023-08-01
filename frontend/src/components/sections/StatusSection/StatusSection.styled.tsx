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
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1rem;
    width: 66rem;
    height: 37rem;
    border-radius: 1.875rem;
    background: #f8f8f8;
    gap: 1rem;
    img {
    }

    h3 {
        padding-left: 1rem;
        text-align: left;
        font-weight: 400;
        font-size: 1.25rem;
    }
`;

export const BottomBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    h2 {
        padding-left: 1rem;
        font-weight: 400;
        font-size: 1.875rem;
    }
`;

export const TagBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 1.8rem;
    border-radius: 1.875rem;
    background: #a7a7a7;
    font-size: 0.625rem;
    font-weight: 300;
    color: #fff;

    &.success {
        background: #1d6c7a;
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
