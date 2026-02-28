import { AutoPartUrls } from "../urls/AutoPartUrls";
import RequestService from "./RequestService";
import { AutoPart } from "../models/AutoPart";
import { AutoPartShow } from "../models/AutoPartShow";

export interface AutoPartPaginationResponse {
    results: AutoPartShow[];
    count: number;
    previous: string | null;
    next: string | null;
}

export interface AutoPartImportResponse {
    count: number;
    errors?: object;
    globals?: string[];
    fail: boolean;
}

export default function AutoPartService() {
    const {
        createAutoPartUrl,
        updateAutoPartUrl,
        deleteAutoPartUrl,
        getAutoPartUrl,
        listAutoPartsUrl,
        exportAutoPartsUrl,
        importAutoPartsUrl
    } = AutoPartUrls();

    const {
        doGet,
        doPost,
        doPut,
        doDelete,
        doPostFormData,
    } = RequestService();

    const getAutoPart = async (code: string): Promise<AutoPartShow> => {
        return await doGet(getAutoPartUrl(code));
    }

    const listAutoParts = async (page?: number, search?: string, categoryName?: string, criticalStock?: boolean): Promise<AutoPartPaginationResponse> => {
        return await doGet(listAutoPartsUrl(page, search, categoryName, criticalStock));
    }

    const createAutoPart = async (autoPart: AutoPart): Promise<AutoPartShow> => {
        return await doPost(createAutoPartUrl(), autoPart);
    }

    const updateAutoPart = async (code: string, autoPart: AutoPart): Promise<AutoPartShow> => {
        return await doPut(updateAutoPartUrl(code), autoPart);
    }

    const deleteAutoPart = async (code: string): Promise<void> => {
        await doDelete(deleteAutoPartUrl(code));
    }

    const exportAutoParts = async (): Promise<Blob> => {
        return await doGet(exportAutoPartsUrl(), { responseType: 'blob' });
    }

    const importAutoParts = async (file: File): Promise<AutoPartImportResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        return await doPostFormData(importAutoPartsUrl(), formData);
    }

    return {
        getAutoPart,
        listAutoParts,
        createAutoPart,
        updateAutoPart,
        deleteAutoPart,
        exportAutoParts,
        importAutoParts
    };
}