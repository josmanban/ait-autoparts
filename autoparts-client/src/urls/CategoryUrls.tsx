import { idID } from "@mui/material/locale";
import { AUTO_PARTS_URL } from "./urls";

const BASE_URL = AUTO_PARTS_URL+"/categories";

export function CategoryUrls() {
    const listCategoriesUrl = () => {
        return BASE_URL;
    };

    const getCategoryUrl = (id: string) => {
        return `${BASE_URL}/${id}`;
    };

    return {
        listCategoriesUrl,
        getCategoryUrl
    };
}