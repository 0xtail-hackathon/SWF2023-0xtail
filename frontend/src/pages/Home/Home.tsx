import FundingInfoSection from "@/components/sections/FundingInfoSection";
import Modal from "@/components/common/Modal/Modal";
import HeroSection from "@/components/sections/HeroSection";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layouts/Header/Header";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Header />
            <HeroSection setIsModalOpen={setIsModalOpen} />
            <FundingInfoSection setIsModalOpen={setIsModalOpen} />

            {isModalOpen && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                >
                    <Outlet />
                </Modal>
            )}
        </>
    );
};

export default Home;
