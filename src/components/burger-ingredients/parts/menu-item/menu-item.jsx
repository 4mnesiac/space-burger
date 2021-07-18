import React from 'react';
import styles from './menu-item.module.css'
import Card from '../card/card';
import PropTypes from 'prop-types';

const MenuItem = React.memo(({ title, refs, data, onClick }) => {
    return (
        <>
            <h2 className={styles.title} ref={refs}>{title}</h2>
            <ul className={styles.items}>
                {data && data.map(item => (
                    <li key={item._id}>
                        <Card item={item} onClick={onClick} />
                    </li>
                ))}
            </ul>
        </>
    )
}
);
export default MenuItem;
MenuItem.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    title: PropTypes.string.isRequired,
    refs: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}