import {
    ContentBox,
    ContentWrapper,
    DescriptionBox,
    FundingButtonBox,
    LeftBox,
    LogoImg,
    MainImg,
    MapBox,
    ParticipantsBox,
    RightBox,
    RoundTextBox,
    TopBox,
    TopWrapper,
} from "./SelectItemSection.styled";
import FundingTimer from "./FundingTimer";
import FundingProgress from "./FundingProgress";
import { useRecoilState } from "recoil";
import { participantListState, selectedItemState } from "@/recoils";
import { useNavigate } from "react-router-dom";
import useGetCrowdSaleInfo from "@/hooks/useGetCrowdSaleInfo";
import useGetFundList from "@/hooks/useGetFundList";
const LOGO_IMG = "/images/Logo.svg";
const MAP_IMG = "/images/Map_Screenshot.svg";
const BALANCE = 1000000;

const SelectItemSection = () => {
    const [selectedItem] = useRecoilState(selectedItemState);
    const [participantList] = useRecoilState(participantListState);
    const navigate = useNavigate();

    const crowdSaleInfoResponse = useGetCrowdSaleInfo(selectedItem?.name || "");
    const fundListResponse = useGetFundList(selectedItem?.name || "");

    if (crowdSaleInfoResponse.isLoading || fundListResponse.isLoading) return;
    if (
        crowdSaleInfoResponse.isError ||
        !crowdSaleInfoResponse.data?.data ||
        fundListResponse.isError ||
        !fundListResponse.data?.data
    )
        return;

    const crowdSaleInfo = crowdSaleInfoResponse.data.data;
    const fundList = fundListResponse.data.data;
    const sumFund = fundList
        .map((fund) => fund.amount)
        .reduce((prev, current) => prev + current, 0);

    const handleOnClickParticipantButton = () => {
        navigate("./participant");
        window.scrollTo(0, 0);
    };
    return (
        <>
            <TopWrapper>
                <MainImg src={selectedItem?.imgUrlReq} />
                <TopBox>
                    <LogoImg src={LOGO_IMG} />
                    <RoundTextBox>
                        {selectedItem?.currentLocation ?? "소재지 알수없음"}
                    </RoundTextBox>
                    <RoundTextBox>{"펀딩 중"}</RoundTextBox>
                </TopBox>
            </TopWrapper>
            <ContentWrapper>
                <LeftBox>
                    <DescriptionBox>
                        <h2>{`#${
                            selectedItem?.id ?? "0"
                        } 국외 유물 환수 프로젝트`}</h2>
                        <h1>{selectedItem?.name ?? "알수없음"}</h1>
                        <p>{selectedItem?.description ?? "내용 없음"}</p>
                    </DescriptionBox>
                    <MapBox>
                        <h3>{`해당 유물 현재 소유지: ${
                            selectedItem?.currentLocation ?? "알수없음"
                        }`}</h3>
                        <img src={MAP_IMG} alt="" />
                    </MapBox>
                </LeftBox>
                <RightBox>
                    <ContentBox>
                        <h3>Funding Timer</h3>
                        <FundingTimer
                            expiredDate={Number(crowdSaleInfo.expiredDate)}
                        />
                    </ContentBox>
                    <ContentBox>
                        <h3>Funding Progress</h3>
                        <FundingProgress
                            current={sumFund}
                            total={Number(crowdSaleInfo.value)}
                        />
                    </ContentBox>
                    <ContentBox>
                        <h3>Funding 참가</h3>
                        <FundingButtonBox>
                            <h4>{`현재 보유 금액: ${BALANCE.toLocaleString()}원`}</h4>
                            <button onClick={handleOnClickParticipantButton}>
                                해당 유물 환수에 참가
                            </button>
                        </FundingButtonBox>
                        <span>
                            *이 금액은 펀딩 실패 혹은 경매 낙찰이 실패되면 다시
                            전액 환불됩니다.
                        </span>
                    </ContentBox>
                    <ContentBox>
                        <h3>펀딩 참여자</h3>
                        <ParticipantsBox>
                            {participantList.slice(0, 4).map((participant) => (
                                <img
                                    src={participant.profileUrl}
                                    key={participant.username}
                                />
                            ))}
                        </ParticipantsBox>
                    </ContentBox>
                </RightBox>
            </ContentWrapper>
        </>
    );
};

export default SelectItemSection;
