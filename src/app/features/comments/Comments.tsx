import React, {useState} from 'react'
import {useAddCommentMutation, useGetCommentsQuery} from "../../services/comments";
import {Button, Stack, TextField} from "@mui/material";
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
    const [addComment] = useAddCommentMutation()

    const [showAddComment, setShowAddComment] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [newName, setNewName] = useState('')

    function handleAddClick() {
        setNewComment('')
        setNewName('')
        setShowAddComment(true)
    }

    function handleSubmit() {
        addComment({ ArticleId: articleId, comment: newComment, name: newName})
    }
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
                <Button onClick={handleAddClick}>Add Comments</Button>
                <Button onClick={() => setShowComments(true)}>View Comments</Button>
            </ArticleFooter>
            {showAddComment && <Stack direction="column" padding="10px" spacing={2}>
                <TextField
                    id="newNameEntry"
                    label="Name"
                    onChange={e => setNewName(e.target.value)} value={newName} />
                <TextField
                    id="newCommentEntry"
                    label="Comment"
                    multiline
                    maxRows={4}
                    onChange={e => setNewComment(e.target.value)} value={newComment} />
                <Stack direction="row" justifyContent="center" padding="5px 5px 0 5px">
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => setShowAddComment(false)}>Cancel</Button>
                </Stack>
            </Stack>}
            {renderComments()}
        </Stack>
    )
}