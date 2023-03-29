import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://63cedc05fdfe2764c72bd7c1.mockapi.io/api/v1/',
    prepareHeaders: headers => {
        headers.set('Accept', 'application/json')
        headers.set('Content-Type', 'application/json')
        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Comments', 'Articles'],
    endpoints: () => ({})
})