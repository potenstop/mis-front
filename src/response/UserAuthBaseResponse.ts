import { UserAuthResponse } from '@/response/UserAuthResponse'
import { JsonProperty } from 'papio-h5'
/**
 *
 * 功能描述:
 *
 * @className UserAuthBaseResponse
 * @projectName web-front
 * @author yanshaowen
 * @date 2019/6/24 14:18
 */

export class UserAuthBaseResponse {
  @JsonProperty
  private userId: number
  @JsonProperty
  private nickname: string
  @JsonProperty
  private avatar: string
  @JsonProperty
  private userAuthList: UserAuthResponse[]
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
  public getUserAuthList (): UserAuthResponse[] {
    return this.userAuthList
  }
  public setUserAuthList (userAuthList: UserAuthResponse[]): void {
    this.userAuthList = userAuthList
  }
}
