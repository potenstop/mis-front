import Vuex from 'vuex'

/**
 *
 * 功能描述:
 *
 * @className UserStore
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 10:31
 */
export default {
  namespaced: true,
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: '',
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      console.log('accessaccess', access)
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      // setToken(token);
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id: msgId, content }) {
      state.messageContentStore[msgId] = content
    },
    moveMsg (state, { from, to, msg_id: msgId }) {
      const index = state[from].findIndex(_ => _.msg_id === msgId)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {},
  actions: {}
}
