import { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } from '../../slices/feedSlice'

const wsFeedActions = {
  onOpen: wsConnectionSuccess,
  onError: wsConnectionError,
  onClose: wsConnectionClosed,
  onMessage: wsGetMessage,
}

export default wsFeedActions
