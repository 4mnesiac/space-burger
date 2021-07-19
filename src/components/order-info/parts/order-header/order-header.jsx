import styles from './order-header.module.css';
import PropTypes from 'prop-types';


const OrderHeader = ({ id, name, status }) => {
    return (
        <header className={styles.header}>
            <p className={styles.id}>#{id}</p>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.status}>{status}</p>
        </header>
    );
}

export default OrderHeader;

OrderHeader.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}