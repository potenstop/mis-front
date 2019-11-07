import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { CourseTypeSimpleResponse } from '@/response/CourseTypeSimpleResponse'

/**
 *
 * 功能描述:
 *
 * @className ContentTopicListItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:46
 */
export class ContentTopicListItemResponse {
  @JsonProperty
  private analysis: string
  @JsonProperty
  private answer: string
  @JsonProperty
  private channelId: number
  @JsonProperty
  private channelName: number
  @JsonProperty
  private contentId: number
  @JsonProperty
  private contentTopicId: number
  @JsonProperty
  private contentType: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private outId: string
  @JsonProperty
  private outUrl: string
  @JsonProperty
  private state: number
  @JsonProperty
  private title: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  private updateTime: string
  public getAnalysis (): string {
    return this.analysis
  }
  public setAnalysis (analysis: string): void {
    this.analysis = analysis
  }
  public getAnswer (): string {
    return this.answer
  }
  public setAnswer (answer: string): void {
    this.answer = answer
  }
  public getChannelId (): number {
    return this.channelId
  }
  public setChannelId (channelId: number): void {
    this.channelId = channelId
  }
  public getChannelName (): number {
    return this.channelName
  }
  public setChannelName (channelName: number): void {
    this.channelName = channelName
  }
  public getContentId (): number {
    return this.contentId
  }
  public setContentId (contentId: number): void {
    this.contentId = contentId
  }
  public getContentTopicId (): number {
    return this.contentTopicId
  }
  public setContentTopicId (contentTopicId: number): void {
    this.contentTopicId = contentTopicId
  }
  public getContentType (): number {
    return this.contentType
  }
  public setContentType (contentType: number): void {
    this.contentType = contentType
  }
  public getCreateTime (): string {
    return this.createTime
  }
  public setCreateTime (createTime: string): void {
    this.createTime = createTime
  }
  public getOutId (): string {
    return this.outId
  }
  public setOutId (outId: string): void {
    this.outId = outId
  }
  public getOutUrl (): string {
    return this.outUrl
  }
  public setOutUrl (outUrl: string): void {
    this.outUrl = outUrl
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
  public getTopicType (): number {
    return this.topicType
  }
  public setTopicType (topicType: number): void {
    this.topicType = topicType
  }
  public getUpdateTime (): string {
    return this.updateTime
  }
  public setUpdateTime (updateTime: string): void {
    this.updateTime = updateTime
  }
}
