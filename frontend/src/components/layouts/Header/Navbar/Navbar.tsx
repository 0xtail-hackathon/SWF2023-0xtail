import { useMemo, useState } from "react";
import { MenuBox, Button, NavWrapper, UserMenu } from "./Navbar.styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/recoils/userInfo.atom";

const MENUS = ["Home", "About", "How it works"];

const Navbar = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [activeMenu, setActiveMenu] = useState("Home");
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const displayButton = useMemo(() => {
        if (!userInfo.username) setIsUserMenuOpen(false);
        return userInfo.username
            ? `Hi, ${userInfo.username}`
            : "Sign up | Login";
    }, [userInfo.username]);

    const navigate = useNavigate();

    const handleOnClickMenuButton = (menu: string) => {
        if (menu === "Home") {
            navigate("/");
        }
        setActiveMenu(menu);
    };

    const handleOnClickUserButton = () => {
        if (!userInfo?.username) navigate("/sign-in");
        setIsUserMenuOpen((prev) => !prev);
    };

    const handleOnClickMyPageButton = () => {
        navigate("/mypage");
    };
    const handleOnClickLogoutButton = () => {
        setUserInfo({
            username: "",
            profileUrl: "",
        });
    };

    return (
        <NavWrapper>
            <MenuBox>
                {MENUS.map((menu, index) => (
                    <Button
                        className={`main-menu-button ${
                            menu === activeMenu ? "active" : ""
                        }`}
                        onClick={() => handleOnClickMenuButton(menu)}
                        key={index + menu}
                    >
                        {menu}
                    </Button>
                ))}
            </MenuBox>
            <Button
                className={`user-button ${
                    isUserMenuOpen ? "user-menu-open" : ""
                }`}
                onClick={handleOnClickUserButton}
            >
                {displayButton}
            </Button>
            {isUserMenuOpen && (
                <UserMenu>
                    <Button
                        className="user-menu-button"
                        onClick={handleOnClickMyPageButton}
                    >
                        My Page
                    </Button>
                    <Button
                        className="user-menu-button"
                        onClick={handleOnClickLogoutButton}
                    >
                        Log Out
                    </Button>
                </UserMenu>
            )}
        </NavWrapper>
    );
};

export default Navbar;
