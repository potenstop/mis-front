/**
 *
 * 功能描述:
 *
 * @className AlbumCourseListItemRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty } from 'papio-h5'

export class AlbumCourseUpdateRequest {
  @JsonProperty
  private albumId: number
  @JsonProperty
  private albumDesc: string
  @JsonProperty
  private albumName: string
  @JsonProperty
  private courseId: number
  public getAlbumId (): number {
    return this.albumId;
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId;
  }
  public getAlbumDesc (): string {
    return this.albumDesc
  }
  public setAlbumDesc (albumDesc: string): void {
    this.albumDesc = albumDesc
  }
  public getAlbumName (): string {
    return this.albumName
  }
  public setAlbumName (albumName: string): void {
    this.albumName = albumName
  }
  public getCourseId (): number {
    return this.courseId
  }
  public setCourseId (courseId: number): void {
    this.courseId = courseId
  }
}
