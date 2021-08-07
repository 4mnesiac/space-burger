import React, { FC, FormEvent } from 'react';
import styles from '../register/register.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { forgotPassword } from 'services/slices/passwordSlice';
import { useLocation } from 'react-router-dom'
import { TLocationState } from 'types/types';

const ForgotPassword: FC = () => {
    const [email, setEmail] = React.useState<string>("");
    const dispatch = useAppDispatch();
    const location = useLocation<TLocationState>();
    const { isAuthorized } = useAppSelector(store => store.auth)
    const { isLoading } = useAppSelector(store => store.password)
    const hasConfirmation = localStorage.getItem('emailConfirmationSended');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const onSubmit = (e: FormEvent) => {
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