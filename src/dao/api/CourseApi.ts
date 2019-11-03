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
import { PageResponse } from '@/bmo/PageResponse'
import { CourseListItemRequest } from '@/request/CourseListItemRequest'
import { CourseListItemResponse } from '@/response/CourseListItemResponse'
import { CourseAddRequest } from '@/request/CourseAddRequest'
@AxisoRemote({ filepath: '/src/dao/api', name: '/course', timeout: 5000 })
export class CourseApi {
  @PostMapping('/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', CourseListItemResponse))
  public list (@RequestBody request: CourseListItemRequest): Promise<ApiResult<PageResponse<CourseListItemResponse>>> {
    return null
  }
  @PostMapping('/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public add (@RequestBody request: CourseAddRequest): Promise<ApiResult<number>> {
    return null
  }
}
