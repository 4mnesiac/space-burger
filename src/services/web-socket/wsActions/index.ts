import wsFeedActions from './ws-feed-actions'
import wsUserFeedActions from './ws-user-feed-actions'
import wsConnectActions from './ws-connect-actions'

type TWsActions = {
  feed: typeof wsFeedActions;
  userFeed: typeof wsUserFeedActions;
  connect: typeof wsConnectActions;
};

const wsActions: TWsActions = {
  feed: wsFeedActions,
  userFeed: wsUserFeedActions,
  connect: wsConnectActions,
}

export default wsActions;
