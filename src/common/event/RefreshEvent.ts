/**
 *
 * 功能描述:
 *
 * @className RefreshEvent
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/5 9:49
 */
import EventEmitter from 'events'
class MyRefreshEmitter extends EventEmitter {}
const myRefreshEmitter = new MyRefreshEmitter()
export class RefreshEvent {
  public static on (event: string | symbol, listener: (...args: any[]) => void) {
    return myRefreshEmitter.on(event, listener)
  }
  public static emit (event: string | symbol, ...args: any[]): boolean {
    return myRefreshEmitter.emit(event, args)
  }
}
