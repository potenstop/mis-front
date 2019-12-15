import { JsonProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemTopicResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/10/27 9:21
 */
export class AlbumCourseProblemTopicResponse {
  @JsonProperty
  private albumCourseProblemId: number
  @JsonProperty
  private albumCourseProblemTopicId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private gradeAmount: number
  @JsonProperty
  private inputProblem: string
  @JsonProperty
  private inputSelectOption: string
  @JsonProperty
  private contentId: number
  @JsonProperty
  private state: number
  @JsonProperty
  private updateTime: string
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
  public getAlbumCourseProblemTopicId (): number {
    return this.albumCourseProblemTopicId
  }
  public setAlbumCourseProblemTopicId (albumCourseProblemTopicId: number): void {
    this.albumCourseProblemTopicId = albumCourseProblemTopicId
  }
  public getCreateTime (): string {
    return this.createTime
  }
  public setCreateTime (createTime: string): void {
    this.createTime = createTime
  }
  public getGradeAmount (): number {
    return this.gradeAmount
  }
  public setGradeAmount (gradeAmount: number): void {
    this.gradeAmount = gradeAmount
  }
  public getInputProblem (): string {
    return this.inputProblem
  }
  public setInputProblem (inputProblem: string): void {
    this.inputProblem = inputProblem
  }
  public getInputSelectOption (): string {
    return this.inputSelectOption
  }
  public setInputSelectOption (inputSelectOption: string): void {
    this.inputSelectOption = inputSelectOption
  }
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
  public getUpdateTime (): string {
    return this.updateTime
  }
  public setUpdateTime (updateTime: string): void {
    this.updateTime = updateTime
  }
}
