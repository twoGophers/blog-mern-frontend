import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchPostsPopular = createAsyncThunk('posts/fetchPostsPopular', async () => {
  const { data } = await axios.get('/posts/popular');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchTagsFilter = createAsyncThunk('posts/fetchTagsFilter', async (params) => {
  const { data } = await axios.get(`/tags/${params}`);
  return data;
});


export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`),
);

export const fetchOnePost = createAsyncThunk('posts/fetchOnePost', async (id) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
});

export const fetchOnePostComment = createAsyncThunk('posts/fetchOnePostComment', async (id) => {
  const { data } = await axios.get(`/posts/${id}/comments`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comment: {
    items: [],
    status: 'loading',
  }
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    [fetchPostsPopular.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsPopular.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsPopular.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    [fetchOnePost.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchOnePost.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchOnePost.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    // Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },

    // Получение комментов
    [fetchOnePostComment.pending]: (state) => {
      state.comment.items = [];
      state.comment.status = 'loading';
    },
    [fetchOnePostComment.fulfilled]: (state, action) => {
      state.comment.items = action.payload;
      state.comment.status = 'loaded';
    },
    [fetchOnePostComment.rejected]: (state) => {
      state.comment.items = [];
      state.comment.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
