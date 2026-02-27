import { idID } from "@mui/material/locale";
import { AUTO_PARTS_URL } from "./urls";

const BASE_URL = AUTO_PARTS_URL+"/brands";

export function BrandUrls() {
    const listBrandsUrl = () => {
        return BASE_URL;
    };

    const getBrandUrl = (id: string) => {
        return `${BASE_URL}/${id}`;
    };

    return {
        listBrandsUrl,
        getBrandUrl
    };
}