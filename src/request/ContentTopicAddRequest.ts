/**
 *
 * 功能描述:
 *
 * @className ContentTopicAddRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ContentTopicSelectOptionRequest } from '@/request/ContentTopicSelectOptionRequest'

export class ContentTopicAddRequest {
  @JsonProperty
  private analysis: string
  @JsonProperty
  private answer: string
  @JsonProperty
  private state: number
  @JsonProperty
  private title: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  private gradeAmount: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ContentTopicSelectOptionRequest))
  private addOptionList: ContentTopicSelectOptionRequest[]
  @JsonProperty
  private titleAnnexContent: string
  @JsonProperty
  private answerAnnexContent: string
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
  public getGradeAmount (): number {
    return this.gradeAmount
  }
  public setGradeAmount (gradeAmount: number): void {
    this.gradeAmount = gradeAmount
  }
  public getAddOptionList (): ContentTopicSelectOptionRequest[] {
    return this.addOptionList
  }
  public setAddOptionList (addOptionList: ContentTopicSelectOptionRequest[]): void {
    this.addOptionList = addOptionList
  }
  public getTitleAnnexContent (): string {
    return this.titleAnnexContent
  }
  public setTitleAnnexContent (titleAnnexContent: string): void {
    this.titleAnnexContent = titleAnnexContent
  }
  public getAnswerAnnexContent (): string {
    return this.answerAnnexContent
  }
  public setAnswerAnnexContent (answerAnnexContent: string): void {
    this.answerAnnexContent = answerAnnexContent
  }
}
