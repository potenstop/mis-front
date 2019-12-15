import { JsonProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemListItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/10/27 9:21
 */
export class AlbumCourseProblemListItemResponse {
  @JsonProperty
  private albumCourseId: number
  @JsonProperty
  private albumCourseProblemId: number
  @JsonProperty
  private albumId: number
  @JsonProperty
  private answerContentCount: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private state: number
  @JsonProperty
  private totalContentCount: number
  @JsonProperty
  private updateTime: string
  @JsonProperty
  private userId: number
  public getAlbumCourseId (): number {
    return this.albumCourseId
  }
  public setAlbumCourseId (albumCourseId: number): void {
    this.albumCourseId = albumCourseId
  }
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
  public getAnswerContentCount (): number {
    return this.answerContentCount
  }
  public setAnswerContentCount (answerContentCount: number): void {
    this.answerContentCount = answerContentCount
  }
  public getCreateTime (): string {
    return this.createTime
  }
  public setCreateTime (createTime: string): void {
    this.createTime = createTime
  }
  public getState (): number {
    return this.state
  }
  public setState (state: number): void {
    this.state = state
  }
  public getTotalContentCount (): number {
    return this.totalContentCount
  }
  public setTotalContentCount (totalContentCount: number): void {
    this.totalContentCount = totalContentCount
  }
  public getUpdateTime (): string {
    return this.updateTime
  }
  public setUpdateTime (updateTime: string): void {
    this.updateTime = updateTime
  }
  public getUserId (): number {
    return this.userId
  }
  public setUserId (userId: number): void {
    this.userId = userId
  }
}
