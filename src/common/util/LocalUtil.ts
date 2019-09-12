/**
 *
 * 功能描述:
 *
 * @className I18nUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 16:31
 */
import { Route } from 'vue-router'

export class LocalUtil {
  public static localSave (key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public static localRead (key: string): string {
    return localStorage.getItem(key) || ''
  }

  /**
   * 本地存储和获取标签导航列表
   * @param list
   */
  public static setTagNavListInLocalstorage (list: Route[]) {
    localStorage.tagNaveList = JSON.stringify(list)
  }

  public static getTagNavListFromLocalstorage (): Route[] {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
  }
}
