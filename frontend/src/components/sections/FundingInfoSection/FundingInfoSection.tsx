import {
    DescriptionBox,
    FundingSectionWrapper,
    FundingSuccessBox,
    FundingSuccessTextBox,
    HeritageBox,
    InfoBox,
    LeftWrapper,
    ParticipantsBox,
    RightWrapper,
} from "./FundingInfoSection.styled";
import { FUNDING_SUCCESS_IMG } from "./FundingInfoSection.data";
import { useRecoilState } from "recoil";
import { participantListState, selectedItemState } from "@/recoils";
import { useNavigate } from "react-router-dom";
import useGetHeritageList from "@/hooks/useGetHeritageList";
import Loading from "@/components/common/Loading/Loading";

interface FundingSectionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FundingSection: React.FC<FundingSectionProps> = ({ setIsModalOpen }) => {
    const [participantList] = useRecoilState(participantListState);
    const [, setSelectedItem] = useRecoilState(selectedItemState);
    const navigate = useNavigate();

    const heritageListResponse = useGetHeritageList();

    if (heritageListResponse.isLoading) return <Loading />;
    if (heritageListResponse.isError || !heritageListResponse.data?.data[0])
        return <>Error!</>;

    const heritageList = heritageListResponse.data.data.slice(1, 5);

    const handleOnClickSuccessBox = () => {
        navigate("/done");
    };

    const handleOnClickItemBox = (item: HERITAGE) => {
        setIsModalOpen(true);
        setSelectedItem(item);
        navigate(`/item/${item?.id}`);
    };

    return (
        <FundingSectionWrapper>
            <LeftWrapper>
                <FundingSuccessBox onClick={handleOnClickSuccessBox}>
                    <img src={FUNDING_SUCCESS_IMG} />
                    <FundingSuccessTextBox>
                        <div>
                            <h3>펀딩 성공</h3>
                        </div>
                        <h1>
                            다시 한국으로
                            <br />
                            돌아온 유물들을 확인해보세요.
                        </h1>
                    </FundingSuccessTextBox>
                </FundingSuccessBox>
                <ParticipantsBox>
                    <h3>최신 프로젝트 참여자</h3>
                    <div>
                        {participantList.map((participant) => (
                            <img
                                src={participant.profileUrl}
                                key={participant.username}
                            />
                        ))}
                    </div>
                </ParticipantsBox>
            </LeftWrapper>
            <RightWrapper>
                {heritageList.map((heritage) => (
                    <HeritageBox
                        key={heritage.id + heritage.name}
                        onClick={() => handleOnClickItemBox(heritage)}
                    >
                        <img src={heritage.imgUrl} />
                        <InfoBox>
                            <h3>{`#${heritage.id} ${heritage.name}`}</h3>
                            <DescriptionBox>
                                <h4>국적/시대</h4>
                                <div></div>
                                <span>{heritage.era}</span>
                            </DescriptionBox>
                            <DescriptionBox>
                                <h4>출토지</h4>
                                <div></div>
                                <span>{heritage.excavationLocation}</span>
                            </DescriptionBox>
                        </InfoBox>
                    </HeritageBox>
                ))}
            </RightWrapper>
        </FundingSectionWrapper>
    );
};

export default FundingSection;
