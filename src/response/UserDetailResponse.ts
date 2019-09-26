import {JsonProperty} from "papio-h5"

/**
 *
 * 功能描述:
 *
 * @className UserDetailResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/25 11:31
 */
export class UserDetailResponse {
  @JsonProperty
  private userId: number
  @JsonProperty
  private nickname: string
  @JsonProperty
  private avatar: string
  @JsonProperty
  private isDelete: number
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
  public getAvatar (): string {
    return this.avatar
  }
  public setAvatar (avatar: string): void {
    this.avatar = avatar
  }
  public getIsDelete (): number {
    return this.isDelete;
  }
  public setIsDelete (isDelete: number): void {
    this.isDelete = isDelete;
  }
}
