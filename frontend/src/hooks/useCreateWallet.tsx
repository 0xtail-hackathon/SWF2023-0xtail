import { createWallet } from "@/apis";
import { KEYS } from "@/constants";
import { useMutation } from "react-query";

const useCreateWallet = (data: { userName: string }) => {
    return useMutation({
        mutationKey: [KEYS.QUERY_FUND_LIST, data.userName],
        mutationFn: () => createWallet({ data }),
    });
};

export default useCreateWallet;
