/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemAddRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty } from 'papio-h5'

export class AlbumCourseProblemAddRequest {
  @JsonProperty
  private albumId: number
  public getAlbumId (): number {
    return this.albumId
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId
  }
}
