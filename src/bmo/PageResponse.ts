/**
 *
 * 功能描述:
 *
 * @className PageResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:49
 */
import { JsonProperty } from 'papio-h5'

export class PageResponse<T> {
  @JsonProperty
  private list: Array<T>
  @JsonProperty
  private total: number
  public getList (): Array<T> {
    return this.list
  }
  public setList (list: Array<T>): void {
    this.list = list
  }
  public getTotal (): number {
    return this.total
  }
  public setTotal (total: number): void {
    this.total = total
  }

}
