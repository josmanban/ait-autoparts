
'use client'

import BrandService from "../services/BrandService";
import { Brand } from "../models/Brand";

const useBrand = () => {
    const service = BrandService();

    const listBrands = async (): Promise<Brand[]> => {
        return await service.listBrands();
    }
    
    return {
        listBrands
    };
}

export default useBrand;