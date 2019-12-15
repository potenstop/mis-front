/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemUpdateRequest
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/3 7:58
 */
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ProblemContentTopicRequest } from '@/request/ProblemContentTopicRequest'

export class AlbumCourseProblemUpdateRequest {
  @JsonProperty
  private albumCourseProblemId: number
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', ProblemContentTopicRequest))
  @JsonProperty
  private problemContentTopicList: ProblemContentTopicRequest[]
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
  public getProblemContentTopicList (): ProblemContentTopicRequest[] {
    return this.problemContentTopicList
  }
  public setProblemContentTopicList (problemContentTopicList: ProblemContentTopicRequest[]): void {
    this.problemContentTopicList = problemContentTopicList
  }
}
