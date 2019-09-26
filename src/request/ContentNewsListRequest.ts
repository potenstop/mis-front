/**
 *
 * 功能描述:
 *
 * @className ContentNewsListRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/25 16:00
 */
import { PageRequest } from '@/bmo/PageRequest'
import { JsonProperty } from 'papio-h5'

export class ContentNewsListRequest extends PageRequest {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private updateTime: string
  @JsonProperty
  private title: string
  @JsonProperty
  private publishTime: string
  @JsonProperty
  private state: number
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
  public getUpdateTime (): string {
    return this.updateTime
  }
  public setUpdateTime (updateTime: string): void {
    this.updateTime = updateTime
  }
  public getTitle (): string {
    return this.title
  }
  public setTitle (title: string): void {
    this.title = title
  }
  public getPublishTime (): string {
    return this.publishTime
  }
  public setPublishTime (publishTime: string): void {
    this.publishTime = publishTime
  }
  public getState (): number {
    return this.state
  }
  public setState (state: number): void {
    this.state = state
  }
}
