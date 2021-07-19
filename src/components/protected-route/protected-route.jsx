import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// роут только для авторизованных пользователей
const ProtectedRoute = ({ children, ...rest }) => {
    const { isAuthorized } = useSelector(store => store.auth);

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

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired
}
