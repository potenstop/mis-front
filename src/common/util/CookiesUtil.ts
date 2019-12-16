import Cookies from 'js-cookie'
import config from '@/config/ProjectConfig'
import { ItemContentTopic } from '@/components/item/topic/ItemContentTopic'

const { cookieExpires, tokenKey } = config
/**
 *
 * 功能描述:
 *
 * @className CookiesUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/10 16:12
 */
export class CookiesUtil {
  public static setToken (token: string) {
    Cookies.set(tokenKey, token, { expires: cookieExpires || 1 })
  }
  public static getToken (): string | boolean {
    const token = Cookies.get(tokenKey)
    if (token) return token
    else return false
  }
}
