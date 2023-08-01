import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

const Test = () => {
    const [artifacts, setArtifacts] = useState([]);
    const rtnArtifacts = useQuery({
        queryKey: [
            "ARTIFACTS", // 유니크한 키값
        ],
        queryFn: () => {
            // 요청할때 어떤걸 할지
            return axios.request({
                baseURL: "http://13.209.233.160:8080/v1",
                method: "get",
                url: "/artifacts",
            });
        },
    });
    useEffect(
        () => {
            if (
                rtnArtifacts.data &&
                rtnArtifacts.data.data.code === "SUCCESS"
            ) {
                setArtifacts(rtnArtifacts.data.data.data);
            }
        },
        [rtnArtifacts.isLoading] // 이 값이 바뀌면 위의 로직 다시 실행
    );

    const [wallet, setWallet] = useState(null);
    const rtnWallet = useQuery({
        queryKey: [
            "WALLET", // 유니크한 키값
        ],
        queryFn: () => {
            // 요청할때 어떤걸 할지
            return axios.request({
                baseURL: "http://13.209.233.160:8080/v1",
                method: "post",
                url: "/wallet/create",
                data: {
                    userName: Date.now().toString(),
                },
            });
        },
    });
    useEffect(
        () => {
            if (rtnWallet.data && rtnWallet.data.data.code === "SUCCESS") {
                setWallet(rtnWallet.data.data.data);
            }
        },
        [rtnWallet.isLoading] // 이 값이 바뀌면 위의 로직 다시 실행
    );

    const [crowdsale, setCrowdSale] = useState(null);
    const artifactName = "철제 은입사 화로";
    const rtnCrowdsale = useQuery({
        queryKey: [
            "CROWDSALE", // 유니크한 키값
        ],
        queryFn: () => {
            // 요청할때 어떤걸 할지
            return axios.request({
                baseURL: "http://13.209.233.160:8080/v1",
                method: "get",
                url: `/crowdsale/${artifactName}`,
            });
        },
    });
    useEffect(
        () => {
            if (
                rtnCrowdsale.data &&
                rtnCrowdsale.data.data.code === "SUCCESS"
            ) {
                setCrowdSale(rtnCrowdsale.data.data.data);
            }
        },
        [rtnCrowdsale.isLoading] // 이 값이 바뀌면 위의 로직 다시 실행
    );

    const [fundList, setFundList] = useState([]);
    const rtnFundList = useQuery({
        queryKey: [
            "FUNDLIST", // 유니크한 키값
        ],
        queryFn: () => {
            // 요청할때 어떤걸 할지
            return axios.request({
                baseURL: "http://13.209.233.160:8080/v1",
                method: "get",
                url: `/fund/${artifactName}`,
            });
        },
    });
    useEffect(
        () => {
            if (rtnFundList.data && rtnFundList.data.data.code === "SUCCESS") {
                setFundList(rtnFundList.data.data.data);
            }
        },
        [rtnFundList.isLoading] // 이 값이 바뀌면 위의 로직 다시 실행
    );

    const [sendFund, setSendFund] = useState([]);
    const rtnSendFund = useQuery({
        queryKey: [
            "SENDFUND", // 유니크한 키값
        ],
        queryFn: () => {
            // 요청할때 어떤걸 할지
            return axios.request({
                baseURL: "http://13.209.233.160:8080/v1",
                method: "post",
                url: `/fund/send`,
                data: {
                    userName: "tester1",
                    artifactName: artifactName,
                    amount: 10000,
                },
            });
        },
    });
    useEffect(
        () => {
            if (rtnSendFund.data && rtnSendFund.data.data.code === "SUCCESS") {
                setSendFund(rtnSendFund.data.data.data);
            }
        },
        [rtnSendFund.isLoading] // 이 값이 바뀌면 위의 로직 다시 실행
    );
    const handleOnClickButton1 = () => {
        console.log("유물 전체 리스트", artifacts);
    };

    const handleOnClickButton2 = () => {
        console.log("생성된 wallet", wallet);
    };

    const handleOnClickButton3 = () => {
        console.log("유물에 대한 크라우드 세일 정보", crowdsale);
    };

    const handleOnClickButton4 = () => {
        const totalValue = (crowdsale as unknown as Record<string, unknown>)
            .value as number;
        let currentValue = 0;

        for (const fund of fundList as Record<string, unknown>[]) {
            currentValue += fund.amount as number;
        }
        console.log("펀딩 전체 리스트", fundList);
        console.log("전체 펀딩 금액", totalValue);
        console.log("현재 펀딩 금액", currentValue);
    };

    const handleOnClickButton5 = () => {
        console.log("유물에 펀딩 하기", sendFund);
    };

    return (
        <Wrapper>
            <Button onClick={handleOnClickButton1}>
                전체 유물 리스트 조회
            </Button>
            <Button onClick={handleOnClickButton2}>wallet 생성</Button>
            <Button onClick={handleOnClickButton3}>
                유물의 크라우드 세일 정보 조회
            </Button>
            <Button onClick={handleOnClickButton4}>
                유물의 펀딩 정보 조회
            </Button>
            <Button onClick={handleOnClickButton5}>
                해당 유물 환수에 참가
            </Button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    gap: 1rem;
`;
const Button = styled.button`
    width: 10rem;
    height: 5rem;
    border: 1px solid black;
    border-radius: 1rem;
`;

export default Test;
