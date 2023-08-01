import { HeaderWrapper, Logo } from "./Header.styled";
import Navbar from "./Navbar/";
const LOGO_IMG = "/images/Logo.svg";

const Header = () => {
    return (
        <HeaderWrapper>
            <Logo src={LOGO_IMG} />
            <Navbar />
        </HeaderWrapper>
    );
};

export default Header;
