import styles from './order-preview.module.css';
import { mockFeed as feedData } from 'utils/data';
import { Link, useRouteMatch} from 'react-router-dom'
import FeedCard from 'components/feed-card/feed-card';
import ScrollContainer from 'components/scroll-container/scroll-container';

const OrderPreview = () => {
    const {url} = useRouteMatch()

    return (
        <section className={styles.order_list}>
            <ScrollContainer type="list">
                {feedData.map((item, index) => (
                    <li className={styles.list_item} key={index}>
                        <Link to={{ pathname: `${url}/${item.id}` }} className={styles.link}>
                            <FeedCard item={item} />
                        </Link>
                    </li>
                ))}
            </ScrollContainer>
        </section>
    );
}

export default OrderPreview;