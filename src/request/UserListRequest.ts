/**
 *
 * 功能描述:
 *
 * @className UserListRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/11 19:22
 */
import { PageBody } from '@/bmo/PageBody'
import { JsonProperty } from 'papio-h5'

export class UserListRequest extends PageBody{
  @JsonProperty
  private age: number;
  public getAge (): number {
    return this.age
  }
  public setAge (age: number): void {
    this.age = age
  }
}
