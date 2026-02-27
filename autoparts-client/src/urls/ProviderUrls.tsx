import { idID } from "@mui/material/locale";
import { AUTO_PARTS_URL } from "./urls";

const BASE_URL = AUTO_PARTS_URL+"/providers";

export function ProviderUrls() {
    const listProvidersUrl = () => {
        return BASE_URL;
    };

    const getProviderUrl = (id: string) => {
        return `${BASE_URL}/${id}`;
    };

    return {
        listProvidersUrl,
        getProviderUrl
    };
}