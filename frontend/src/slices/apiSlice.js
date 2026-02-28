<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constant"


const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' });

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({})
=======
import {createApi,fetchBaseQuery} from  "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constant"


const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,credentials: "include"});

export const apiSlice = createApi({
    baseQuery:baseQuery,
    endpoints:(builder)=>({})
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed
})

