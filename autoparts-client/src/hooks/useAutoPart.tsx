'use client'

import {AutoPartPaginationResponse} from "../services/AutoPartService";
import AutoPartService from "../services/AutoPartService";
import { AutoPart } from "../models/AutoPart";
import { AutoPartShow } from "../models/AutoPartShow";

import { AutoPartImportResponse } from "../services/AutoPartService";

const useAutoPart = () => {
    const service = AutoPartService();

    const getAutoPart = async (code:string): Promise<AutoPartShow> => {
        return await service.getAutoPart(code);
    }

    const listAutoParts = async (page?: number, search?: string, categoryName?: string, criticalStock?: boolean): Promise<AutoPartPaginationResponse> => {
        return await service.listAutoParts(page, search, categoryName, criticalStock);
    }

    const createAutoPart = async (autoPart: AutoPart): Promise<AutoPartShow> => {
        return await service.createAutoPart(autoPart);
    }

    const updateAutoPart = async (code: string, autoPart: AutoPart): Promise<AutoPartShow> => {
        return await service.updateAutoPart(code, autoPart);
    }

    const deleteAutoPart = async (code: string): Promise<void> => {
        await service.deleteAutoPart(code);
    }

    const exportAutoParts = async (): Promise<Blob> => {
        return await service.exportAutoParts();
    }

    const importAutoParts = async (file: File): Promise<AutoPartImportResponse> => {
        return await service.importAutoParts(file);
    }

    return {
        getAutoPart,
        listAutoParts,
        createAutoPart,
        updateAutoPart,
        deleteAutoPart,
        exportAutoParts,
        importAutoParts
    }
}

export default useAutoPart;