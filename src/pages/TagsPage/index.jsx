
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Post } from '../../components/Post';
import { fetchTagsFilter } from '../../redux/slices/posts';


export const TagsPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  
  useEffect(() => {
    dispatch(fetchTagsFilter(id));
  }, []);

  return (
    <>
    <h3 style={{ fontSize: '32px', textTransform: 'capitalize' }}>#{id}</h3>
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
                imageUrl={obj.imageUrl ? `${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                imageAvatar={obj.imageAvatar}
              />
            ),
          )}
        </Box> 
      </Grid>
    </>
  )
}
