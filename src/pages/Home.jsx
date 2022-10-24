import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Tabs, Typography, Grid, CircularProgress } from '@mui/material';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, fetchPostsPopular } from '../redux/slices/posts';
import { fetchComments } from '../redux/slices/comment';


export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { comment } = useSelector((state) => state.comment);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comment.status === 'loading';
  

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  const handleTabNew = () => {
    dispatch(fetchPosts());
  };

  const handleTabPopular = () => {
    dispatch(fetchPostsPopular());
  };



  return (
    <> 
      {!isPostsLoading && !isTagsLoading && !isCommentsLoading ? 
        (
          <>
            <Tabs style={{ marginBottom: 15 }} value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="Новые" onClick={handleTabNew} />
        <Tab label="Популярные" onClick={handleTabPopular} />
            </Tabs>
            <Grid container spacing={4}>
              <Grid xs={8} item>
                  <Box>
                    {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                      isPostsLoading ? (
                        <Post key={index} isLoading={true} />
                      ) : (
                        <Post
                          key={index}
                          id={obj._id}
                          title={obj.title}
                          imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                          user={obj.user}
                          createdAt={obj.createdAt}
                          viewsCount={obj.viewsCount}
                          commentsCount={obj.comments}
                          tags={obj.tags}
                          isEditable={userData?._id === obj.user._id}
                        />
                      ),
                    )}
                  </Box> 
              </Grid>
              <Grid xs={4} item>
                <TagsBlock items={tags.items} isLoading={isTagsLoading} />
                <CommentsBlock
                  comment={comment}
                  isLoading={isCommentsLoading}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )
      }
    </>
  );
};
