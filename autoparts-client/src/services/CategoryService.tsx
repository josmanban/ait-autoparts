import { CategoryUrls } from "../urls/CategoryUrls";
import RequestService from "./RequestService";
import { Category } from "../models/Category";

export default function CategorService() {
    const { listCategoriesUrl } = CategoryUrls();
    const { doGet } = RequestService();

    const listCategories = async (): Promise<Category[]> => {
        return await doGet(listCategoriesUrl());
    }

    return {
        listCategories
    };
}