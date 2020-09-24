/**
 *
 * 功能描述:
 *
 * @className LocalForageUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/12/14 10:12
 */
import localForage from 'localforage'
// 先保存至cookie
localForage.config({
  driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
  name: 'myApp',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description: 'some description'
})
const store = localForage.createInstance({
  name: 'mis'
})
export class LocalForageUtil {
  public static setItem (key: string, value: any) {
    return store.setItem(key, value)
  }
  public static deleteItem (key: string) {
    return store.setItem(key, null)
  }
  public static async getItem (key: string, defalutValue?: any): Promise<any> {
    const result = await store.getItem(key)
    if (result === null) {
      return defalutValue
    } else {
      return result
    }
  }
}
