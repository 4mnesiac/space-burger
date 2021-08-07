import React, { FC, FormEvent } from 'react';
import styles from './reset-password.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { resetPassword } from 'services/slices/passwordSlice';
import { useEffect } from 'react';
import LoaderSpinner from 'components/loader/loader';


type TForm = {
    password: string;
    token: string;
}
const ResetPassword: FC = () => {
    const [form, setForm] = React.useState<TForm>({ password: '', token: '' });
    const [isVisible, setVisible] = React.useState<boolean>(false)
    const [error, setError] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { success, isLoading, hasError, errorMessage } = useAppSelector(store => store.password)

    useEffect(() => {
        setError(hasError)
    }, [hasError])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(false)
    };
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(resetPassword(form))
        setForm({ password: '', token: '' })
    }

    if (success) {
        localStorage.removeItem('emailConfirmationSended')
        return (<Redirect to={{ pathname: '/login' }} />)
    }
    return (
        <div className={styles.wrapper}>
            {isLoading && <LoaderSpinner />}
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Восстановление пароля</h1>

                <Input
                    type={isVisible ? 'text' : "password"}
                    placeholder="Введите новый пароль"
                    name="password"
                    icon={isVisible ? 'ShowIcon' : 'HideIcon'}
                    value={form.password}
                    onChange={onChange}
                    onIconClick={() => setVisible(!isVisible)}
                    error={error}
                    success={success}
                />
                <Input
                    type="text"
                    placeholder="Введите код из письма"
                    name="token"
                    value={form.token}
                    onChange={onChange}
                    error={error}
                    success={success}
                />
                {error && <span className={styles.error}>{errorMessage}</span>}
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

export default ResetPassword;