import { getCookie } from '../../../utils/cookie'

interface IWsServices {
  feed: () => WebSocket;
  userFeed: () => WebSocket;
}

const wsServices: IWsServices = {
  feed: () => new WebSocket('wss://norma.nomoreparties.space/orders/all'),
  userFeed: () => new WebSocket(`wss://norma.nomoreparties.space/orders?token=${getCookie('token').split(' ')[1]}`),
}

export default wsServices
