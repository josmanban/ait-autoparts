
'use client'

import ProviderService from "../services/ProviderService";
import { Provider } from "../models/Provider";

const useProvider = () => {
    const service = ProviderService();

    const listProviders = async (): Promise<Provider[]> => {
        return await service.listProviders();
    }
    
    return {
        listProviders
    };
}

export default useProvider;