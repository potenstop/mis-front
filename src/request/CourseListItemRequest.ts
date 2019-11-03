/**
 *
 * 功能描述:
 *
 * @className ContentNewsListRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/25 16:00
 */
import { PageRequest } from '@/bmo/PageRequest'
import { JsonProperty } from 'papio-h5'

export class CourseListItemRequest extends PageRequest {
  @JsonProperty
  private courseCode: string
  @JsonProperty
  private courseId: number
  @JsonProperty
  private courseName: string
  @JsonProperty
  private courseSecondId: number
  @JsonProperty
  private courseStairId: number
  @JsonProperty
  private courseThreeId: number
  public getCourseCode (): string {
    return this.courseCode
  }
  public setCourseCode (courseCode: string): void {
    this.courseCode = courseCode
  }
  public getCourseId (): number {
    return this.courseId
  }
  public setCourseId (courseId: number): void {
    this.courseId = courseId
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
  public getCourseThreeId (): number {
    return this.courseThreeId
  }
  public setCourseThreeId (courseThreeId: number): void {
    this.courseThreeId = courseThreeId
  }

}
