import wsFeedActions from './ws-feed-actions'
import wsUserFeedActions from './ws-user-feed-actions'
import wsConnectActions from './ws-connect-actions'

const wsActions = {
  feed: wsFeedActions,
  userFeed: wsUserFeedActions,
  connect: wsConnectActions,
}

export default wsActions
