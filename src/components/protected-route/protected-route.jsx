import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// роут только для авторизованных пользователей
const ProtectedRoute = ({ children, ...rest }) => {
    const { name } = useSelector(store => store.auth.user);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return name ? (
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
