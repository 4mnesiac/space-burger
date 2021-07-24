import wsServices from '../wsServices/wsServices'
import wsActions from '../wsActions'
import { refreshExpiredTokenApi } from 'services/api'
import { setCookie } from 'utils/cookie'

const socketMiddleware = () => {
  return (store) => {
    let socket = null
    let socketName = ''
    return (next) => (action) => {
      const { dispatch } = store
      const { type, payload } = action
      if (type === wsActions.connect.wsConnectionInit.toString()) {
        socketName = payload
        socket = wsServices[payload]()
      }

      if (type === wsActions.connect.wsConnectionClose.toString()) {
        socket.close()
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsActions[socketName].onOpen(event.type))
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData

          if (restParsedData.message && restParsedData.message === 'Invalid or missed token') {
            refreshExpiredTokenApi().then((res) => {
              setCookie('token', res.accessToken)
              localStorage.setItem('token', res.refreshToken)

              dispatch(wsActions.connect.wsConnectionInit(payload))
            })
          } else {
            dispatch(wsActions[socketName].onMessage(parsedData))
          }
        }
        socket.onerror = (event) => {
          dispatch(wsActions[socketName].onError(event.type))
        }

        socket.onclose = (event) => {
          dispatch(wsActions[socketName].onClose(event.type))
        }
      }
      next(action)
    }
  }
}

export default socketMiddleware
