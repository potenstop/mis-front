/**
 *
 * 功能描述:
 *
 * @className ContentTopic
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/17 19:24
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ItemContentTopicSelectOption } from '@/components/item/topic/ItemContentTopicSelectOption'

export class ItemContentTopic {
  @JsonProperty
  public contentId: number
  @JsonProperty
  public contentTopicId: number
  @JsonProperty
  public state: number
  @JsonProperty
  public contentType: number
  @JsonProperty
  public title: string
  @JsonProperty
  public answer: string
  @JsonProperty
  public analysis: string
  @JsonProperty
  public topicType: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ItemContentTopicSelectOption))
  public addOptionList: ItemContentTopicSelectOption[]
}
