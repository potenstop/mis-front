/**
 *
 * 功能描述:
 *
 * @className ContentTopicMulAddRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ContentTopicAddRequest } from '@/request/ContentTopicAddRequest'

export class ContentTopicMulAddRequest {
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ContentTopicAddRequest))
  private contentTopicAddRequestList: ContentTopicAddRequest[]
  public getContentTopicAddRequestList (): ContentTopicAddRequest[] {
    return this.contentTopicAddRequestList
  }
  public setContentTopicAddRequestList (contentTopicAddRequestList: ContentTopicAddRequest[]): void {
    this.contentTopicAddRequestList = contentTopicAddRequestList
  }
}
