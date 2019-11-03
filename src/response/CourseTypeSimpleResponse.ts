import {JsonProperty} from "papio-h5"

/**
 *
 * 功能描述:
 *
 * @className CourseTypeSimpleResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:46
 */
export class CourseTypeSimpleResponse {
  @JsonProperty
  private courseTypeId: number
  @JsonProperty
  private typeName: string
  public getCourseTypeId (): number {
    return this.courseTypeId
  }
  public setCourseTypeId (courseTypeId: number): void {
    this.courseTypeId = courseTypeId
  }
  public getTypeName (): string {
    return this.typeName
  }
  public setTypeName (typeName: string): void {
    this.typeName = typeName
  }
}
