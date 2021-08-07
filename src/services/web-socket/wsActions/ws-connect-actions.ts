import { createAction, PayloadActionCreator  } from '@reduxjs/toolkit'

interface IWsConnectActions {
  wsConnectionInit: PayloadActionCreator<string>;
  wsConnectionClose: PayloadActionCreator
}

const wsConnectActions: IWsConnectActions = {
  wsConnectionInit: createAction('WS_CONNECTION_INIT'),
  wsConnectionClose: createAction('WS_CONNECTION_CLOSE'),
}

export default wsConnectActions
