import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ContentTopicSelectOptionResponse } from '@/response/ContentTopicSelectOptionResponse'

/**
 *
 * 功能描述:
 *
 * @className ContentTopicViewResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:46
 */
export class ContentTopicViewResponse {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private contentTopicId: number
  @JsonProperty
  private state: number
  @JsonProperty
  private contentType: number
  @JsonProperty
  private title: string
  @JsonProperty
  private answer: string
  @JsonProperty
  private analysis: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  private gradeAmount: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ContentTopicSelectOptionResponse))
  private addOptionList: ContentTopicSelectOptionResponse[]
  @JsonProperty
  private titleAnnexContent: string
  @JsonProperty
  private answerAnnexContent: string
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
  public getState (): number {
    return this.state
  }
  public setState (state: number): void {
    this.state = state
  }
  public getContentType (): number {
    return this.contentType
  }
  public setContentType (contentType: number): void {
    this.contentType = contentType
  }
  public getTitle (): string {
    return this.title
  }
  public setTitle (title: string): void {
    this.title = title
  }
  public getAnswer (): string {
    return this.answer
  }
  public setAnswer (answer: string): void {
    this.answer = answer
  }
  public getAnalysis (): string {
    return this.analysis
  }
  public setAnalysis (analysis: string): void {
    this.analysis = analysis
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
  public getAddOptionList (): ContentTopicSelectOptionResponse[] {
    return this.addOptionList
  }
  public setAddOptionList (addOptionList: ContentTopicSelectOptionResponse[]): void {
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
