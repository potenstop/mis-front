/**
 *
 * 功能描述:
 *
 * @className ScrollUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 11:14
 */
export class ScrollUtil {
  public static scrollTop (el: Element | Window | null, from = 0, to: number, duration = 500, endCallback?: Function) {
    if (el === null) {
      return
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60)
        }
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil((difference / duration) * 50)

    const scroll = (start: number, end: number, step: number) => {
      if (start === end) {
        endCallback && endCallback()
        return
      }

      let d = start + step > end ? end : start + step
      if (start > end) {
        d = start - step < end ? end : start - step
      }

      if (el === <any>window) {
        window.scrollTo(d, d)
      } else {
        (<HTMLElement>el).scrollTop = d
      }
      window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
  }
}
