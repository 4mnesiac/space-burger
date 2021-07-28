import { getCookie } from '../../../utils/cookie'

const wsServices = {
  feed: () => new WebSocket('wss://norma.nomoreparties.space/orders/all'),
  userFeed: () => new WebSocket(`wss://norma.nomoreparties.space/orders?token=${getCookie('token').split(' ')[1]}`),
}

export default wsServices
