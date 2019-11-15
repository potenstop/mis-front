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
import { AlbumCourseListItemResponse } from '@/response/AlbumCourseListItemResponse'
import { AlbumCourseListItemRequest } from '@/request/AlbumCourseListItemRequest'
import { AlbumCourseAddRequest } from '@/request/AlbumCourseAddRequest'
import { AlbumCourseViewResponse } from '@/response/AlbumCourseViewResponse'
import { AlbumCourseUpdateRequest } from '@/request/AlbumCourseUpdateRequest'
import {AlbumCourseUpdateCourseRelationRequest} from "@/request/AlbumCourseUpdateCourseRelationRequest";
@AxisoRemote({ filepath: '/src/dao/api', name: '/album/course', timeout: 5000 })
export class AlbumCourseApi {
  @PostMapping('/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', AlbumCourseListItemResponse))
  public list (@RequestBody request: AlbumCourseListItemRequest): Promise<ApiResult<PageResponse<AlbumCourseListItemResponse>>> {
    return null
  }
  @PostMapping('/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public add (@RequestBody request: AlbumCourseAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/view')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', AlbumCourseViewResponse))
  public view (@RequestParam albumId: number): Promise<ApiResult<AlbumCourseViewResponse>> {
    return null
  }
  @PostMapping('/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public update (@RequestBody request: AlbumCourseUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
  @PostMapping('/update-course-relation')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public updateCourseRelation (@RequestBody request: AlbumCourseUpdateCourseRelationRequest): Promise<ApiResult<number>> {
    return null
  }
}
