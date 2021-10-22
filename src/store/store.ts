import { productAPI } from './../services/ProductServices';
import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [productAPI.reducerPath]: productAPI.reducer
})

export const setupStore = () => {
  return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware)=>
      getDefaultMiddleware().concat(productAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']