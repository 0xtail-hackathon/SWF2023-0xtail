import styled from "styled-components";

export const ModalWrapper = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.modalBg};
    z-index: ${({ theme }) => theme.zIndex.modal};

    animation: slideUp 0.5s forwards;

    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slideDown {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(100%);
        }
    }
`;

export const TranslucentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1rem 1.5rem;
    height: 5.5rem;
`;
export const CloseButton = styled.img``;

export const MainWrapper = styled.div`
    position: relative;
    bottom: 0;
    overflow: hidden;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    background-color: ${({ theme }) => theme.color.white};
`;
