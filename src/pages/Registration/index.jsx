import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import close from '../../assets/images/close-svgrepo-com.svg';
import axios from '../../axios';

import styles from './Login.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [ opacityPlus, setOpacityPlus ] = useState(false);
  const [imageAvatar, setImageAvatar] = useState('');
  const { register, handleSubmit, formState: { errors, isValid }} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      imageAvatar : imageAvatar
    },
    mode: 'onChange',
  });

  

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(values);
    if (!data.payload) {
      return alert('Не удалось регистрироваться!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/avatar', formData);
      setImageAvatar(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  const onClickRemoveImage = () => {
    setImageAvatar('');
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        {imageAvatar ? (
            <div className={styles.imgAvatar} style={{ backgroundImage: `url('http://localhost:4444${imageAvatar}')` }}>
              <div className={styles.close} onClick={() => onClickRemoveImage }>
                <img src={close} alt={close} srcset="" />
              </div>
            </div>
          ) : (
            <>
              <div onMouseOver={() => setOpacityPlus(true)} onMouseOut={() => setOpacityPlus(false)} className={styles.avatarBlock}>
                <Avatar onClick={() => inputFileRef.current.click()} sx={{ width: 100, height: 100 }} />
                <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                  <div className={styles.avatarAdd} style={ opacityPlus ? { display : 'none' } : { display: 'flex' } }></div> 
              </div>
            </>
          )
        }
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <p 
          {...register('imageAvatar')}
          name={imageAvatar}  
          hidden
          >{imageAvatar}</p>
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
