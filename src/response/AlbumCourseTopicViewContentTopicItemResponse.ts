import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ContentTopicSelectOptionResponse } from '@/response/ContentTopicSelectOptionResponse'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseTopicViewContentTopicItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:46
 */
export class AlbumCourseTopicViewContentTopicItemResponse {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private state: number
  @JsonProperty
  private title: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ContentTopicSelectOptionResponse))
  private optionList: ContentTopicSelectOptionResponse[]
  public getContentId (): number {
    return this.contentId
  }
  public setContentId (contentId: number): void {
    this.contentId = contentId
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
  public getOptionList (): ContentTopicSelectOptionResponse[] {
    return this.optionList
  }
  public setOptionList (optionList: ContentTopicSelectOptionResponse[]): void {
    this.optionList = optionList
  }
}
