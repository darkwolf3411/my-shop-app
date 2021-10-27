import { useMemo } from "react";
import { IProduct } from "../models/Product";

interface IFiltres {
  name?: string;
  search?: string;
  byPrice?: string;
  byName?: boolean;
  limit: number;
  page: number;
}

export const useProducts = (
  array: IProduct[] | undefined,
  limit: number,
  page: number
) => {
  const getProducts = useMemo(() => {
    const products = array?.slice((page - 1) * limit, page * limit);
    return products;
  }, [array, limit, page]);
  return getProducts;
};
