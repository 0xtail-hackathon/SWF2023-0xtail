import {
    BottomBox,
    ContentBox,
    ContentWrapper,
    Line,
    LogoImg,
    MainImg,
    NextButton,
    RoundTextBox,
    StatusBox,
    StatusWrapper,
    TagBox,
    TopBox,
    TopWrapper,
} from "./StatusSection.styled";
import { useRecoilState } from "recoil";
import { selectedItemState } from "@/recoils";

import { useNavigate } from "react-router-dom";
const LOGO_IMG = "/images/Logo.svg";
const SOTHEBYS_IMG = "/images/Sothebys.svg";

interface StatusSectionProps {
    isSuccess?: boolean;
}

const StatusSection: React.FC<StatusSectionProps> = ({ isSuccess }) => {
    const [selectedItem] = useRecoilState(selectedItemState);
    const tagDisplay = isSuccess ? "경매 성공" : "경매 입찰중";
    const navigate = useNavigate();

    const onClickNextButton = () => {
        if (isSuccess) {
            navigate(`/item/${selectedItem?.id}/generate/nft`);
            window.scrollTo(0, 0);
        } else {
            navigate("./success");
            window.scrollTo(0, 0);
        }
    };
    return (
        <>
            <TopWrapper>
                <MainImg src={selectedItem?.imgUrl} />
                <TopBox>
                    <LogoImg src={LOGO_IMG} />
                    <RoundTextBox>
                        {selectedItem?.currentLocation ?? "소재지 알수없음"}
                    </RoundTextBox>
                    <RoundTextBox>{"펀딩 중"}</RoundTextBox>
                    <h1>{selectedItem?.name ?? "알수없음"}</h1>
                </TopBox>
            </TopWrapper>
            <ContentWrapper>
                <StatusWrapper>
                    <StatusBox className="prev-status">
                        참가 금액 <br /> 설정
                    </StatusBox>
                    <Line className="solid" />
                    <StatusBox className="current-status">
                        유물 경매 <br /> 결과 확인
                    </StatusBox>
                    <Line />
                    <StatusBox>
                        참가 증서 수령 <br /> (NFT)
                    </StatusBox>
                </StatusWrapper>
                <ContentBox>
                    <img src={SOTHEBYS_IMG} />
                    <h3>{`경매 ID. D32k_456 | ${
                        selectedItem?.name ?? "알수없음"
                    }`}</h3>
                    <BottomBox>
                        <h2>Sothebys 경매</h2>
                        <TagBox className={isSuccess ? "success" : ""}>
                            {tagDisplay}
                        </TagBox>
                    </BottomBox>
                </ContentBox>
                <NextButton onClick={onClickNextButton}>다음 단계로</NextButton>
            </ContentWrapper>
        </>
    );
};

export default StatusSection;
