import { PreventOverlapBox } from "@/components/layouts/Footer/Footer.styled";
import {
    CloseButton,
    MainWrapper,
    ModalWrapper,
    TranslucentBox,
} from "./Modal.styled";
import { useNavigate } from "react-router-dom";

const CLOSE_ICON = "/images/CloseIcon.svg";

interface ModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen?: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ setIsModalOpen, children }) => {
    const navigate = useNavigate();
    const handleOnClickCloseButton = () => {
        setIsModalOpen(false);
        navigate("/");
    };

    return (
        <>
            <ModalWrapper>
                <TranslucentBox>
                    <CloseButton
                        src={CLOSE_ICON}
                        onClick={handleOnClickCloseButton}
                    />
                </TranslucentBox>
                <MainWrapper>{children}</MainWrapper>
            </ModalWrapper>
            <PreventOverlapBox />
        </>
    );
};

export default Modal;
