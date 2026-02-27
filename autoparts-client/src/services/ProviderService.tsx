import { ProviderUrls } from "../urls/ProviderUrls";
import RequestService from "./RequestService";
import { Provider } from "../models/Provider";

export default function ProviderService() {
    const { listProvidersUrl } = ProviderUrls();
    const { doGet } = RequestService();

    const listProviders = async (): Promise<Provider[]> => {
        return await doGet(listProvidersUrl());
    }

    return {
        listProviders
    };
}