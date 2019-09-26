/**
 *
 * 功能描述:
 *
 * @className Component
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/9/25 16:19
 */
export interface SimplePageTableCustomFilter {
  type: 'inputNumber' | 'inputText' | 'date' | 'datetime' | 'dateScope' | 'datetimeScope' | 'selectSign' | 'selectMul'
  option?: { label: string, value: string | number }[]
}
export interface SimplePageTableColumn {
  width?: number
  title: string
  key: string
  sortable?: boolean
  customFilter?: SimplePageTableCustomFilter
  simpleOption?: { label: string, value: string | number }[]
  optionList?: any[]
}
