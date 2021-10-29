import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from './../../models/Product';

interface ISimilarCount {
    id?: string;
    count?: number;
}

interface ShopingCartSliceState {
    count: number;
    products: IProduct[];
    similarCount: any;
}

const initialState: ShopingCartSliceState = {
    count: 0,
    products: [],
    similarCount: {}
}

const getSimilarCount = (array: IProduct[]) =>{
    const newArr = array.map(item =>item.id)
    let counts:any = {}
    newArr.forEach(function(x) {counts[x] = (counts[x] || 0)+1; })
    return counts
}

const shpingCartSlice = createSlice({
    name: 'shpingCart',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<IProduct[]>){
            state.products = action.payload
            state.count = state.products.length
            state.similarCount = getSimilarCount(state.products)
        },
        addProduct(state, action: PayloadAction<IProduct>){
            state.products.push(action.payload)
            state.count = state.products.length
            state.similarCount = getSimilarCount(state.products)
        },
        deleteProduct(state, action: PayloadAction<IProduct>){
            state.products = state.products.filter(item=>item.id !== action.payload.id)
            state.count = state.products.length
            state.similarCount = getSimilarCount(state.products)
        }
    }
})

export const { addProduct, deleteProduct, setProducts } = shpingCartSlice.actions
export default shpingCartSlice.reducer