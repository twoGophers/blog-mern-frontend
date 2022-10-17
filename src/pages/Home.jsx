import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Tabs, Typography, Grid } from '@mui/material';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, fetchPostsPopular } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const handleTabNew = () => {
    dispatch(fetchPosts());
  };

  const handleTabPopular = () => {
    dispatch(fetchPostsPopular());
  };

  return (
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
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
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
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
