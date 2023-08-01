import React from "react";
import { ARROW_IMG, HERO_IMG } from "./HeroSection.data";
import {
    BottomBox,
    ContentBox,
    HeroImg,
    HeroSectionWrapper,
    LocationBox,
    Name,
    InfoBox,
    Title,
    SubTitle,
    Description,
    InfoWrapper,
    MiddleBox,
    ArrowIconImg,
} from "./HeroSection.styled";
import { selectedItemState } from "@/recoils/selectedItem.atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import useGetHeritageList from "@/hooks/useGetHeritageList";
import Loading from "@/components/common/Loading/Loading";

interface HeroSectionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setIsModalOpen }) => {
    const [, setSelectedItem] = useRecoilState(selectedItemState);
    const navigate = useNavigate();
    const heritageListResponse = useGetHeritageList();

    if (heritageListResponse.isLoading) return <Loading />;
    if (heritageListResponse.isError || !heritageListResponse.data?.data[0])
        return <>Error!</>;

    const firstItem = heritageListResponse.data.data[0];

    const handleOnClick = () => {
        setIsModalOpen(true);
        setSelectedItem(firstItem);
        navigate(`/item/${firstItem?.id}`);
    };

    return (
        <HeroSectionWrapper>
            <HeroImg src={HERO_IMG} />

            <ContentBox>
                <LocationBox>도쿄국립박물관 소재</LocationBox>
                <MiddleBox>
                    <Name>철제 은입사 화로</Name>
                    <ArrowIconImg
                        src={ARROW_IMG}
                        className="arrow-img"
                        onClick={handleOnClick}
                    />
                </MiddleBox>
                <BottomBox>
                    <Title>#{firstItem?.id} 국외 유물 환수 프로젝트</Title>
                    <InfoWrapper>
                        <InfoBox>
                            <SubTitle>국적/시대 |</SubTitle>
                            <Description>{firstItem?.era}</Description>
                        </InfoBox>
                        <InfoBox>
                            <SubTitle>분류 |</SubTitle>
                            <Description>{firstItem?.category}</Description>
                        </InfoBox>
                        <InfoBox>
                            <SubTitle>크기 |</SubTitle>
                            <Description>{firstItem?.size}</Description>
                        </InfoBox>
                        <InfoBox>
                            <SubTitle>소장품번호 |</SubTitle>
                            <Description>
                                {firstItem?.collectionNumber}
                            </Description>
                        </InfoBox>
                    </InfoWrapper>
                </BottomBox>
            </ContentBox>
        </HeroSectionWrapper>
    );
};

export default HeroSection;
