import styled from "styled-components";

export const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: ${({ theme }) => theme.heights.navbar};
    z-index: ${({ theme }) => theme.zIndex.navbar};
    position: relative;
    padding: 1rem 2rem;
`;

export const Logo = styled.img`
    height: 10rem;
    object-fit: contain;
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.logo};
`;

export const MenuBox = styled.div`
    width: 27rem;
    height: 4.75rem;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 2.38rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.5rem;
`;

export const Button = styled.button`
    border-radius: 1.84rem;
    height: 3.69rem;
    background-color: transparent;
    color: ${({ theme }) => theme.color.black};
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    padding: 0 1.5rem;
    transition: 0.3s ease;

    &.main-menu-button {
        &:hover {
            cursor: pointer;
            background: ${({ theme }) => theme.color.light};
        }

        &.active {
            background-color: ${({ theme }) => theme.color.black};
            color: ${({ theme }) => theme.color.white};
            &:hover {
                background: ${({ theme }) => theme.color.dark};
            }
        }
    }

    &.user-button {
        position: absolute;
        left: calc(100% - 14rem);
        /* transform: translateX(50%); */
        width: 13rem;
        background-color: ${({ theme }) => theme.color.black};
        color: ${({ theme }) => theme.color.white};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;

        &:hover {
            cursor: pointer;
            background: ${({ theme }) => theme.color.dark};
        }

        &.user-menu-open {
            /* background: ${({ theme }) => theme.color.lightGray};
            color: ${({ theme }) => theme.color.black}; */
        }
    }

    &.user-menu-button {
        width: 100%;
        height: 100%;
        border-radius: 0;

        &:hover {
            cursor: pointer;
            background: ${({ theme }) => theme.color.lightGray};
        }
    }
`;

export const UserMenu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: ${({ theme }) => theme.heights.navbar};
    left: calc(100% - 14rem);
    width: 12.9375rem;
    height: 8.0625rem;
    z-index: ${({ theme }) => theme.zIndex.modal};
    border-radius: 1.1875rem;
    background: ${({ theme }) => theme.color.white};
    box-shadow: ${({ theme }) => theme.boxShadow.style2};
    overflow: hidden;
    transition: 0.3s ease;
`;
