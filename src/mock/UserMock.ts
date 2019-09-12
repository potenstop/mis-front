/**
 *
 * 功能描述:
 *
 * @className UserMock
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/11 10:27
 */
import Mock from 'mockjs'
import { ApiResult } from '@/bmo/ApiResult'
import { UserAuthBaseResponse } from '@/response/UserAuthBaseResponse'
import { UserAuthResponse } from '@/response/UserAuthResponse'
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})
Mock.mock(/\/api\/user\/ldap\/login(|\?\S*)$/, (req) => {
  const result = new ApiResult<string>()
  result.setData('5555')
  return result
})
Mock.mock(/\/api\/user\/info(|\?\S*)$/, (req) => {
  const result = new ApiResult<UserAuthBaseResponse>()
  const response = new UserAuthBaseResponse()
  const auth = new UserAuthResponse()
  response.setAvatar('http://cms-bucket.nosdn.127.net/2018/08/13/078ea9f65d954410b62a52ac773875a1.jpeg')
  response.setNickname('yanshaowen')
  response.setUserId(317)

  auth.setIdentifier('10000')
  auth.setUserAuthId(1)
  auth.setIdentityType(1)
  response.setUserAuthList([auth])
  result.setData(response)
  return result
})
export default Mock
