import { IProduct } from "./../models/Product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface IQuery {
  search?: string;
  limit: number;
  page: number;
}

interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}
interface IParameters {
  like?: string;
  gte?: number;
  lte?: number;
}

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (build) => ({
    fetchAllProducts: build.query<IProduct[], IParameters>({
      query: (params) => ({
        url: "/products",
        params: {
          title_like: params.like,
          price_gte: params.gte,
          price_lte: params.lte,
        },
      }),
    }),
    searchProucts: build.query<IProduct[], string>({
      query: () => ({
        url: "/products"
      }),
    }),
  }),
});
