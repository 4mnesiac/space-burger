import { createAction } from '@reduxjs/toolkit'

const wsConnectActions = {
  wsConnectionInit: createAction('WS_CONNECTION_INIT'),
  wsConnectionClose: createAction('WS_CONNECTION_CLOSE'),
}

export default wsConnectActions
