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
import { UserAuthBasicResponse } from '@/response/UserAuthBasicResponse'
import { UserListRequest } from '@/request/UserListRequest'
import { PageResponse } from '@/bmo/PageResponse'
import { UserListItemResponse } from '@/response/UserListItemResponse'
import { UserDetailResponse } from '@/response/UserDetailResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: 'user-api', timeout: 10000 })
export class UserApi {
  @GetMapping('/mis/login/ldap')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', String))
  public ldapLogin (@RequestParam('identifier') username: string, @RequestParam('credential') password: string): Promise<ApiResult<String>> {
    return null
  }

  @GetMapping('/mis/info/basic')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', UserAuthBasicResponse))
  public userInfo (): Promise<ApiResult<UserAuthBasicResponse>> {
    return null
  }

  @PostMapping('/mis/info/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', UserListItemResponse))
  public userList (@RequestBody request: UserListRequest): Promise<ApiResult<PageResponse<UserListItemResponse>>> {
    return null
  }

  @GetMapping('/mis/info/detail')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', UserDetailResponse))
  public detail (@RequestParam('userId') userId: number): Promise<ApiResult<UserDetailResponse>> {
    return null
  }
}
