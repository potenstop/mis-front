/**
 *
 * 功能描述:
 *
 * @className DataUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2020/4/18 15:53
 */
export class DataUtil {
  public static showIntToBool (value: number, defaultValue?: boolean): boolean {
    if (defaultValue === null || defaultValue === undefined) {
      defaultValue = false
    }
    if (value === null || value === undefined) {
      return defaultValue
    }
    if (value) {
      return true
    }
    return false
  }
}
