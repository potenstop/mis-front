/**
 *
 * 功能描述:
 *
 * @className ContentNewItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/25 15:57
 */
import { JsonProperty } from 'papio-h5'

export class ContentNewItemResponse {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private updateTime: string
  @JsonProperty
  private state: number
  @JsonProperty
  private outId: string
  @JsonProperty
  private channelId: number
  @JsonProperty
  private channelName: string
  @JsonProperty
  private outUrl: string
  @JsonProperty
  private articleSource: string
  @JsonProperty
  private title: string
  @JsonProperty
  private editor: string
  @JsonProperty
  private publishTime: string
  @JsonProperty
  private contentZoneId: number
  @JsonProperty
  private contentZoneName: string
  @JsonProperty
  private token: string
  @JsonProperty
  private article: string
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
  public getState (): number {
    return this.state
  }
  public setState (state: number): void {
    this.state = state
  }
  public getOutId (): string {
    return this.outId
  }
  public setOutId (outId: string): void {
    this.outId = outId
  }
  public getChannelId (): number {
    return this.channelId
  }
  public setChannelId (channelId: number): void {
    this.channelId = channelId
  }
  public getChannelName (): string {
    return this.channelName
  }
  public setChannelName (channelName: string): void {
    this.channelName = channelName
  }
  public getOutUrl (): string {
    return this.outUrl
  }
  public setOutUrl (outUrl: string): void {
    this.outUrl = outUrl
  }
  public getArticleSource (): string {
    return this.articleSource
  }
  public setArticleSource (articleSource: string): void {
    this.articleSource = articleSource
  }
  public getTitle (): string {
    return this.title
  }
  public setTitle (title: string): void {
    this.title = title
  }
  public getEditor (): string {
    return this.editor
  }
  public setEditor (editor: string): void {
    this.editor = editor
  }
  public getPublishTime (): string {
    return this.publishTime
  }
  public setPublishTime (publishTime: string): void {
    this.publishTime = publishTime
  }
  public getContentZoneId (): number {
    return this.contentZoneId
  }
  public setContentZoneId (contentZoneId: number): void {
    this.contentZoneId = contentZoneId
  }
  public getContentZoneName (): string {
    return this.contentZoneName
  }
  public setContentZoneName (contentZoneName: string): void {
    this.contentZoneName = contentZoneName
  }
  public getToken (): string {
    return this.token
  }
  public setToken (token: string): void {
    this.token = token
  }
  public getArticle (): string {
    return this.article
  }
  public setArticle (article: string): void {
    this.article = article
  }
}
