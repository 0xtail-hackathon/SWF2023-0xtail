import styled from "styled-components";

export const ImageSectionWrapper = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 33rem;
    padding: 1rem;
`;

export const MainImg = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: ${({ theme }) => theme.zIndex.background};
    transition: transform 0.3s ease;
    border-radius: 1.875rem;
`;

export const ContentBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    bottom: 0;
    padding: 3rem 5rem;
    gap: 2rem;
`;

export const TagBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.85rem;
    border: 1px solid ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.white};
    font-size: 1.125rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
`;

export const Title = styled.h1`
    color: ${({ theme }) => theme.color.white};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: 1.875rem;
    line-height: 3rem;
    margin-bottom: 1rem;
`;

export const PreventOverlapBox = styled.div`
    position: relative;
    width: 100%;
    height: calc(28rem - ${({ theme }) => theme.heights.navbar});
    z-index: ${({ theme }) => theme.zIndex.background};
`;
