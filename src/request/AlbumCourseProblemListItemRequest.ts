/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemListItemRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/25 16:00
 */
import { PageRequest } from '@/bmo/PageRequest'
import { JsonProperty } from 'papio-h5'

export class AlbumCourseProblemListItemRequest extends PageRequest {
  @JsonProperty
  private albumId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private state: number
  @JsonProperty
  private userId: number
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
  public getState (): number {
    return this.state
  }
  public setState (state: number): void {
    this.state = state
  }
  public getUserId (): number {
    return this.userId
  }
  public setUserId (userId: number): void {
    this.userId = userId
  }
}
