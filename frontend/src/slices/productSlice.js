import { PRODUCTS_URL } from "../constant";
import {apiSlice} from "../slices/apiSlice"

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:() => ({
                url:PRODUCTS_URL
            })
        }),
        getProductsDetails:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/${productId}`
            })
        })
    })
});


export const {useGetProductsQuery,useGetProductsDetailsQuery} = productApiSlice;