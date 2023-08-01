import {
    ContentWrapper,
    InputInnerBox,
    InputOuterBox,
    InputWrapper,
    Line,
    LogoImg,
    MainImg,
    NextButton,
    RoundTextBox,
    StatusBox,
    StatusWrapper,
    TopBox,
    TopWrapper,
} from "./ParticipantSection.styled";
import { useRecoilState } from "recoil";
import { selectedItemState, userInfoState } from "@/recoils";
import useSendFund from "@/hooks/useSendFund";
import { useRef } from "react";
const LOGO_IMG = "/images/Logo.svg";
const FUND_AMOUNT = 10000;

const ParticipantSection = () => {
    const [selectedItem] = useRecoilState(selectedItemState);
    const [userInfo] = useRecoilState(userInfoState);

    const inputRef = useRef<HTMLInputElement>(null);

    const sendFundMutation = useSendFund({
        amount: FUND_AMOUNT,
        userName: userInfo.username,
        artifactName: selectedItem?.name ?? "unknown",
    });

    const onClickMaxButton = () => {
        if (!inputRef?.current) return;
        inputRef.current.value = String(FUND_AMOUNT);
    };

    const onClickNextButton = async () => {
        if (!inputRef?.current?.value) return;
        sendFundMutation.mutate();
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
                    <StatusBox className="current-status">
                        참가 금액 <br /> 설정
                    </StatusBox>
                    <Line />
                    <StatusBox>
                        유물 경매 <br /> 결과 확인
                    </StatusBox>
                    <Line />
                    <StatusBox>
                        참가 증서 수령 <br /> (NFT)
                    </StatusBox>
                </StatusWrapper>
                <InputWrapper>
                    <h4>{`회원님의 최대 입력 가능 금액 : ${FUND_AMOUNT.toLocaleString()}원`}</h4>
                    <InputOuterBox>
                        <h3>참가 금액 설정</h3>
                        <InputInnerBox>
                            <input
                                type="number"
                                ref={inputRef}
                                placeholder="최소 참가 금액 : 10,000원"
                            />
                            <button onClick={onClickMaxButton}>Max</button>
                        </InputInnerBox>
                    </InputOuterBox>
                </InputWrapper>
                <NextButton onClick={onClickNextButton}>다음 단계로</NextButton>
            </ContentWrapper>
        </>
    );
};

export default ParticipantSection;
