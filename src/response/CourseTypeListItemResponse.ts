import { JsonProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className CourseTypeListItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:46
 */
export class CourseTypeListItemResponse {
  @JsonProperty
  private courseTypeId: number
  @JsonProperty
  private createTime: string
  @JsonProperty
  private updateTime: string
  @JsonProperty
  private typeName: string
  @JsonProperty
  private typeCode: string
  @JsonProperty
  private rank: number
  @JsonProperty
  private parentId: number
  @JsonProperty
  private sequence: number
  public getCourseTypeId (): number {
    return this.courseTypeId
  }
  public setCourseTypeId (courseTypeId: number): void {
    this.courseTypeId = courseTypeId
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
  public getTypeName (): string {
    return this.typeName
  }
  public setTypeName (typeName: string): void {
    this.typeName = typeName
  }
  public getTypeCode (): string {
    return this.typeCode
  }
  public setTypeCode (typeCode: string): void {
    this.typeCode = typeCode
  }
  public getRank (): number {
    return this.rank
  }
  public setRank (rank: number): void {
    this.rank = rank
  }
  public getParentId (): number {
    return this.parentId
  }
  public setParentId (parentId: number): void {
    this.parentId = parentId
  }
  public getSequence (): number {
    return this.sequence
  }
  public setSequence (sequence: number): void {
    this.sequence = sequence
  }
}
