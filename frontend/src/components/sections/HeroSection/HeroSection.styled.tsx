import styled from "styled-components";

export const HeroSectionWrapper = styled.section`
    position: relative;
    width: 100%;
    height: 46rem;
`;

export const HeroImg = styled.img`
    width: 100%;
    position: absolute;
    top: -10rem;
    z-index: ${({ theme }) => theme.zIndex.background};
    transition: transform 0.3s ease;
`;

export const ContentBox = styled.div`
    position: absolute;
    top: 28%;
    width: 100%;
    padding-left: 2rem;
`;

export const LocationBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 11rem;
    height: 2.4375rem;
    border-radius: 1.84375rem;
    border: 1px solid ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.white};
    font-size: 1.125rem;
    font-weight: 400;
`;

export const MiddleBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
`;

export const ArrowIconImg = styled.img`
    width: 3.6875rem;
    height: 3.6875rem;
    margin-bottom: 3rem;
    border-radius: 50%;
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.color.dark};
    }
`;

export const Name = styled.h1`
    color: ${({ theme }) => theme.color.white};
    font-size: 8.125rem;
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    margin: 1rem 0;
`;

export const BottomBox = styled.div`
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Title = styled.h2`
    color: ${({ theme }) => theme.color.black};
    font-size: 2.1875rem;
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    margin-bottom: 1rem;
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SubTitle = styled.h3`
    color: ${({ theme }) => theme.color.black};
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const Description = styled.span`
    color: ${({ theme }) => theme.color.black};
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
`;
