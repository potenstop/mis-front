/**
 *
 * 功能描述:
 *
 * @className ContentTopicUpdateRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ContentTopicSelectOptionRequest } from '@/request/ContentTopicSelectOptionRequest'

export class ContentTopicUpdateRequest {
  @JsonProperty
  private contentId: number
  @JsonProperty
  private analysis: string
  @JsonProperty
  private answer: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  private state: number
  @JsonProperty
  private title: string
  @JsonProperty
  private gradeAmount: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ContentTopicSelectOptionRequest))
  private addOptionList: ContentTopicSelectOptionRequest[]
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', Number))
  private removeOptionIdList: number[]
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ContentTopicSelectOptionRequest))
  private modifyOptionList: ContentTopicSelectOptionRequest[]
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
  public getTopicType (): number {
    return this.topicType
  }
  public setTopicType (topicType: number): void {
    this.topicType = topicType
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
  public getModifyOptionList (): ContentTopicSelectOptionRequest[] {
    return this.modifyOptionList
  }
  public setModifyOptionList (modifyOptionList: ContentTopicSelectOptionRequest[]): void {
    this.modifyOptionList = modifyOptionList
  }
  public getRemoveOptionIdList (): number[] {
    return this.removeOptionIdList
  }
  public setRemoveOptionIdList (removeOptionIdList: number[]): void {
    this.removeOptionIdList = removeOptionIdList
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
