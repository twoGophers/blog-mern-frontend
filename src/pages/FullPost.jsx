import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { getPostComments } from '../redux/slices/comment';
import { Comments } from '../components/Comments';

export const FullPost = () => {
  const [data, setData] = useState();
  const [comments, setComments] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  //Comment
  // const fetchComments = async () => {
  //   try {
  //     dispatch(getPostComments(id))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

console.log(comments);

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      {/* {
        comments?.map((comment, index) => (
          <CommentsBlock 
            key={comment.index}
            comment={comment}
            isLoading={isLoading}
          />
        )) 
      }       */}
      <Comments comments={comments} isLoading={false} >
       
      </Comments> 
      <Index />
    </>
  );
};
