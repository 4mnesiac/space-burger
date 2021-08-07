import React, { FC } from 'react';
import s from './profile-orders.module.css';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { useLocation, Redirect } from 'react-router-dom';
import ProfileNav from 'components/profile-nav/profile-nav';
import OrderPreview from 'components/order-preview/order-preview';
import { useEffect } from 'react';
import wsActions from 'services/web-socket/wsActions';
import LoaderSpinner from 'components/loader/loader';
import { TLocationState } from 'types/types';

const ProfileOrders: FC = () => {
    const { isAuthorized } = useAppSelector(store => store.auth)
    const location = useLocation<TLocationState>();
    const dispatch = useAppDispatch();

    const {
        orders,
        wsConnected,
        hasError,
    } = useAppSelector((state) => state.userFeed);

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