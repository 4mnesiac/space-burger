import ScrollContainer from 'components/scroll-container/scroll-container';
import styles from './order-content.module.css';
import { OrderItem } from '../index';
import PropTypes from 'prop-types';


const OrderContent = ({ingredients}) => {
    // подсчет количества
    // const count = ingredients.reduce((acc, el) => {
    //     return acc[el.name] ? acc[el.name]++ : acc[el.name] = 1, acc;
    // }, {})

    return ( 
        <>
        <h3 className={styles.ingredients_title}>Состав:</h3>
        <ScrollContainer height='300px'>
            <ul className={styles.list}>
                {ingredients.map((item, index) => (
                    <li className={styles.item} key={index}>
                        <OrderItem ingredient={item} price={item.price} />
                    </li>
                ))}
            </ul>
        </ScrollContainer>
        </>
     );
}


 
export default OrderContent;

OrderContent.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
    }).isRequired).isRequired
  }