import React, { useState } from "react";
import styled from "styled-components";

interface FundingProgress {
    current: number;
    total: number;
}

const FundingProgress: React.FC<FundingProgress> = ({ current, total }) => {
    const [progress] = useState((current / total) * 100);

    return (
        <>
            <ProgressBarContainer>
                <ProgressBarBox>
                    <ProgressBar progress={progress} />
                    <ProgressBar className="filled" progress={progress} />
                </ProgressBarBox>
                <Pointer progress={progress} />
                <Value>{current.toLocaleString()}</Value>
                <Value className="total">{`/${total.toLocaleString()}`}</Value>
            </ProgressBarContainer>
            {/* <button onClick={increaseProgress}>Increase Progress</button> */}
        </>
    );
};

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
`;

const ProgressBarBox = styled.div`
    position: relative;
    width: 100%;
    height: 1rem;
    margin-top: 1rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
    position: relative;
    height: 100%;
    width: 100%;
    background: #d9d9d9;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;

    &.filled {
        position: absolute;
        top: 0;
        width: ${({ progress }) => progress}%;
        background-color: black;
    }
`;

const Pointer = styled.div<{ progress: number }>`
    position: absolute;
    top: -0.5rem;
    width: 0;
    height: 0;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
    border-top: 0.6rem solid black;
    display: inline-block;
    left: calc(${({ progress }) => progress}% - 0.4rem);
`;

const Value = styled.h2`
    color: ${({ theme }) => theme.color.black};
    font-size: 3.125rem;
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    text-align: right;

    &.total {
        color: #bcbcbc;
    }
`;

export default FundingProgress;
