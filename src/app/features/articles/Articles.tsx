import { useGetArticlesQuery } from "../../services/articles";
import React, {useState} from "react";
import Paper from "@mui/material/Paper"
import {Box, Button, Divider, Stack} from "@mui/material";

import styled from "@emotion/styled";
import {Comments} from "../comments/Comments";

const AuthorHeader = styled.div`
  background-color: #61dafb;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: end;
  padding: 5px 10px;
`

const ArticleContent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  padding: 20px;
`
export const Articles = () => {
    const [page, setPage] = useState(1)
    const { data: articles, isLoading, refetch } = useGetArticlesQuery({page: page, limit: 25})

    if (isLoading) return <>Loading</>
    if (!articles) return <>No articles</>

    return <Box width="75%">
        {articles.map((article) => (
            <Paper elevation={1} sx={{margin: "15px"}} key={article.id}>
                <AuthorHeader>{article.name}</AuthorHeader>
                <ArticleContent>{article.article}</ArticleContent>
                <Divider />
                <Comments articleId={article.id} />
            </Paper>))}
        <Stack direction="row" justifyContent="flex-end" margin="10px 15px">
            <Button onClick={() => setPage(1)}>Page 1</Button>
            <Button onClick={() => setPage(2)}>Page 2</Button>
            <Button onClick={refetch}>Refetch Data</Button>
        </Stack>
    </Box>
}