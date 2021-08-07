import styles from './order-preview.module.css'
import FeedCard from 'components/feed-card/feed-card'
import ScrollContainer from 'components/scroll-container/scroll-container'
import { TallOrdersList, TOrder } from 'types/types'
import { FC } from 'react'

interface IOrderPreview {
  orders: TallOrdersList
  fullscreen: boolean
}
const OrderPreview: FC<IOrderPreview> = ({ orders, fullscreen }) => {
  const width = fullscreen ? { width: '100%' } : {}

  return (
    <section className={styles.order_list} style={width}>
      <ScrollContainer type='list'>
        {orders
          .map((item: TOrder, index: number) => (
            <li className={styles.list_item} key={index}>
              <FeedCard item={item} />
            </li>
          ))
          .reverse()}
      </ScrollContainer>
    </section>
  )
}

export default OrderPreview
