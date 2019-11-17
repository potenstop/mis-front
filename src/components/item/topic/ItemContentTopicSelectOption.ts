/**
 *
 * 功能描述:
 *
 * @className ItemContentTopicSelectOption
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/17 19:25
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'

export class ItemContentTopicSelectOption {
  @JsonProperty
  public contentTopicSelectOptionId: number
  @JsonProperty
  public createTime: string
  @JsonProperty
  public updateTime: string
  @JsonProperty
  public contentId: number
  @JsonProperty
  public contentTopicId: number
  @JsonProperty
  public optionLabel: string
  @JsonProperty
  public isOptionAnswer: number
}
