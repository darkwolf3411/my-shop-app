import { IProduct } from './../models/Product';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

interface IQuery {
    limit: number;
    page: number;
}

interface ListResponse<T> {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: T[]
  }

export const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (build)=>({
        fetchAllProducts: build.query<IProduct[], IQuery>({
            query:({limit, page})=>({
                url: '/products',
                params: {
                    _limit: limit,
                    _page: page
                }
            })
        })
    })
})