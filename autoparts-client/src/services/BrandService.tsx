import { BrandUrls } from "../urls/BrandUrls";
import RequestService from "./RequestService";
import { Brand } from "../models/Brand";

export default function BrandService() {
    const { listBrandsUrl } = BrandUrls();
    const { doGet } = RequestService();

    const listBrands = async (): Promise<Brand[]> => {
        return await doGet(listBrandsUrl());
    }

    return {
        listBrands
    };
}