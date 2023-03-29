import React, {useState} from 'react'
import {Alert, Box, Button, Divider, IconButton, Stack, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import {IComment, useDeleteCommentMutation, useEditCommentMutation, useGetCommentById} from "../../services/comments";


const CommentHeader = styled.div`
  background-color: gray;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: end;
  padding: 5px 10px;
`

export const Comment = (comment: IComment) => {
    const [ deleteComment, { isLoading: isDeleting } ] = useDeleteCommentMutation()
    const [ editComment] = useEditCommentMutation()
    const [showEdit, setShowEdit] = useState(false)

    const { comment: commentSelected} = useGetCommentById({id: comment.id, articleId: comment.ArticleId})
    const [editedComment, setEditedComment] = useState(commentSelected?.comment || '')

    function handleEditClick() {
        setShowEdit(true)
    }
    function handleSubmit() {
        setShowEdit(false)
        editComment({articleId: comment.ArticleId, id: comment.id, comment: editedComment})
    }

    return (
        <Box border="1px solid gray" margin="10px 0" key={comment.id}>
            {isDeleting && <Alert variant="filled" color="error">DELETING</Alert>}
            <CommentHeader>{comment.name}</CommentHeader>
            <Box padding="10px 5px" textAlign="left">{comment.comment}</Box>
            <Divider />
            {showEdit && <Stack direction="column" padding="10px">
                <TextField
                    id="commentEntry"
                    label="Comment"
                    multiline
                    maxRows={4}
                    onChange={e => setEditedComment(e.target.value)} value={editedComment} />
                <Stack direction="row" justifyContent="center" padding="5px 5px 0 5px">
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                </Stack>
            </Stack>}
            {!showEdit && <Stack width="100%" justifyContent="flex-end" flexDirection="row">
                <IconButton size="small" color="primary" onClick={handleEditClick}>
                    <EditIcon/>
                </IconButton>
                <IconButton size="small" color="error"
                            onClick={() => deleteComment({articleId: comment.ArticleId, id: comment.id})}>
                    <DeleteIcon/>
                </IconButton>
            </Stack>}
        </Box>
    )
}