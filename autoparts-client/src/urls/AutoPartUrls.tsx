import { AUTO_PARTS_URL } from "./urls";

const BASE_URL = AUTO_PARTS_URL+"/autoparts/";

export function AutoPartUrls() {
  const createAutoPartUrl = () => `${BASE_URL}`;
  const updateAutoPartUrl = (code: string) => `${BASE_URL}${code}/`;
  const deleteAutoPartUrl = (code: string) => `${BASE_URL}${code}/`;
  const getAutoPartUrl = (code: string) => `${BASE_URL}${code}/`;
  const listAutoPartsUrl = (page?: number, search?: string, categoryName?: string, criticalStock?: boolean) => {
    let url = BASE_URL;
    if (page !== undefined) {
      url += `?page=${page}`;
    }
    if (search !== undefined && search.trim() !== "") {
      url += `${url.includes("?") ? "&" : "?"}search=${encodeURIComponent(search)}`;
    }
    if (categoryName !== undefined && categoryName.trim() !== "") {
      url += `${url.includes("?") ? "&" : "?"}category_name=${encodeURIComponent(categoryName)}`;
    }
    if (criticalStock !== undefined) {
      url += `${url.includes("?") ? "&" : "?"}critical_stock=${criticalStock}`;
    }
    return url;
  };

  const exportAutoPartsUrl = () => `${BASE_URL}export/`;
  const importAutoPartsUrl = () => `${BASE_URL}import/`;

  return {
    createAutoPartUrl,
    updateAutoPartUrl,
    deleteAutoPartUrl,
    getAutoPartUrl,
    listAutoPartsUrl,
    exportAutoPartsUrl,
    importAutoPartsUrl
  };
}