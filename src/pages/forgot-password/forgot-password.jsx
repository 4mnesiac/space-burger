import React from 'react';
import styles from '../register/register.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from 'services/slices/passwordSlice';
import { useLocation } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthorized } = useSelector(store => store.auth)
    const { isLoading } = useSelector(store => store.password)
    const hasConfirmation = localStorage.getItem('emailConfirmationSended');

    const onChange = e => {
        setEmail(e.target.value);
    };
    const onSubmit = e => {
        e.preventDefault();
        dispatch(forgotPassword(email))
        setEmail("");
    }
    if (isAuthorized) {
        console.log('location state ', location.state)
        const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Redirect to={from} />
        )
    }

    if (!isLoading && hasConfirmation) return (<Redirect to={{ pathname: '/reset-password', state: { from: { pathname: '/forgot-password' } } }} />)
    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Восстановление пароля</h1>
                <Input
                    type="email"
                    placeholder="Укажите e-mail"
                    name="email"
                    value={email}
                    onChange={onChange}
                />

                <span className={styles.button}>
                    <Button>Восстановить</Button>
                </span>
            </form>
            <p className={styles.text}>
                Вспомнили пароль?&nbsp;
                <Link className={styles.link} to={'/login'}>
                    Войти
                </Link>
            </p>
        </div>
    );
}

export default ForgotPassword;