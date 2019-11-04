/**
 *
 * 功能描述:
 *
 * @className ContentNewsApi
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
import { ContentNewsListRequest } from '@/request/ContentNewsListRequest'
import { ContentNewItemResponse } from '@/response/ContentNewItemResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: '/content-news', timeout: 5000 })
export class ContentNewsApi {
  @PostMapping('/list')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', PageResponse).set('data.list', Array).set('data.list.Array', ContentNewItemResponse))
  public list (@RequestBody request: ContentNewsListRequest): Promise<ApiResult<PageResponse<ContentNewItemResponse[]>>> {
    return null
  }
}
