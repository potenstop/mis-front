/**
 *
 * 功能描述:
 *
 * @className UserListRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/11 19:22
 */
import { PageRequest } from '@/bmo/PageRequest'
import { JsonProperty } from 'papio-h5'

export class UserListRequest extends PageRequest {
  @JsonProperty
  private userId: number
  @JsonProperty
  private nickname: string
  @JsonProperty
  private createTime: string
  @JsonProperty
  private updateTime: string
  public getUserId (): number {
    return this.userId
  }
  public setUserId (userId: number): void {
    this.userId = userId
  }
  public getNickname (): string {
    return this.nickname
  }
  public setNickname (nickname: string): void {
    this.nickname = nickname
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
