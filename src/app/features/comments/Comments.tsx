import React, {useState} from 'react'
import {useGetCommentsQuery} from "../../services/comments";
import {Button, Stack} from "@mui/material";
import styled from "@emotion/styled";
import {Comment} from "./Comment";

const ArticleFooter = styled.div`
  display: flex;
  justify-content: end;
  padding: 5px 20px;
`

export const Comments = ({ articleId }: { articleId: string }) => {
    const [showComments, setShowComments] = useState(false)
    const { data: comments, isLoading } = useGetCommentsQuery(articleId, { skip: !showComments})

    const renderComments = () => {
        if (!showComments) return null

        if (isLoading) return <div>...Loading</div>

        return (
            <Stack direction="column" fontSize="14px" width="90%" alignSelf="center">
                {comments?.map(comment => (
                    <Comment {...comment} key={comment.id} />
                ))}
            </Stack>
        )
    }

    return (
        <Stack direction="column">
            <ArticleFooter>
                <Button onClick={() => setShowComments(true)}>View Comments</Button>
            </ArticleFooter>
            {renderComments()}
        </Stack>
    )
}