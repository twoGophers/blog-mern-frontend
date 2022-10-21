import React, { useState } from "react";
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "../../axios";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createComment } from "../../redux/slices/comment";
import { selectIsAuth } from "../../redux/slices/auth";

export const Index = () => {

  const [comment, setComment] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const userData = useSelector((state) => state.auth.data);
  const isAuth = useSelector(selectIsAuth);

  const handleSubmitComment = async () => {
    try {
      setLoading(true);

      const fields = {
        comment
      };

      const { data } =  await axios.post(`/posts/${id}/comments`, fields);
      const _id = data._id;
      navigate(`/posts/${_id}`);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <>
      <form onChange={(e) => e.preventDefault()}>
        <div className={styles.root}>
          { isAuth ? (
            <Avatar
              classes={{ root: styles.avatar }}
              src={`http://localhost:4444${userData.imageAvatar}`}
            />
            ) : (
              <Avatar
                classes={{ root: styles.avatar }}
                src="/noavatar.png'"
              />
            )}
          <div className={styles.form}>
            <TextField
              label="Написать комментарий"
              variant="outlined"
              maxRows={10}
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
            />
            <Button disabled={!isAuth}  onClick={ handleSubmitComment } type="submit" variant="contained">Отправить</Button>
            { !isAuth && (
              <p style={{ fontSize: '14px' }}>Комментарий может отправлять только зарегистрированный пользователь</p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
