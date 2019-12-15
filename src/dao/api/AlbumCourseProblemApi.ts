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
import { AlbumCourseProblemListItemRequest } from '@/request/AlbumCourseProblemListItemRequest'
import { AlbumCourseProblemListItemResponse } from '@/response/AlbumCourseProblemListItemResponse'
import { AlbumCourseProblemAddRequest } from '@/request/AlbumCourseProblemAddRequest'
import { AlbumCourseProblemTopicResponse } from '@/response/AlbumCourseProblemTopicResponse'
import { AlbumCourseProblemUpdateRequest } from '@/request/AlbumCourseProblemUpdateRequest'
@AxisoRemote({ filepath: '/src/dao/api', name: '/album/course/problem', timeout: 5000 })
export class AlbumCourseProblemApi {
  @PostMapping('/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', AlbumCourseProblemListItemResponse))
  public list (@RequestBody request: AlbumCourseProblemListItemRequest): Promise<ApiResult<PageResponse<AlbumCourseProblemListItemResponse>>> {
    return null
  }
  @PostMapping('/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public add (@RequestBody request: AlbumCourseProblemAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/topic')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', AlbumCourseProblemTopicResponse))
  public topic (@RequestParam albumCourseProblemTopicId: number): Promise<ApiResult<AlbumCourseProblemTopicResponse[]>> {
    return null
  }
  @PostMapping('/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public update (@RequestBody request: AlbumCourseProblemUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
}
