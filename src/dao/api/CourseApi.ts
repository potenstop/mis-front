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
import { ContentTopicListItemResponse } from '@/response/ContentTopicListItemResponse'
import { ContentTopicListItemRequest } from '@/request/ContentTopicListItemRequest'
import { ContentTopicAddRequest } from '@/request/ContentTopicAddRequest'
import { ContentTopicViewResponse } from '@/response/ContentTopicViewResponse'
import { ContentTopicUpdateRequest } from '@/request/ContentTopicUpdateRequest'
import { ContentTopicMulAddRequest } from '@/request/ContentTopicMulAddRequest'
import { AlbumCourseProblemListItemResponse } from '@/response/AlbumCourseProblemListItemResponse'
import { AlbumCourseProblemListItemRequest } from '@/request/AlbumCourseProblemListItemRequest'
import { AlbumCourseProblemAddRequest } from '@/request/AlbumCourseProblemAddRequest'
import { AlbumCourseProblemTopicResponse } from '@/response/AlbumCourseProblemTopicResponse'
import { AlbumCourseProblemUpdateRequest } from '@/request/AlbumCourseProblemUpdateRequest'
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
  @PostMapping('/mis/content-topic/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', ContentTopicListItemResponse))
  public contentTopicList (@RequestBody request: ContentTopicListItemRequest): Promise<ApiResult<PageResponse<ContentTopicListItemResponse>>> {
    return null
  }
  @PostMapping('/mis/content-topic/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public contentTopicAdd (@RequestBody request: ContentTopicAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/mis/content-topic/view')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', ContentTopicViewResponse))
  public contentTopicView (@RequestParam contentId: number): Promise<ApiResult<ContentTopicViewResponse>> {
    return null
  }
  @PostMapping('/mis/content-topic/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public contentTopicUpdate (@RequestBody request: ContentTopicUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
  @PostMapping('/mis/content-topic/mul-add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public contentTopicMulAdd (@RequestBody request: ContentTopicMulAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @PostMapping('/album/course/problem/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', AlbumCourseProblemListItemResponse))
  public albumCourseProblemList (@RequestBody request: AlbumCourseProblemListItemRequest): Promise<ApiResult<PageResponse<AlbumCourseProblemListItemResponse>>> {
    return null
  }
  @PostMapping('/album/course/problem/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public albumCourseProblemAdd (@RequestBody request: AlbumCourseProblemAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/album/course/problem/topic/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', AlbumCourseProblemTopicResponse))
  public albumCourseProblemTopicList (@RequestParam albumCourseProblemTopicId: number): Promise<ApiResult<AlbumCourseProblemTopicResponse[]>> {
    return null
  }
  @PostMapping('/album/course/problem/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public albumCourseProblemUpdate (@RequestBody request: AlbumCourseProblemUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
}
