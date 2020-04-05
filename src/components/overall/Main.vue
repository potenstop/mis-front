<template>
  <Layout style="height: 100%" class="main">
    <Sider
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="64"
      v-model="collapsed"
      class="left-sider"
      :style="{ overflow: 'hidden' }"
    >
      <side-menu
        accordion
        ref="sideMenu"
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
        :menu-list="menuList"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" src="../../assets/images/logo.jpg" key="max-logo" />
          <img v-show="collapsed" src="../../assets/images/logo-min.jpg" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar
          :collapsed="collapsed"
          @on-coll-change="handleCollapsedChange"
        >
          <drop-user :message-unread-count="unreadCount" :user-avatar="avatar" />
          <switch-language
            v-if="$config.useI18n"
            @on-lang-change="setLocal"
            style="margin-right: 10px;"
            :lang="local"
          />
          <error-store
            v-if="
              $config.plugin['error-store'] &&
                $config.plugin['error-store'].showInHeader
            "
            :has-read="hasReadErrorPage"
            :count="errorCount"
          ></error-store>
          <full-screen v-model="isFullscreen" style="margin-right: 10px;" />
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav
              :value="$route"
              @input="handleClick"
              :list="tagNavList"
              @on-close="handleCloseTag"
            />
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view />
            </keep-alive>
            <roll-back-top
              :height="100"
              :bottom="80"
              :right="50"
              container=".content-wrapper"
            ></roll-back-top>
          </Content>
        </Layout>
      </Content>
      <Footer class="layout-footer-center">
        <app-footer></app-footer>
      </Footer>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
import RollBackTop from '@/components/back-top/RollBackTop.vue'
import SideMenu from '@/components/side-menu/SideMenu.vue'
import TagsNav from '@/components/nav/TagsNav.vue'
import { RouterUtil } from '@/common/util/RouterUtil'
import ConfigRouter from '@/router/ConfigRouter'
import ErrorStore from '@/components/store/ErrorStore.vue'
import HeaderBar from '@/components/header-bar/HeaderBar.vue'
import SwitchLanguage from '@/components/language/SwitchLanguage.vue'
import FullScreen from '@/components/screen/FullScreen.vue'
import DropUser from '@/components/user/DropUser.vue'
import AppFooter from '@/components/app/AppFooter.vue'
const userModule = namespace(StoreConstant.USER)
const appModule = namespace(StoreConstant.APP)
@Component({
  components: {
    RollBackTop,
    SideMenu,
    TagsNav,
    HeaderBar,
    ErrorStore,
    SwitchLanguage,
    FullScreen,
    DropUser,
    AppFooter
  }
})
export default class Main extends Vue {
  @userModule.Action handleLogin: Function
  @userModule.Action getUnreadMessageCount: Function
  @userModule.State unreadCount: number
  @userModule.State avatar: string
  @appModule.Mutation setBreadCrumb: Function
  @appModule.Mutation setTagNavList: Function
  @appModule.Mutation addTag: Function
  @appModule.Mutation setLocal: Function
  @appModule.Mutation setHomeRoute: Function
  @appModule.Mutation closeTag: Function
  @appModule.Getter errorCount: Function
  @appModule.Getter menuList: Function
  @appModule.State tagNavList: any[]
  @appModule.State local
  @appModule.State hasReadErrorPage

  private name = 'Main'
  private collapsed = false
  private isFullscreen = false
  private isRouterAlive = true

  turnToPage (route) {
    let name, params, query
    if (typeof route === 'string') {
      name = route
    } else {
      name = route.name
      params = route.params
      query = route.query
    }
    if (name.indexOf('isTurnByHref_') > -1) {
      window.open(name.split('_')[1])
      return
    }
    this.$router.push({
      name,
      params,
      query
    })
  }
  handleCollapsedChange (state) {
    this.collapsed = state
  }

  handleCloseTag (res, type, route) {
    if (type !== 'others') {
      if (type === 'all') {
        this.turnToPage(this.$config.homeName)
      } else {
        if (RouterUtil.routeEqual(this.$route, route)) {
          this.closeTag(route)
        }
      }
    }
    this.setTagNavList(res)
  }

  handleClick (item) {
    this.turnToPage(item)
  }

  get cacheList () {
    const list = [
      'ParentView',
      ...(this.tagNavList.length
        ? this.tagNavList
          .filter(item => !(item.meta && item.meta.notCache))
          .map(item => item.name)
        : [])
    ]
    return list
  }

  @Watch('$route')
  routeChanged (newRoute) {
    const { name, query, params, meta } = newRoute
    this.addTag({
      route: { name, query, params, meta },
      type: 'push'
    })
    this.setBreadCrumb(newRoute)
    this.setTagNavList(RouterUtil.getNewTagList(this.tagNavList, newRoute))
    const sideMenu = this.$refs.sideMenu as any
    sideMenu.updateOpenName(newRoute.name)
  }

  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(ConfigRouter)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    this.getUnreadMessageCount()
  }
}
</script>
<style lang="less">
  .main{
    .logo-con{
      height: 64px;
      padding: 10px;
      img{
        height: 44px;
        width: auto;
        display: block;
        margin: 0 auto;
      }
    }
    .header-con{
      background: #fff;
      padding: 0 20px;
      width: 100%;
    }
    .main-layout-con{
      height: 100%;
      overflow: hidden;
    }
    .main-content-con{
      height: ~"calc(100% - 60px)";
      overflow: hidden;
    }
    .tag-nav-wrapper{
      padding: 0;
      height:40px;
      background:#F0F0F0;
    }
    .content-wrapper{
      padding: 18px;
      height: ~"calc(100% - 80px)";
      overflow: auto;
    }
    .left-sider{
      .ivu-layout-sider-children{
        overflow-y: scroll;
        margin-right: -18px;
      }
    }
  }
  .ivu-menu-item > i{
    margin-right: 12px !important;
  }
  .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
    margin-right: 8px !important;
  }
  .collased-menu-dropdown{
    width: 100%;
    margin: 0;
    line-height: normal;
    padding: 7px 0 6px 16px;
    clear: both;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover{
      background: rgba(100, 100, 100, 0.1);
    }
    & * {
      color: #515a6e;
    }
    .ivu-menu-item > i{
      margin-right: 12px !important;
    }
    .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
      margin-right: 8px !important;
    }
  }

  .ivu-select-dropdown.ivu-dropdown-transfer{
    max-height: 400px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
