/**
 *
 * 功能描述:
 *
 * @className ContentTopicListItemRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/25 16:00
 */
import { PageRequest } from '@/bmo/PageRequest'
import { JsonProperty } from 'papio-h5'

export class ContentTopicListItemRequest extends PageRequest {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private state: number
  @JsonProperty
  private title: string
  public getContentId (): number {
    return this.contentId
  }
  public setContentId (contentId: number): void {
    this.contentId = contentId
  }
  public getCreateTime (): string {
    return this.createTime
  }
  public setCreateTime (createTime: string): void {
    this.createTime = createTime
  }
  public getState (): number {
    return this.state
  }
  public setState (state: number): void {
    this.state = state
  }
  public getTitle (): string {
    return this.title
  }
  public setTitle (title: string): void {
    this.title = title
  }
}
