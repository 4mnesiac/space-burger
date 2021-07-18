import React from 'react';
import s from './profile.module.css';
import { useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import ProfileNav from 'components/profile-nav/profile-nav';
import ProfileForm from 'components/profile-form/profile-form';

const Profile = () => {
    const { isAuthorized } = useSelector(store => store.auth)
    const location = useLocation();

    if (!isAuthorized) {
        console.log('in name ', location.state)
        const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Redirect to={from} />
        )
    }

    return (
        <section className={s.wrapper}>
            <ProfileNav text='В этом разделе вы можете изменить свои персональные данные' />
            <ProfileForm />
        </section>
    );
}

export default Profile;