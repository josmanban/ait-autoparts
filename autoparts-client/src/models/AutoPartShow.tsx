import { Provider } from "./Provider";
import { Brand } from "./Brand";
import { Category } from "./Category";

export interface AutoPartShow {
  code?: string;
  name: string;
  description: string;
  stock: number;
  min_stock: number;
  unit_price: number;
  category: Category;
  brand: Brand;
  provider: Provider;
  storage_location: string;
}