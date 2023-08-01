import React, { useState } from "react";
import styled from "styled-components";

interface FundingTimerProps {
    expiredDate: number; // Unix timestamp (in milliseconds)
}

const FundingTimer: React.FC<FundingTimerProps> = ({ expiredDate }) => {
    const [timeLeft] = useState(expiredDate * 1000 - Date.now());

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const newTimeLeft = expiredDate - Date.now();
    //         setTimeLeft(newTimeLeft);

    //         if (newTimeLeft <= 0) {
    //             clearInterval(interval);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [expiredDate]);

    const months = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 30)) ?? 0;
    const days = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 ?? 0)
    );
    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) ?? 0
    );

    return (
        <FundingTimerWrapper>
            <TextBox>
                <h3>Month</h3>
                <h2>{months}</h2>
            </TextBox>
            <TextBox>
                <h2>:</h2>
            </TextBox>
            <TextBox>
                <h3>Day</h3>
                <h2>{days}</h2>
            </TextBox>
            <TextBox>
                <h2>:</h2>
            </TextBox>
            <TextBox>
                <h3>Hour</h3>
                <h2>{hours}</h2>
            </TextBox>
        </FundingTimerWrapper>
    );
};

const FundingTimerWrapper = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr 4fr 1fr 4fr;
    align-items: center;
    padding: 1rem;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    color: ${({ theme }) => theme.color.black};

    h3 {
        display: inline-block;
        font-size: 1rem;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        line-height: 1rem;
    }

    h2 {
        display: inline-block;
        font-size: 4.375rem;
        font-weight: ${({ theme }) => theme.fontWeight.extraBold};
        line-height: 4.375rem;
    }
`;

export default FundingTimer;
