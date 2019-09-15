/**
 *
 * 功能描述:
 *
 * @className PageRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/11 19:18
 */
import { JsonProperty } from 'papio-h5'

export class PageRequest {
  @JsonProperty
  private pageNum: number
  @JsonProperty
  private pageSize: number
  @JsonProperty
  private orderBy: string

  constructor() {
    this.pageNum = 1
    this.pageSize = 20
  }
  public getPageNum (): number {
    return this.pageNum
  }
  public setPageNum (pageNum: number): void {
    this.pageNum = pageNum
  }
  public getPageSize (): number {
    return this.pageSize
  }
  public setPageSize (pageSize: number): void {
    this.pageSize = pageSize
  }
  public getOrderBy (): string {
    return this.orderBy
  }
  public setOrderBy (orderBy: string): void {
    this.orderBy = orderBy
  }
}
