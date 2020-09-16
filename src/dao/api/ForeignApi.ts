/**
 *
 * 功能描述:
 *
 * @className UserApi
 * @projectName web-front
 * @author yanshaowen
 * @date 2019/6/24 14:14
 */
import {
  AxisoRemote, GetMapping, PostMapping, RequestBody,
  RequestMapping,
  RequestMethod,
  RequestParam,
  ReturnGenericsProperty
} from 'papio-h5'
import { ApiResult } from '@/bmo/ApiResult'
@AxisoRemote({ filepath: '/src/dao/api', name: 'foreign-api', timeout: 10000 })
export class ForeignApi {
  @GetMapping('/mis/qiniu/token/refresh')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', String))
  public qiniuTokenRefresh (): Promise<ApiResult<string>> {
    return null
  }
  @GetMapping('/mis/qiniu/file/delete')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', String))
  public qiniuFileDelete (@RequestParam('filepath') filepath: string): Promise<ApiResult<string>> {
    return null
  }
}
