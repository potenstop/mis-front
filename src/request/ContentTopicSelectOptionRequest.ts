/**
 *
 * 功能描述:
 *
 * @className ContentTopicSelectOptionRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty } from 'papio-h5'

export class ContentTopicSelectOptionRequest {
  @JsonProperty
  private contentTopicSelectOptionId: number
  @JsonProperty
  private isOptionAnswer: number
  @JsonProperty
  private optionLabel: string
  public getContentTopicSelectOptionId (): number {
    return this.contentTopicSelectOptionId
  }
  public setContentTopicSelectOptionId (contentTopicSelectOptionId: number): void {
    this.contentTopicSelectOptionId = contentTopicSelectOptionId
  }
  public getIsOptionAnswer (): number {
    return this.isOptionAnswer
  }
  public setIsOptionAnswer (isOptionAnswer: number): void {
    this.isOptionAnswer = isOptionAnswer
  }
  public getOptionLabel (): string {
    return this.optionLabel
  }
  public setOptionLabel (optionLabel: string): void {
    this.optionLabel = optionLabel
  }
}
