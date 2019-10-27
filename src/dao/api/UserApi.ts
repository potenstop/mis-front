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
import { UserAuthBaseResponse } from '@/response/UserAuthBaseResponse'
import { UserListRequest } from '@/request/UserListRequest'
import { PageResponse } from '@/bmo/PageResponse'
import { UserListItemResponse } from '@/response/UserListItemResponse'
import {UserDetailResponse} from "@/response/UserDetailResponse";
@AxisoRemote({ filepath: '/src/dao/api', name: '/user', timeout: 5000 })
export class UserApi {
  @GetMapping('/ldap/login')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', String))
  public ldapLogin (@RequestParam('username') username: string, @RequestParam('password') password: string): Promise<ApiResult<String>> {
    return null
  }

  @GetMapping('/info')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', UserAuthBaseResponse))
  public info (): Promise<ApiResult<UserAuthBaseResponse>> {
    return null
  }

  @PostMapping('/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', UserListItemResponse))
  public list (@RequestBody request: UserListRequest): Promise<ApiResult<PageResponse<UserListItemResponse>>> {
    return null
  }

  @GetMapping('/detail')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', UserDetailResponse))
  public detail (@RequestParam('userId') userId: number): Promise<ApiResult<UserDetailResponse>> {
    return null
  }
}
