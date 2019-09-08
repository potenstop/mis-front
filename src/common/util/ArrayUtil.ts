/**
 *
 * 功能描述:
 *
 * @className ArrayUtil
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/8 16:20
 */
export class ArrayUtil {
  /**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
  public static getUnion(arr1: Array<any>, arr2: Array<any>) {
    return Array.from(new Set([...arr1, ...arr2]));
  };
}
