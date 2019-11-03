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
import { CourseListItemRequest } from '@/request/CourseListItemRequest'
import { CourseTypeListItemResponse } from '@/response/CourseTypeListItemResponse'
import { CourseTypeTreeItemResponse } from '@/response/CourseTypeTreeItemResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: '/course-type', timeout: 5000 })
export class CourseTypeApi {
  @GetMapping('/no-page/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', CourseTypeListItemResponse))
  public noPageList (@RequestParam courseIdList: [], @RequestParam rank: number): Promise<ApiResult<CourseTypeListItemResponse[]>> {
    return null
  }
  @GetMapping('/no-page/tree')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', CourseTypeTreeItemResponse))
  public noPageTree (): Promise<ApiResult<CourseTypeTreeItemResponse[]>> {
    return null
  }
}
