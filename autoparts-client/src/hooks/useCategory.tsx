
'use client'

import CategoryService from "../services/CategoryService";
import { Category } from "../models/Category";

const useCategory = () => {
    const service = CategoryService();

    const listCategories = async (): Promise<Category[]> => {
        return await service.listCategories();
    }
    
    return {
        listCategories
    };
}

export default useCategory;