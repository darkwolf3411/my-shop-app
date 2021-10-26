import { useMemo } from 'react';
import { IProduct } from './../models/Product';

interface IFiltres {
    name?: string;
    search?: string;
    byPrice?: string;
    byName?: boolean;
    limit: number;
    page: number;
}
interface ResultUseFiltred {
    total: number;
    filtredArray: IProduct[];
}

const usePagination = (array: IProduct[], page_size: number, page_number:number) => {
    const getPagination = useMemo(() => {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }, [array, page_size, page_number]);
    return getPagination;
  };

export const useFiltredArray=(array: IProduct[] | undefined, filtres: IFiltres): ResultUseFiltred | undefined=>{
    if(array){
        const total = array.length
        const searchedArr = array.filter(item=>filtres.search?item.title == filtres.search:item)
        const filtredArray = usePagination(searchedArr,filtres.limit,filtres.page)
        return {total,filtredArray}
    }
}