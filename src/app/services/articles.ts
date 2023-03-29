import { api } from './api'

export interface Article {
    id: string
    createdAt: Date | string
    name: string
    article: string
}

export interface ArticleParams {
    limit: number
    page: number
}
export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<Article[], ArticleParams>({
            query: payload => ({ url: `Article?page=${payload.page}&limit=${payload.limit}` }),
            providesTags: ( result = [] ) => [
                ...result.map(({id}) => ({ type: 'Articles', id } as const)),
                { type: 'Articles' as const, id: 'LIST' }
            ]
        })
    })
})

export const { useGetArticlesQuery } = articleApi
