import { getFundList } from "@/apis";
import { KEYS } from "@/constants";
import { UseQueryResult, useQuery } from "react-query";

const useGetFundList = (
    heritageName: string
): UseQueryResult<ApiResponse<FundInfo[]>> => {
    return useQuery({
        queryKey: [KEYS.QUERY_FUND_LIST, heritageName],
        queryFn: () => getFundList({ heritageName }),
        enabled: !!heritageName,
    });
};

export default useGetFundList;
