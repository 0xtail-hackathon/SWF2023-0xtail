import Home from "@/pages/Home/Home";
import SignIn from "@/pages/SignIn/SignIn";
import Test from "@/pages/Test/Test";
import { Route, Routes } from "react-router-dom";
import SelectItemSection from "../sections/SelectItemSection/";
import ParticipantSection from "../sections/ParticipantSection/ParticipantSection";
import StatusSection from "../sections/StatusSection/StatusSection";
import Done from "@/pages/Done/Done";
import MyPage from "@/pages/Mypage/MyPage";
import CompleteSection from "../sections/CompleteSection/CompleteSection";

const BaseRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="/item/:itemId" element={<SelectItemSection />} />
                <Route
                    path="/item/:itemId/participant"
                    element={<ParticipantSection />}
                />
                <Route
                    path="/item/:itemId/participant/status"
                    element={<StatusSection />}
                />
                <Route
                    path="/item/:itemId/participant/status/success"
                    element={<StatusSection isSuccess={true} />}
                />
                <Route
                    path="/item/:itemId/generate/nft"
                    element={<CompleteSection />}
                />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/done" element={<Done />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
};

export default BaseRouter;
