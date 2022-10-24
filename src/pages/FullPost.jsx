import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { getPostComments } from '../redux/slices/comment';
import { Comments } from '../components/Comments';
import { fetchOnePost, fetchOnePostComment } from '../redux/slices/posts';

export const FullPost = () => {
  // const [data, setData] = useState();
  // const [comments, setComments] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { posts, comment } = useSelector((state) => state.posts);

  const isLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchOnePost(id));
    dispatch(fetchOnePostComment(id));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }
  console.log(posts.items);
  return (
    <>
    {!isLoading ? (
      <>
        <Post
          id={posts.items._id}
          title={posts.items.title}
          imageUrl={posts.itemsimageUrl ? `http://localhost:4444${posts.items.imageUrl}` : ''}
          // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
          user={posts.items.user}
          createdAt={posts.items.createdAt}
          viewsCount={posts.items.viewsCount}
          commentsCount={posts.items.comments}

          tags={posts.items.tags}
          isFullPost>
        <ReactMarkdown children={posts.items.text} />
        </Post>
        <Comments comment={comment} isLoading={false}>
          <Index />
        </Comments>
      </>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
