import { JsonProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemViewResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/10/27 9:21
 */
export class AlbumCourseProblemViewResponse {
  @JsonProperty
  private albumCourseProblemId: number
  @JsonProperty
  private albumId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private showSubmitButton: number
  @JsonProperty
  private updateTime: string
  @JsonProperty
  private showAnswer: number
  @JsonProperty
  private showAnalysis: number
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
  public getAlbumId (): number {
    return this.albumId
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId
  }
  public getCreateTime (): string {
    return this.createTime
  }
  public setCreateTime (createTime: string): void {
    this.createTime = createTime
  }
  public getShowSubmitButton (): number {
    return this.showSubmitButton
  }
  public setShowSubmitButton (showSubmitButton: number): void {
    this.showSubmitButton = showSubmitButton
  }
  public getUpdateTime (): string {
    return this.updateTime
  }
  public setUpdateTime (updateTime: string): void {
    this.updateTime = updateTime
  }
  public getShowAnswer (): number {
    return this.showAnswer
  }
  public setShowAnswer (showAnswer: number): void {
    this.showAnswer = showAnswer
  }
  public getShowAnalysis (): number {
    return this.showAnalysis
  }
  public setShowAnalysis (showAnalysis: number): void {
    this.showAnalysis = showAnalysis
  }
}
