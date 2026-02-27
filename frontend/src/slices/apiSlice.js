import {createApi,fetchBaseQuery} from  "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constant"


const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,credentials: true});

export const apiSlice = createApi({
    baseQuery:baseQuery,
    endpoints:(builder)=>({})
})

