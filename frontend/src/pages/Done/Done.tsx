import ImageSection from "@/components/sections/ImageSection/ImageSection";
import { HistoryImgBox } from "./Done.styled";
import Header from "@/components/layouts/Header/Header";

const MAIN_IMG = "/images/FundingSuccess.svg";
const HISTORY_IMG = "/images/History.svg";
const TAG = "펀딩 성공";
const TITLE = `다시 한국으로 \n 돌아온 유물들을 확인해보세요.`;

const Done = () => {
    return (
        <>
            <Header />
            <ImageSection imgUrl={MAIN_IMG} tag={TAG} title={TITLE} />
            <HistoryImgBox>
                <img src={HISTORY_IMG} />
            </HistoryImgBox>
        </>
    );
};

export default Done;
