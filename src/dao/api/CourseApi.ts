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
import { CourseViewResponse } from '@/response/CourseViewResponse'
import { CourseUpdateRequest } from '@/request/CourseUpdateRequest'
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
  @GetMapping('/view')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', CourseViewResponse))
  public view (@RequestParam courseId: number): Promise<ApiResult<CourseViewResponse>> {
    return null
  }
  @PostMapping('/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public update (@RequestBody request: CourseUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/no-page/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', CourseListItemResponse))
  public notPageList (@RequestParam courseName: string, @RequestParam courseId: number): Promise<ApiResult<CourseListItemResponse[]>> {
    return null
  }
}
