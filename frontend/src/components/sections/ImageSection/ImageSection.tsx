import React from "react";
import {
    ContentBox,
    MainImg,
    ImageSectionWrapper,
    Title,
    TagBox,
    PreventOverlapBox,
} from "./ImageSection.styled";

interface ImageSectionProps {
    imgUrl: string;
    tag: string;
    title: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imgUrl, tag, title }) => {
    return (
        <>
            <ImageSectionWrapper>
                <MainImg src={imgUrl} />

                <ContentBox>
                    <TagBox>{tag}</TagBox>
                    <Title>{title}</Title>
                </ContentBox>
            </ImageSectionWrapper>
            <PreventOverlapBox />
        </>
    );
};

export default ImageSection;
