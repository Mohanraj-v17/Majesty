import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './slices/apiSlice'
import cartSliceReducer from "./slices/cartSlice"
import  toggletheme from '../../../Redux/redux/src/features/theme/darkSlice';
import authSliceReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart:cartSliceReducer,
    theme:toggletheme,
    auth:authSliceReducer

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;