import styled from "styled-components";

export const FundingSectionWrapper = styled.section`
    display: grid;
    grid-template-columns: 8fr 7fr;
    width: 100%;
    height: 35rem;
    margin: 2rem 0;
    gap: 2rem;
`;

/** Left Wrapper **/
export const LeftWrapper = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 5fr 3fr;
`;

export const FundingSuccessBox = styled.div`
    position: relative;
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 1.875rem;
    overflow: hidden;

    img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: ${({ theme }) => theme.zIndex.background};
        transition: 0.5s ease;
    }
    &:hover {
        cursor: pointer;
        img {
            transform: scale(1.1);
        }
    }
`;

export const FundingSuccessTextBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    gap: 1rem;
    padding: 3rem;

    // status icon box
    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 2.4375rem;
        width: 100%;
        h3 {
            padding: 0.5rem 1rem;
            border-radius: 1.84375rem;
            border: 1px solid ${({ theme }) => theme.color.white};
            color: ${({ theme }) => theme.color.white};
            font-size: 1.125rem;
            font-weight: ${({ theme }) => theme.fontWeight.regular};
        }
    }

    // text
    h1 {
        color: #fff;
        font-size: 1.875rem;
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        line-height: 3rem;
    }
`;

export const ParticipantsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 1rem;

    // title of box
    h3 {
        color: ${({ theme }) => theme.color.black};
        font-size: 1.25rem;
        font-weight: ${({ theme }) => theme.fontWeight.regular};
    }

    // profile box
    div {
        display: grid;
        grid-template-columns: repeat(6, 1fr);

        img {
            width: 6rem;
            height: 6rem;
            border-radius: 50%;
            border: 1px solid ${({ theme }) => theme.color.light};
            transition: 0.3s ease;

            &:hover {
                cursor: pointer;
                transform: scale(1.1);
            }
        }
    }
`;

/** Right Wrapper **/
export const RightWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
`;

export const HeritageBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;

    img {
        width: 7.625rem;
        height: 7.625rem;
        border-radius: 1.5625rem;
        transition: 0.3s ease;
    }
    &:hover {
        cursor: pointer;
        img {
            transform: scale(1.1);
        }
    }
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 0.5rem;

    h3 {
        display: inline-block;
        color: ${({ theme }) => theme.color.black};
        font-size: 1.25rem;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        /* margin-bottom: 1rem; */
    }
`;

export const DescriptionBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000;
    font-size: 1.25rem;
    gap: 0.5rem;
    padding-left: 0.5rem;
    /* margin-bottom: 0.5rem; */

    // property name
    h4 {
        display: inline-block;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }

    // splitter (|)
    div {
        width: 2px;
        height: 80%;
        background-color: ${({ theme }) => theme.color.black};
    }
    // property description
    span {
        display: inline-block;
        font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
`;
