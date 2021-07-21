import styles from './order-preview.module.css';
import { mockFeed as feedData } from 'utils/data';
import FeedCard from 'components/feed-card/feed-card';
import ScrollContainer from 'components/scroll-container/scroll-container';

const OrderPreview = () => {
    return (
        <section className={styles.order_list}>
            <ScrollContainer type="list">
                {feedData.map((item, index) => (
                    <li className={styles.list_item} key={index}>
                        <FeedCard item={item} />
                    </li>
                ))}
            </ScrollContainer>
        </section>
    );
}

export default OrderPreview;