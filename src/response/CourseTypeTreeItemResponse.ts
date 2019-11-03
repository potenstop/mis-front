import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className CourseTypeTreeItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 8:18
 */
export class CourseTypeTreeItemResponse {
  @JsonProperty('courseTypeId')
  private value: number

  @JsonProperty('typeName')
  private label: string

  @JsonProperty('childList')
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', CourseTypeTreeItemResponse))
  private children: CourseTypeTreeItemResponse[]

  public getValue (): number {
    return this.value
  }
  public setValue (value: number): void {
    this.value = value
  }
  public getLabel (): string {
    return this.label
  }
  public setLabel (label: string): void {
    this.label = label
  }
  public getChildren (): CourseTypeTreeItemResponse[] {
    return this.children
  }
  public setChildren (children: CourseTypeTreeItemResponse[]): void {
    this.children = children
  }
}
