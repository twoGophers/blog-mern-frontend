import React, { useState } from "react";
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "../../axios";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createComment } from "../../redux/slices/comment";

export const Index = () => {

  const [comment, setComment] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

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
      <form>
        <div className={styles.root}>
          <Avatar
            classes={{ root: styles.avatar }}
            src="https://mui.com/static/images/avatar/5.jpg"
          />
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
            <Button onClick={ handleSubmitComment } type="submit" variant="contained">Отправить</Button>
          </div>
        </div>
      </form>
    </>
  );
};
