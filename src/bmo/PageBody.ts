/**
 *
 * 功能描述:
 *
 * @className PageBody
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/11 19:18
 */
import { JsonProperty } from 'papio-h5'

export class PageBody {
  @JsonProperty
  private pageIndex: number
  @JsonProperty
  private pageSize: number
  @JsonProperty
  private orderBy: string

  constructor() {
    this.pageIndex = 1
    this.pageSize = 20
  }
  public getPageIndex (): number {
    return this.pageIndex
  }
  public setPageIndex (pageIndex: number): void {
    this.pageIndex = pageIndex
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
