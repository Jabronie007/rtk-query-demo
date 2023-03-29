import { api } from './api'

export interface IComment {
    id: string
    ArticleId: string
    createdAt: Date | string
    name: string
    comment: string
}

interface DeleteCommentProps {
    articleId: string
    id: string
}
interface EditCommentProps {
    articleId: string
    id: string
    comment: string
}

export const commentApi = api.injectEndpoints({
    endpoints: (build) => ({
        getComments: build.query<IComment[], string>({
            query: (articleId) => ({ url: `Article/${articleId}/Comment` }),
            providesTags: ( result = [] ) => [
                ...result.map(({id}) => ({ type: 'Comments', id } as const)),
                { type: 'Comments' as const, id: 'LIST' }
            ]
        }),
        deleteComment: build.mutation<void, DeleteCommentProps>({
            query: payload => ({
                url: `Article/${payload.articleId}/Comment/${payload.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: result => [{type: 'Comments', id: 'LIST'} ]
        }),
        editComment: build.mutation<void, EditCommentProps>({
            query: payload => ({
                url: `Article/${payload.articleId}/Comment/${payload.id}`,
                method: 'PUT',
                body: JSON.stringify({ comment: payload.comment })
            }),
            async onQueryStarted({articleId, id, comment}, {dispatch, queryFulfilled}){
                const result = dispatch(
                    commentApi.util.updateQueryData(
                        'getComments',
                        articleId,
                        (draft) => {
                            const commentDraft = draft?.find(_ => _.id === id)
                            if (commentDraft) commentDraft.comment = comment
                        }
                    )
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    alert('There was an error')
                    result.undo()
                }
            }
        })
    })
})

export const {
    useGetCommentsQuery,
    useDeleteCommentMutation,
    useEditCommentMutation,
} = commentApi

export function useGetCommentById({id, articleId}: {id: string; articleId: string}) {
    const {comment, isFetching} = commentApi.useGetCommentsQuery(articleId, {
        selectFromResult: ({data, isFetching}) => ({
            comment: data?.find(comment => comment.id === id),
            isFetching: isFetching
        }),
    })
    return {comment, isFetching}
}