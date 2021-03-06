import { JsonProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseListItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/10/27 9:21
 */
export class AlbumCourseListItemResponse {
  @JsonProperty
  private albumDesc: string
  @JsonProperty
  private albumId: number
  @JsonProperty
  private albumName: string
  @JsonProperty
  private contentCount: number
  @JsonProperty
  private courseId: number
  @JsonProperty
  private courseName: string
  @JsonProperty
  private createTime: string
  @JsonProperty
  private updateTime: string
  public getAlbumDesc (): string {
    return this.albumDesc
  }
  public setAlbumDesc (albumDesc: string): void {
    this.albumDesc = albumDesc
  }
  public getAlbumId (): number {
    return this.albumId
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId
  }
  public getAlbumName (): string {
    return this.albumName
  }
  public setAlbumName (albumName: string): void {
    this.albumName = albumName
  }
  public getContentCount (): number {
    return this.contentCount
  }
  public setContentCount (contentCount: number): void {
    this.contentCount = contentCount
  }
  public getCourseId (): number {
    return this.courseId
  }
  public setCourseId (courseId: number): void {
    this.courseId = courseId
  }
  public getCourseName (): string {
    return this.courseName
  }
  public setCourseName (courseName: string): void {
    this.courseName = courseName
  }
  public getCreateTime (): string {
    return this.createTime
  }
  public setCreateTime (createTime: string): void {
    this.createTime = createTime
  }
  public getUpdateTime (): string {
    return this.updateTime
  }
  public setUpdateTime (updateTime: string): void {
    this.updateTime = updateTime
  }
}
