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
import { AlbumCourseListItemRequest } from '@/request/AlbumCourseListItemRequest'
import { AlbumCourseListItemResponse } from '@/response/AlbumCourseListItemResponse'
import { AlbumCourseAddRequest } from '@/request/AlbumCourseAddRequest'
import { AlbumCourseViewResponse } from '@/response/AlbumCourseViewResponse'
import { AlbumCourseUpdateRequest } from '@/request/AlbumCourseUpdateRequest'
import { AlbumCourseUpdateCourseRelationRequest } from '@/request/AlbumCourseUpdateCourseRelationRequest'
import { AlbumCourseTopicViewResponse } from '@/response/AlbumCourseTopicViewResponse'
import { CourseTypeListItemResponse } from '@/response/CourseTypeListItemResponse'
import { CourseTypeTreeItemResponse } from '@/response/CourseTypeTreeItemResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: 'course-api', timeout: 5000 })
export class CourseApi {
  @PostMapping('/mis/album/course/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', AlbumCourseListItemResponse))
  public albumCourseList (@RequestBody request: AlbumCourseListItemRequest): Promise<ApiResult<PageResponse<AlbumCourseListItemResponse>>> {
    return null
  }
  @PostMapping('/mis/album/course/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public albumCourseAdd (@RequestBody request: AlbumCourseAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/mis/album/course/view')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', AlbumCourseViewResponse))
  public albumCourseView (@RequestParam albumId: number): Promise<ApiResult<AlbumCourseViewResponse>> {
    return null
  }
  @PostMapping('/mis/album/course/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public albumCourseUpdate (@RequestBody request: AlbumCourseUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
  @PostMapping('/mis/album/course/update-course-relation')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public albumCourseUpdateCourseRelation (@RequestBody request: AlbumCourseUpdateCourseRelationRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/mis/album/course/topic-list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', AlbumCourseTopicViewResponse))
  public albumCourseTopicList (@RequestParam albumId: number): Promise<ApiResult<AlbumCourseTopicViewResponse>> {
    return null
  }
  @PostMapping('/mis/course/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', CourseListItemResponse))
  public courseListByFilter (@RequestBody request: CourseListItemRequest): Promise<ApiResult<PageResponse<CourseListItemResponse>>> {
    return null
  }
  @PostMapping('/mis/course/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public courseAdd (@RequestBody request: CourseAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/mis/course/view')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', CourseViewResponse))
  public courseView (@RequestParam courseId: number): Promise<ApiResult<CourseViewResponse>> {
    return null
  }
  @PostMapping('/mis/course/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public courseUpdate (@RequestBody request: CourseUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/mis/course/no-page/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', CourseListItemResponse))
  public courseListByFilterNotPage (@RequestParam courseName: string, @RequestParam courseId: number): Promise<ApiResult<CourseListItemResponse[]>> {
    return null
  }
  @GetMapping('/mis/course-type/no-page/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', CourseTypeListItemResponse))
  public courseTypeListByFilterNotPage (@RequestParam courseIdList: [], @RequestParam rank: number): Promise<ApiResult<CourseTypeListItemResponse[]>> {
    return null
  }
  @GetMapping('/mis/course-type/no-page/tree')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', CourseTypeTreeItemResponse))
  public courseTypeTreeByFilterNotPage (): Promise<ApiResult<CourseTypeTreeItemResponse[]>> {
    return null
  }
}
