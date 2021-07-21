import styles from './order-title.module.css';
import PropTypes from 'prop-types';


const OrderTitle = ({ name, status }) => {
    return (
        <section className={styles.header}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.status}>{status}</p>
        </section>
    );
}

export default OrderTitle;

OrderTitle.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}