import Header from "@/components/layouts/Header/Header";
import ImageSection from "@/components/sections/ImageSection/ImageSection";
import { ContentImgBox } from "./MyPage.styled";

const MAIN_IMG = "/images/Mypage_main_img.svg";
const CONTENT_IMG = "/images/Mypage.svg";
const TAG = "My Page";
const TITLE = `내가 참가해서 \n 다시 고향으로 돌아온 유물들을 확인해보세요.`;

const MyPage = () => {
    return (
        <>
            <Header />
            <ImageSection imgUrl={MAIN_IMG} tag={TAG} title={TITLE} />
            <ContentImgBox>
                <img src={CONTENT_IMG} alt="" />
            </ContentImgBox>
        </>
    );
};

export default MyPage;
