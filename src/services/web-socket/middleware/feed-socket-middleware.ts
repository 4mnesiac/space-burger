import wsServices from '../wsServices/wsServices'
import wsActions from '../wsActions'
import { refreshExpiredTokenApi } from 'services/api'
import { setCookie } from 'utils/cookie'
import { Dispatch, AnyAction, MiddlewareAPI } from 'redux'


const socketMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null
    let socketName: string = ''
    
    return (next: Dispatch<AnyAction>) => (action:AnyAction) => {
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
          dispatch(wsActions[socketName].onError(event.type && true))
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
