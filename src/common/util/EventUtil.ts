/**
 *
 * 功能描述:
 *
 * @className EventUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 11:18
 */
export class EventUtil {
  /***
   * 绑定事件
   * @param element
   * @param event
   * @param handler
   */
  public static on (element: Element | null | Window | Document, event: string, handler: EventListener) {
    if (document.addEventListener) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    } else {
      if (element && event && handler) {
        (<any>element).attachEvent('on' + event, handler)
      }
    }
  }
  /***
   * 移除事件
   * @param element
   * @param event
   * @param handler
   */
  public static off (element: Element | null | Window | Document, event: string, handler: EventListener) {
    if (document.addEventListener) {
      if (element && event && handler) {
        element.removeEventListener(event, handler, false)
      }
    } else {
      if (element && event && handler) {
        (<any>element).detachEvent('on' + event, handler)
      }
    }
  }
}
