/**
 *
 * 功能描述:
 *
 * @className CourseAddRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'

export class CourseAddRequest {
  @JsonProperty
  public courseCode: string
  @JsonProperty
  public courseName: string
  @JsonProperty
  public courseSecondId: number
  @JsonProperty
  public courseStairId: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', Number))
  public courseThreeIdList: number[]
  public getCourseCode (): string {
    return this.courseCode
  }
  public setCourseCode (courseCode: string): void {
    this.courseCode = courseCode
  }
  public getCourseName (): string {
    return this.courseName
  }
  public setCourseName (courseName: string): void {
    this.courseName = courseName
  }
  public getCourseSecondId (): number {
    return this.courseSecondId
  }
  public setCourseSecondId (courseSecondId: number): void {
    this.courseSecondId = courseSecondId
  }
  public getCourseStairId (): number {
    return this.courseStairId
  }
  public setCourseStairId (courseStairId: number): void {
    this.courseStairId = courseStairId
  }
  public getCourseThreeIdList (): number[] {
    return this.courseThreeIdList
  }
  public setCourseThreeIdList (courseThreeIdList: number[]): void {
    this.courseThreeIdList = courseThreeIdList
  }
}
