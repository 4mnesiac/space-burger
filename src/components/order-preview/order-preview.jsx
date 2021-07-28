import PropTypes from "prop-types";
import styles from './order-preview.module.css';
import FeedCard from 'components/feed-card/feed-card';
import ScrollContainer from 'components/scroll-container/scroll-container';


const OrderPreview = ({orders, fullscreen}) => {
    const width = fullscreen && {width:'100%'};

    return (
        <section className={styles.order_list} style={width}>
            <ScrollContainer type="list">
                {orders.map((item, index) => (
                    <li className={styles.list_item} key={index}>
                        <FeedCard item={item} />
                    </li>
                )).reverse()}
            </ScrollContainer>
        </section>
    );
}


export default OrderPreview;

OrderPreview.propTypes = {
    fullscreen: PropTypes.bool,
    orders: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  }
  