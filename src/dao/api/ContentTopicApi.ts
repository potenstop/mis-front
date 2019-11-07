/**
 *
 * 功能描述:
 *
 * @className ContentTopicApi
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
import { ContentTopicListItemResponse } from '@/response/ContentTopicListItemResponse'
import { ContentTopicListItemRequest } from '@/request/ContentTopicListItemRequest'
import { ContentTopicAddRequest } from '@/request/ContentTopicAddRequest'
import { ContentTopicViewResponse } from '@/response/ContentTopicViewResponse'
import { ContentTopicUpdateRequest } from '@/request/ContentTopicUpdateRequest'
@AxisoRemote({ filepath: '/src/dao/api', name: '/content-topic', timeout: 5000 })
export class ContentTopicApi {
  @PostMapping('/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', ContentTopicListItemResponse))
  public list (@RequestBody request: ContentTopicListItemRequest): Promise<ApiResult<PageResponse<ContentTopicListItemResponse>>> {
    return null
  }
  @PostMapping('/add')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public add (@RequestBody request: ContentTopicAddRequest): Promise<ApiResult<number>> {
    return null
  }
  @GetMapping('/view')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', ContentTopicViewResponse))
  public view (@RequestParam contentId: number): Promise<ApiResult<ContentTopicViewResponse>> {
    return null
  }
  @PostMapping('/update')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Number))
  public update (@RequestBody request: ContentTopicUpdateRequest): Promise<ApiResult<number>> {
    return null
  }
}
