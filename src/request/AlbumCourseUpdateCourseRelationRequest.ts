/**
 *
 * 功能描述:
 *
 * @className AlbumCourseUpdateCourseRelationRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'

export class AlbumCourseUpdateCourseRelationRequest {
  @JsonProperty
  private albumId: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', Number))
  private contentIdList: number[]
  public getAlbumId (): number {
    return this.albumId
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId
  }
  public getContentIdList (): number[] {
    return this.contentIdList
  }
  public setContentIdList (contentIdList: number[]): void {
    this.contentIdList = contentIdList
  }
}
