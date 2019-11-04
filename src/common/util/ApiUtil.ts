/**
 *
 * 功能描述:
 *
 * @className ApiUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/9 19:05
 */
import { ApiResult } from '@/bmo/ApiResult'

export class ApiUtil {
  public static getData<T> (result: ApiResult<T>): T {
    if (result === null || result === undefined) {
      throw new Error('result is null')
    }
    if (result.getCode() !== '0') {
      throw new Error(result.getMessage())
    }
    return result.getData()
  }
}
