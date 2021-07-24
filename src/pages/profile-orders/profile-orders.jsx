import React from 'react';
import s from './profile-orders.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import ProfileNav from 'components/profile-nav/profile-nav';
import OrderPreview from 'components/order-preview/order-preview';
import { useEffect } from 'react';
import wsActions from 'services/web-socket/wsActions';
import LoaderSpinner from 'components/loader/loader';

const ProfileOrders = () => {
    const { isAuthorized } = useSelector(store => store.auth)
    const location = useLocation();
    const dispatch = useDispatch();

    const {
        orders,
        wsConnected,
        hasError,
    } = useSelector((state) => state.userFeed);

    useEffect(() => {
        dispatch(wsActions.connect.wsConnectionInit('userFeed'));

        return () => {
            dispatch(wsActions.connect.wsConnectionClose());
        };
    }, [dispatch]);



    if (!isAuthorized) {
        console.log('in name ', location.state)
        const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Redirect to={from} />
        )
    }

    return (
        <>
            {!wsConnected && !hasError && <LoaderSpinner/>}
            {wsConnected && !hasError && (
                <section className={s.wrapper}>
                    <ProfileNav text='В этом разделе вы можете просмотреть свою историю заказов' />
                    <OrderPreview orders={orders} fullscreen />
                </section>
            )}
        </>
    );
}

export default ProfileOrders;