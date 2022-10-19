import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    comment: {
        items: [],
        status: 'loading',
    }
};

export const createComment = createAsyncThunk('comment/createComment', async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, {
                postId,
                comment,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
);

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
        try {
            const { data } = await axios.get(`/posts/${postId}/comments`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
);

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
    const { data } = await axios.get('/comments');
    return data;
});

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание поста
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comment.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },

    // Получение тегов
        [fetchComments.pending]: (state) => {
            state.comment.items = [];
            state.comment.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comment.items = action.payload;
            state.comment.status = 'loaded';
        },
        [fetchComments.rejected]: (state) => {
            state.comment.items = [];
            state.comment.status = 'error';
        },
    },
})

export const commentReducer =  commentSlice.reducer