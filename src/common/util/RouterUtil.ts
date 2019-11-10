/**
 *
 * 功能描述:
 *
 * @className RouterUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 11:50
 */
import ProjectConfig from '@/config/ProjectConfig'
import { Route, RouteConfig } from 'vue-router'

const forEach = (arr: Array<any>, fn: Function) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}
const hasChild = (item: RouteConfig) => {
  return item.children && item.children.length !== 0
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
const hasOneOf = (target: Array<any>, arr: Array<any>) => {
  return target.some(_ => arr.indexOf(_) > -1)
}

const showThisMenuEle = (item: RouteConfig, access: string[]) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

const doCustomTimes = (times: number, callback: Function) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}
export class RouterUtil {
  /**
   * @description 根据当前跳转的路由设置显示在浏览器标签的title
   * @param {Object} routeItem 路由对象
   * @param {Object} vm Vue实例
   */
  public static setTitle (routeItem, vm) {
    const handledRoute = RouterUtil.getRouteTitleHandled(routeItem)
    const pageTitle = RouterUtil.showTitle(handledRoute, vm)
    window.document.title = pageTitle ? `${ProjectConfig.title} - ${pageTitle}` : ProjectConfig.title
  }
  public static showTitle (item, vm) {
    let { title, __titleIsFunction__ } = item.meta
    if (!title) return
    if (ProjectConfig.useI18n) {
      if (title.includes('{{') && title.includes('}}')) {
        title = title.replace(/({{[\s\S]+?}})/, (m, str) =>
          str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim()))
        )
      } else if (__titleIsFunction__) {
        title = item.meta.title
      } else {
        title = vm.$t(item.name)
      }
    } else {
      title = (item.meta && item.meta.title) || item.name
    }
    return title
  }
  public static objEqual (obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) {
      return false
    } else if (keysArr1.length === 0 && keysArr2.length === 0) {
      return true
    } else {
      return !keysArr1.some(key => obj1[key] !== obj2[key])
    }
  }
  public static routeEqual (route1: Partial<Route>, route2: Partial<Route>): boolean {
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return route1.name === route2.name && RouterUtil.objEqual(params1, params2) && RouterUtil.objEqual(query1, query2)
  }
  /**
   * @param {*} list 现有标签导航列表
   * @param {*} newRoute 新添加的路由原信息对象
   * @description 如果该newRoute已经存在则不再添加
   */
  public static getNewTagList (list: any[], newRoute: RouteConfig) {
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) {
      return newList
    } else {
      newList.push({ name, path, meta })
    }
    return newList
  }
  public static getRouteTitleHandled (route: Route) {
    let router = { ...route }
    let meta = { ...route.meta }
    let title = ''
    if (meta.title) {
      if (typeof meta.title === 'function') {
        meta.__titleIsFunction__ = true
        title = meta.title(router)
      } else title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
  }
  public static getBreadCrumbList (route: Route, homeRoute) {
    let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
    let routeMatched = route.matched
    if (routeMatched.some(item => item.name === homeRoute.name)) {
      return [homeItem]
    }
    let res = routeMatched
      .filter(item => {
        return item.meta === undefined || !item.meta.hideInBread
      })
      .map(item => {
        let meta = { ...item.meta }
        if (meta.title && typeof meta.title === 'function') {
          meta.__titleIsFunction__ = true
          meta.title = meta.title(route)
        }
        return {
          icon: (item.meta && item.meta.icon) || '',
          name: item.name,
          meta: meta
        }
      })
    res = res.filter(item => {
      return !item.meta.hideInMenu
    })
    return [{ ...homeItem, to: homeRoute.path }, ...res]
  }
  public static getMenuByRouter (list: RouteConfig[], access: string[]) {
    let res: Array<{
      name?: string
      icon: string
      href?: string
      meta: any
      children?: any[]
    }> = []
    forEach(list, (item: RouteConfig) => {
      if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
        let obj: {
          name?: string
          icon: string
          href?: string
          meta: any
          children?: any[]
        } = {
          icon: (item.meta && item.meta.icon) || '',
          name: item.name,
          meta: item.meta
        }
        if (
          (hasChild(item) || (item.meta && item.meta.showAlways)) &&
          showThisMenuEle(item, access)
        ) {
          obj.children = RouterUtil.getMenuByRouter(item.children!, access)
        }
        if (item.meta && item.meta.href) obj.href = item.meta.href
        if (showThisMenuEle(item, access)) res.push(obj)
      }
    })
    return res
  }
  public static getHomeRoute = (
    routers: RouteConfig[],
    homeName = ProjectConfig.homeName
  ): Route | { name?: string } => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
      let item = routers[i]
      if (item.children && item.children.length) {
        // 有children 递归
        let res = RouterUtil.getHomeRoute(item.children, homeName)
        if (res.name) {
          return res
        }
      } else {
        if (item.name === homeName) {
          homeRoute = item
        }
      }
    }
    return homeRoute
  }
  public static getNextRoute = (list: Route[], route: Route) => {
    let res = {}
    if (list.length === 2) {
      res = RouterUtil.getHomeRoute(list)
    } else {
      const index = list.findIndex(item => RouterUtil.routeEqual(item, route))
      if (index === list.length - 1) res = list[list.length - 2]
      else res = list[index + 1]
    }
    return res
  }
  /**
   * 判断打开的标签列表里是否已存在这个新添加的路由对象
   */
  public static routeHasExist = (tagNavList: Route[], routeItem: Route) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index: number) => {
      if (RouterUtil.routeEqual(tagNavList[index], routeItem)) {
        res = true
      }
    })
    return res
  }
}
