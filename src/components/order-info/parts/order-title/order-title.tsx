import styles from './order-title.module.css'
import { TOrderStatusCode } from 'types/types'
import { FC } from 'react'
import { ORDER_STATUS } from 'utils/constants'

interface IOrderTitle {
  name: string
  status: TOrderStatusCode
}

const OrderTitle: FC<IOrderTitle> = ({ name, status }) => {
  return (
    <section className={styles.header}>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.status}>{ORDER_STATUS[status]}</p>
    </section>
  )
}

export default OrderTitle
