import {JsonProperty, ReturnGenericsProperty} from 'papio-h5'
import {ItemContentTopicSelectOption} from "@/components/item/topic/ItemContentTopicSelectOption";

/**
 *
 * 功能描述:
 *
 * @className UploadTopicListItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/10/27 9:21
 */
export class UploadTopicListItemResponse {
  @JsonProperty
  private title: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', String))
  private optionList: string[]
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
  public getOptionList (): string[] {
    return this.optionList
  }
  public setOptionList (optionList: string[]): void {
    this.optionList = optionList
  }
}
