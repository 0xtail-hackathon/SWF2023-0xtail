import { getCrowdSaleInfo } from "@/apis";
import { KEYS } from "@/constants";
import { UseQueryResult, useQuery } from "react-query";

const useGetCrowdSaleInfo = (
    heritageName: string
): UseQueryResult<ApiResponse<CROWD_SALE_INFO>> => {
    return useQuery({
        queryKey: [KEYS.QUERY_CROWED_SALE_INFO, heritageName],
        queryFn: () => getCrowdSaleInfo({ heritageName }),
        enabled: !!heritageName,
    });
};

export default useGetCrowdSaleInfo;
