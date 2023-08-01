import {
    ContentBox,
    ContentWrapper,
    Line,
    LogoImg,
    MainImg,
    NextButton,
    RoundTextBox,
    StatusBox,
    StatusWrapper,
    TopBox,
    TopWrapper,
} from "./CompleteSection.styled";
import { useRecoilState } from "recoil";
import { selectedItemState } from "@/recoils";

import { useNavigate } from "react-router-dom";
const LOGO_IMG = "/images/Logo.svg";
const HASH =
    "0x8975ab175c722b24875a3d2c8f5f2ded136f8c620696a82955e7e8f004c3be1e";
const EXPLORER_URL = `https://cronos.org/explorer/testnet3/tx/${HASH}`;

const CompleteSection = () => {
    const [selectedItem] = useRecoilState(selectedItemState);
    const navigate = useNavigate();

    const onClickNextButton = () => {
        navigate("/mypage");
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
                    <StatusBox className="prev-status">
                        유물 경매 <br /> 결과 확인
                    </StatusBox>
                    <Line />
                    <StatusBox className="current-status">
                        참가 증서 수령 <br /> (NFT)
                    </StatusBox>
                </StatusWrapper>
                <ContentBox>
                    <img src={selectedItem?.imgUrl} />
                    <a href={EXPLORER_URL} target="_blank">
                        {HASH}
                    </a>
                </ContentBox>
                <NextButton onClick={onClickNextButton}>다음 단계로</NextButton>
            </ContentWrapper>
        </>
    );
};

export default CompleteSection;
