import React from 'react';
import styles from './auth.module.css';
import { Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { login } from 'services/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from 'components/input/input';

const AuthPage = () => {
    const [form, setForm] = React.useState({ email: '', password: '' });
    const { isAuthorized } = useSelector(store => store.auth);
    const location = useLocation();

    const dispatch = useDispatch();
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        dispatch(login(form))
        setForm({ email: '', password: '' })
    }
    // возвращаем на предыдущую страницу, когда залогинимся
    if (isAuthorized) {
        console.log('in name ', location.state)
        const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Redirect to={from} />
        )
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Вход</h1>
                <CustomInput disabled={false} name="email" type="email" value={form.email} placeholder="E-mail" onChange={onChange} />
                <PasswordInput name="password" value={form.password} onChange={onChange} />
                <span className={styles.button}>
                    <Button>Войти</Button>
                </span>
            </form>
            <p className={styles.text}>
                Вы — новый пользователь?&nbsp;
                <Link className={styles.link} to={'/register'}>
                    Зарегистрироваться
                </Link>
            </p>
            <p className={styles.text}>
                Забыли пароль?&nbsp;
                <Link className={styles.link} to={'/forgot-password'}>
                    Восстановить пароль
                </Link>
            </p>
        </div>

    );
}

export default AuthPage;
