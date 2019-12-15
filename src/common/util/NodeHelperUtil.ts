/**
 *
 * 功能描述:
 *
 * @className NodeHelperUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 11:37
 */
export class NodeHelperUtil {
  public static findNodeUpperByClasses (ele: Element, classes: string[]): any {
    // 上层元素元素是包含classes
    let parentNode = ele.parentNode as Element
    if (parentNode) {
      let classList = parentNode.classList
      if (
        classList &&
        classes.every(className => classList.contains(className))
      ) {
        return parentNode
      } else {
        return NodeHelperUtil.findNodeUpperByClasses(parentNode, classes)
      }
    }
  }
}
