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
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'

export class ContentTopicListItemRequest extends PageRequest {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private state: number
  @JsonProperty
  private title: string
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', Number))
  private contentIdList: number[]
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
  public getContentIdList (): number[] {
    return this.contentIdList
  }
  public setContentIdList (contentIdList: number[]): void {
    this.contentIdList = contentIdList
  }
}
