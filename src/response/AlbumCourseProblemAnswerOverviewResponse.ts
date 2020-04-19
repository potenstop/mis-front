import { JsonProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemAnswerOverviewResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/10/27 9:21
 */
export class AlbumCourseProblemAnswerOverviewResponse {
  @JsonProperty
  private albumCourseProblemId: number
  @JsonProperty
  private submitTime: string
  @JsonProperty
  private problemGradeAmount: number
  @JsonProperty
  private problemAmount: number
  @JsonProperty
  private siteRank: number
  @JsonProperty
  private correctRate: number
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
  public getSubmitTime (): string {
    return this.submitTime
  }
  public setSubmitTime (submitTime: string): void {
    this.submitTime = submitTime
  }
  public getProblemGradeAmount (): number {
    return this.problemGradeAmount
  }
  public setProblemGradeAmount (problemGradeAmount: number): void {
    this.problemGradeAmount = problemGradeAmount
  }
  public getProblemAmount (): number {
    return this.problemAmount
  }
  public setProblemAmount (problemAmount: number): void {
    this.problemAmount = problemAmount
  }
  public getSiteRank (): number {
    return this.siteRank
  }
  public setSiteRank (siteRank: number): void {
    this.siteRank = siteRank
  }
  public getCorrectRate (): number {
    return this.correctRate
  }
  public setCorrectRate (correctRate: number): void {
    this.correctRate = correctRate
  }
}
