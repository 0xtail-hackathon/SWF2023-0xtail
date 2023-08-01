import { getHeritageList } from "@/apis";
import { KEYS } from "@/constants";
import { UseQueryResult, useQuery } from "react-query";

const useGetHeritageList = (): UseQueryResult<ApiResponse<HERITAGE[]>> => {
    return useQuery({
        queryKey: [KEYS.QUERY_FUND_LIST],
        queryFn: () => getHeritageList(),
    });
};

export default useGetHeritageList;
