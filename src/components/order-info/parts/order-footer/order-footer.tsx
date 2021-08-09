import Price from 'components/price/price'
import styles from './order-footer.module.css'
import { FC } from 'react'

interface IOrderFooter {
  datetime: string
  price: number
}

const OrderFooter: FC<IOrderFooter> = ({ datetime, price }) => {
  return (
    <footer className={styles.footer}>
      <p className={styles.wrapper}>
        <time dateTime={datetime} className={styles.time}>
          {datetime}
        </time>
      </p>
      <Price>{price}</Price>
    </footer>
  )
}

export default OrderFooter
