import { USERS_URL } from "../constant";
import { apiSlice } from "../slices/apiSlice"


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
                credentials: "include",
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                body: data,
                credentials: "include",
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                credentials: "include",
            }),
        }),
    })
});


export const { useLoginMutation, useLogoutMutation, useProfileMutation } = userApiSlice;