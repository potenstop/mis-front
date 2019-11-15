import {JsonProperty, ReturnGenericsProperty} from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseViewResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:46
 */
export class AlbumCourseViewResponse {
  @JsonProperty
  private albumId: number
  @JsonProperty
  private albumName: string
  @JsonProperty
  private albumDesc: string
  @JsonProperty
  private courseId: number
  @JsonProperty
  private courseName: string
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', Number))
  private contentIdList: number[]
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
  public getAlbumDesc (): string {
    return this.albumDesc
  }
  public setAlbumDesc (albumDesc: string): void {
    this.albumDesc = albumDesc
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
  public getContentIdList (): number[] {
    return this.contentIdList
  }
  public setContentIdList (contentIdList: number[]): void {
    this.contentIdList = contentIdList
  }
}
