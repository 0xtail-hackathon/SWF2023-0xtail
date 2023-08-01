import Routes from "@components/routes";
import styled from "styled-components";
import Footer from "./components/layouts/Footer/Footer";

function App() {
    return (
        <Main>
            <Routes />
            <Footer />
        </Main>
    );
}

const Main = styled.main`
    margin: auto;
    width: 90rem;
    min-height: 100vh;
    padding: 1.5rem 1.5rem 0 1.5rem;
    position: relative;
    box-shadow: ${({ theme }) => theme.boxShadow.style1};
    overflow: hidden;
`;

export default App;
