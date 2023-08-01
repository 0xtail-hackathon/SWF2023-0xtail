import { sendFund } from "@/apis";
import { KEYS } from "@/constants";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const useSendFund = (data: FundInfo) => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: [KEYS.MUTATE_FUND_INFO, data.artifactName],
        mutationFn: () => sendFund({ data }),
        onSuccess: (result) => {
            console.log(result);
            navigate("./status");
        },
    });
};

export default useSendFund;
