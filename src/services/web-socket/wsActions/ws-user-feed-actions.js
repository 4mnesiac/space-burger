import { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } from '../../slices/userFeedSlice'

const wsUserFeedActions = {
  onOpen: wsConnectionSuccess,
  onError: wsConnectionError,
  onClose: wsConnectionClosed,
  onMessage: wsGetMessage,
}

export default wsUserFeedActions
