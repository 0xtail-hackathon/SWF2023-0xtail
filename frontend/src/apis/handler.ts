import { serverInstance } from "./instance";

export function getHeritageList() {
    return serverInstance({
        method: "get",
        url: "/artifacts",
    });
}

interface CreateWalletParams {
    data: {
        userName: string;
    };
}
export function createWallet({ data }: CreateWalletParams) {
    return serverInstance({
        method: "post",
        url: "/wallet/create",
        data,
    });
}

interface GetCrowdSaleInfoParams {
    heritageName: string;
}
export function getCrowdSaleInfo({ heritageName }: GetCrowdSaleInfoParams) {
    return serverInstance({
        method: "get",
        url: `/crowdsale/${heritageName}`,
    });
}

interface GetFundListParams {
    heritageName: string;
}
export function getFundList({ heritageName }: GetFundListParams) {
    return serverInstance({
        method: "get",
        url: `/fund/${heritageName}`,
    });
}

interface SetFundParams {
    data: {
        userName: string;
        artifactName: string;
        amount: number;
    };
}
export function sendFund({ data }: SetFundParams) {
    return serverInstance({
        method: "get",
        url: `/fund/send`,
        data,
    });
}
