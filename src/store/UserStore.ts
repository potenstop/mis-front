import Vuex from 'vuex'
import { UserApi } from '@/dao/api/UserApi'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CookiesUtil } from '@/common/util/CookiesUtil'
const userApi = new UserApi()

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
    nickname: '',
    userId: '',
    avatar: '',
    token: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar (state, avatar) {
      state.avatar = avatar
    },
    setUserId (state, id) {
      state.userId = id
    },
    setNickname (state, name) {
      state.nickname = name
    },
    setToken (state, token) {
      state.token = token
      CookiesUtil.setToken(token)
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
    setMessageReadList (state, list) {
      state.messageReadList = list
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
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadCount: state => state.messageReadList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    async handleLogin ({ commit }, { nickname, password }) {
      nickname = nickname.trim()
      const result = await userApi.ldapLogin(nickname, password)
      const data = ApiUtil.getData(result)
      commit('setToken', data)
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      commit('setToken', '')
      commit('setAccess', [])
    },
    // 获取用户相关信息
    async getUserInfo ({ state, commit }) {
      const result = await userApi.info()
      const data = ApiUtil.getData(result)
      commit('setAvatar', data.getAvatar())
      commit('setNickname', data.getNickname())
      commit('setUserId', data.getUserId())
      commit('setHasGetInfo', true)
      return data
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      commit('setMessageCount', 0)
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {

    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msgId }) {

    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msgId }) {

    },
    // 删除一个已读消息到回收站
    removeRead ({ commit }, { msgId }) {

    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msgId }) {

    }
  }
}
