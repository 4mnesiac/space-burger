import ScrollContainer from 'components/scroll-container/scroll-container';
import styles from './order-content.module.css';
import { OrderItem } from '../index';
import PropTypes from 'prop-types';

const OrderContent = ({ingredients, price}) => {
    return ( 
        <>
        <h3 className={styles.ingredients_title}>Состав:</h3>
        <ScrollContainer height='312px'>
            <ul className={styles.list}>
                {ingredients.map((item, index) => (
                    <li className={styles.item} key={index}>
                        <OrderItem ingredient={item} price={price} />
                    </li>
                ))}
            </ul>
        </ScrollContainer>
        </>
     );
}

OrderContent.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        })).isRequired,
  price: PropTypes.number.isRequired
}
 
export default OrderContent;