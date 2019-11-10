import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { CourseTypeSimpleResponse } from '@/response/CourseTypeSimpleResponse'

/**
 *
 * 功能描述:
 *
 * @className CourseViewResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/14 12:46
 */
export class CourseViewResponse {
  @JsonProperty
  private courseId: number
  @JsonProperty
  private courseName: string
  @JsonProperty
  private courseCode: string
  @JsonProperty
  private courseStairId: number
  @JsonProperty
  private courseStairName: string
  @JsonProperty
  private courseSecondId: number
  @JsonProperty
  private courseSecondName: string
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, any>().set('Array', CourseTypeSimpleResponse))
  private courseThreeList: CourseTypeSimpleResponse[]
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
  public getCourseCode (): string {
    return this.courseCode
  }
  public setCourseCode (courseCode: string): void {
    this.courseCode = courseCode
  }
  public getCourseStairId (): number {
    return this.courseStairId
  }
  public setCourseStairId (courseStairId: number): void {
    this.courseStairId = courseStairId
  }
  public getCourseStairName (): string {
    return this.courseStairName
  }
  public setCourseStairName (courseStairName: string): void {
    this.courseStairName = courseStairName
  }
  public getCourseSecondId (): number {
    return this.courseSecondId
  }
  public setCourseSecondId (courseSecondId: number): void {
    this.courseSecondId = courseSecondId
  }
  public getCourseSecondName (): string {
    return this.courseSecondName
  }
  public setCourseSecondName (courseSecondName: string): void {
    this.courseSecondName = courseSecondName
  }
  public getCourseThreeList (): CourseTypeSimpleResponse[] {
    return this.courseThreeList
  }
  public setCourseThreeList (courseThreeList: CourseTypeSimpleResponse[]): void {
    this.courseThreeList = courseThreeList
  }
}
