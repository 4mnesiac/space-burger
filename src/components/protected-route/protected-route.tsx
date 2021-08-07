import { useAppSelector } from 'services/hooks';
import { Route, Redirect } from 'react-router-dom';
import {FC} from 'react';
import { TProtectedHOC } from 'types/types';
// роут только для авторизованных пользователей

const ProtectedRoute: FC<TProtectedHOC> = ({ children, ...rest }) => {
    const { isAuthorized } = useAppSelector(store => store.auth);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuthorized ? (
                    children
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />
                );
            }
            }
        />
    );
};

export default ProtectedRoute;

