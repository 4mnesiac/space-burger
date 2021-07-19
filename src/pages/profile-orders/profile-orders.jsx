import React from 'react';
import s from './profile-orders.module.css';
import { useSelector } from 'react-redux';
import {useLocation, Redirect} from 'react-router-dom';
import ProfileNav from 'components/profile-nav/profile-nav';
import OrderPreview from 'components/order-preview/order-preview';

const ProfileOrders = () => {
    const { isAuthorized } = useSelector(store => store.auth)
    const location = useLocation();
    
    if (!isAuthorized) {
        console.log('in name ', location.state)
        const { from } = location.state || {from: { pathname: '/'}}
        return (
            <Redirect to={from} />
        )        
    }

    return (
        <section className={s.wrapper}>
            <ProfileNav text='В этом разделе вы можете просмотреть свою историю заказов'/>
            <OrderPreview />
        </section>
    );
}

export default ProfileOrders;