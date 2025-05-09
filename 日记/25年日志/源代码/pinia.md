## @/store/index.js

```js
import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { get } from '@/utils/request'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 状态数据
    state: {
      // 是否加载中
      isLoading: false,
      // 是否登录
      isLogin: false,
      // 是否外部触发打开登录框
      openLogin: false,
      // 当前用户
      user: {},
      // 分区列表
      channels: [],
      // 轮播图列表
      carousels: [],
      // 弹幕列表
      danmuList: [],
      // 未读消息数 分别对应"reply"/"at"/"love"/"system"/"whisper"/"dynamic"
      msgUnread: [0, 0, 0, 0, 0, 0],
      // 聊天列表
      chatList: [],
      // 当前聊天对象的uid (不是聊天的id)
      chatId: -1,
      // 当前页面是否在聊天界面
      isChatPage: false,
      // 实时通讯的socket
      ws: null,
      // 用户与当前播放视频的互动数据 {love, unlove, coin, collect}
      attitudeToVideo: {},
      // 用户点赞的评论 id
      likeComment: [],
      // 用户点踩的评论 id
      dislikeComment: [],
      // 登录用户的收藏夹列表
      favorites: [],
      // 访问用户的收藏夹列表
      userFavList: [],
      // 热搜列表
      trendings: [],
      // 搜索到的相关数据数量 [视频, 用户]
      matchingCount: [0, 0],
  },
  }),

  actions: {
    // 初始化数据
    initData() {
      this.isLogin = false
      this.user = {}
      this.msgUnread = [0, 0, 0, 0, 0, 0]
      this.attitudeToVideo = {}
      this.favorites = []
      this.likeComment = []
      this.dislikeComment = []
    },

    // 更新用户信息
    updateUser(user) {
      this.user = user
    },

    // 获取用户信息
    async getPersonalInfo() {
      try {
        const result = await axios.get("/api/user/personal/info", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("teri_token"),
          },
        })

        if (result.data.code === 200) {
          this.updateUser(result.data.data)
          this.isLogin = true
        }
      } catch {
        this.initData()
        if (this.ws) {
          this.ws.close()
          this.ws = null
        }
        localStorage.removeItem("teri_token")
        ElMessage.error("请登录后查看")
      }
    },

    // 退出登录
    async logout() {
      this.initData()
      if (this.ws) {
        this.ws.close()
        this.ws = null
      }
      
      try {
        await axios.get("/api/user/account/logout", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("teri_token"),
          },
        })
      } finally {
        localStorage.removeItem("teri_token")
      }
    },

    // WebSocket 相关操作
    async connectWebSocket() {
      return new Promise((resolve) => {
        if (this.ws) {
          this.ws.close()
          this.ws = null
        }

        const wsBaseUrl = import.meta.env.VITE_APP_WS_IM_URL
        const ws = new WebSocket(`${wsBaseUrl}/im`)
        this.ws = ws

        ws.addEventListener('open', () => {
          console.log("实时通信websocket已建立")
          resolve(true)
        })

        ws.addEventListener('close', () => this.handleWsClose())
        ws.addEventListener('message', e => this.handleWsMessage(e))
        ws.addEventListener('error', e => this.handleWsError(e))
      })
    },

    async closeWebSocket() {
      if (this.ws) {
        await this.ws.close()
        this.ws = null
      }
    },

    // WebSocket 事件处理
    handleWsClose() {
      console.log("实时通信websocket关闭,请登录并刷新页面重试")
      this.initData()
    },

    handleWsMessage(event) {
      const data = JSON.parse(event.data)
      
      switch (data.type) {
        case "error":
          if (data.data === "登录已过期") {
            this.initData()
            localStorage.removeItem("teri_token")
          }
          ElMessage.error(data.data)
          break
          
        case "reply":
        case "at":
        case "love":
        case "system":
        case "dynamic":
          this.handleCommonMessage(data.type, data.data)
          break
          
        case "whisper":
          this.handleWhisperMessage(data.data)
          break
      }
    },

    handleCommonMessage(type, content) {
      const typeIndexMap = {
        reply: 0,
        at: 1,
        love: 2,
        system: 3,
        dynamic: 5
      }
      
      const index = typeIndexMap[type]
      
      switch (content.type) {
        case "全部已读":
          this.msgUnread[index] = 0
          break
        case "接收":
          this.msgUnread[index]++
          break
      }
    },

    handleWhisperMessage(content) {
      const index = 4 // whisper 对应的索引
      
      switch (content.type) {
        case "全部已读":
          this.msgUnread[index] = 0
          this.chatList.forEach(item => {
            item.chat.unread = 0
          })
          break
          
        case "已读":
          const chatid = content.id
          const count = content.count
          this.msgUnread[index] = Math.max(0, this.msgUnread[index] - count)
          
          const chat = this.chatList.find(item => item.chat.id === chatid)
          if (chat) chat.chat.unread = 0
          break
          
        case "移除":
          const removeChatId = content.id
          const removeCount = content.count
          this.msgUnread[index] = Math.max(0, this.msgUnread[index] - removeCount)
          
          const i = this.chatList.findIndex(item => item.chat.id === removeChatId)
          if (i !== -1) {
            if (this.chatList[i].user.uid === this.chatId) this.chatId = -1
            this.chatList.splice(i, 1)
          }
          break
          
        case "接收":
          this.handleNewMessage(content)
          break
          
        case "撤回":
          this.handleWithdrawMessage(content)
          break
      }
    },

    handleNewMessage(content) {
      const sortByLatestTime = (list) => {
        list.sort((a, b) => {
          return new Date(b.chat.latestTime) - new Date(a.chat.latestTime)
        })
      }

      if (content.detail.userId === this.user.uid) {
        const chatItem = this.chatList.find(item => item.chat.userId === content.detail.anotherId)
        if (chatItem && this.isChatPage) {
          chatItem.detail.list.push(content.detail)
          chatItem.chat.latestTime = content.chat.latestTime
          sortByLatestTime(this.chatList)
        }
      } else {
        if (!content.online) {
          this.msgUnread[4]++
        }

        let chatItem = this.chatList.find(item => item.chat.userId === content.detail.userId)
        if (chatItem) {
          chatItem.detail.list.push(content.detail)
          chatItem.chat = content.chat
          sortByLatestTime(this.chatList)
        } else {
          chatItem = {
            chat: content.chat,
            user: content.user,
            detail: {
              more: true,
              list: [content.detail]
            }
          }
          this.chatList.unshift(chatItem)
        }
      }
    },

    handleWithdrawMessage(content) {
      const msgId = content.id
      const sendId = content.sendId
      const acceptId = content.acceptId
      
      let chat
      if (sendId === this.user.uid) {
        chat = this.chatList.find(item => item.chat.userId === acceptId)
      } else {
        chat = this.chatList.find(item => item.chat.userId === sendId)
      }
      
      if (chat) {
        const msg = chat.detail.list.find(item => item.id === msgId)
        if (msg) msg.withdraw = 1
      }
    },

    handleWsError(event) {
      console.log("实时通信websocket报错: ", event)
    },

    // 获取未读消息
    async getMsgUnread() {
      const res = await get("/msg-unread/all", {
        headers: { Authorization: "Bearer " + localStorage.getItem('teri_token') }
      })
      const data = res.data.data
      this.msgUnread = [
        data.reply,
        data.at,
        data.love,
        data.system,
        data.whisper,
        data.dynamic
      ]
    },

    // 其他更新方法
    updateChannels(channels) {
      this.channels = channels
    },

    updateCarousels(carousels) {
      this.carousels = carousels
    },

    updateDanmuList(danmuList) {
      this.danmuList = danmuList
    },

    updateChatList(chatList) {
      this.chatList.push(...chatList)
    },

    updateAttitudeToVideo(atv) {
      this.attitudeToVideo = atv
    },

    updateLikeComment(lc) {
      this.likeComment = lc
    },

    updateDislikeComment(dlc) {
      this.dislikeComment = dlc
    },

    updateFavorites(favorites) {
      this.favorites = favorites
    },

    updateTrendings(trendings) {
      this.trendings = trendings
    },

    updateMatchingCount(matchingCount) {
      this.matchingCount = matchingCount
    }
  }
})
```

