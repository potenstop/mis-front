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
import { UploadTopicListItemResponse } from '@/response/UploadTopicListItemResponse'
@AxisoRemote({ filepath: '/src/dao/api', name: 'cms-api', timeout: 10000 })
export class CmsApi {
  @GetMapping('/mis/word/batch/course/topic')
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', UploadTopicListItemResponse))
  public wordBatchCourseTopic (@RequestParam('filepath') filepath: string): Promise<ApiResult<UploadTopicListItemResponse[]>> {
    return null
  }
}
