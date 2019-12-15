/**
 *
 * 功能描述:
 *
 * @className ProblemContentTopicRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty } from 'papio-h5'

export class ProblemContentTopicRequest {
  @JsonProperty
  private chooseValue: string
  @JsonProperty
  private contentId: number
  public getChooseValue (): string {
    return this.chooseValue
  }
  public setChooseValue (chooseValue: string): void {
    this.chooseValue = chooseValue
  }
  public getContentId (): number {
    return this.contentId
  }
  public setContentId (contentId: number): void {
    this.contentId = contentId
  }
}
