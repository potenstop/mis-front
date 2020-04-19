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
import Vue from 'vue'
const messageVue = new Vue()
export class ApiUtil {
  public static getData<T> (result: ApiResult<T>, autoErrorMessgage?: boolean): T {
    if (autoErrorMessgage === null || autoErrorMessgage === undefined) {
      autoErrorMessgage = true
    }
    if (result === null || result === undefined) {
      if (autoErrorMessgage) messageVue.$Message.error({ content: 'result is null', duration: 5 })
      throw new Error('result is null')
    }
    if (result.getCode() !== '0') {
      if (autoErrorMessgage) messageVue.$Message.error({ content: result.getMessage(), duration: 5 })
      throw new Error(result.getMessage())
    }
    return result.getData()
  }
}
