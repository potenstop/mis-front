<template>
  <div>
    <Row>
      <Col offset="22" style="margin-bottom: 10px">
        <Button v-show="hasActionAdd" type="primary" icon="ios-add" v-on:click="onActionAdd">{{$t("P_ADD")}}</Button>
      </Col>
    </Row>
    <Collapse v-model="collapseValue" @on-change="collapseOnChange">
      <Panel name="filter">
        {{$t("P_VIEW_FILTER")}}
        <ace-editor slot="content" :content="filterContent" v-show="filterShow"></ace-editor>
      </Panel>
    </Collapse>
    <Table
      :data="filters"
      :columns="tableColumnsFilters"
      :border="border"
      :show-header="showHeader"
      :stripe="stripe"
      @on-filter-change="onFilterChange"
      @on-sort-change="onSortChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
    >
    </Table>
    <Table
      ref="simplePageTable"
      :data="insideData"
      :columns="insideColumns"
      :stripe="true"
      :border="border"
      :show-header="false"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      :draggable="draggable"
      :tooltip-theme="tooltipTheme"
      :row-key="rowKey"
      @on-current-change="onCurrentChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
      @on-drag-drop="onDragDrop"
    ><slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          :show-total="pageShowTotal"
          :show-elevator="pageShowElevator"
          :show-sizer="pageShowSizer"
          :class-name="pageClassName"
          :styles="pageStyles"
          :transfer="pageTransfer"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { ConvertUtil, JSHelperUtil } from 'papio-h5'
import AceEditor from '@/components/editor/AceEditor.vue'
import { RefreshEvent } from '@/common/event/RefreshEvent'

@Component({
  components: { AceEditor }
})
export default class SimplePageTable extends Vue {
  @Prop({ default: () => [] }) data!: any[];
  @Prop({ default: () => [] }) readonly columns!: any[];
  @Prop({ default: true }) readonly stripe!: boolean;
  @Prop({ default: true }) readonly border!: boolean;
  @Prop({ default: true }) readonly showHeader!: boolean;
  @Prop([Number, String]) readonly width!: Number | String | undefined;
  @Prop([Number, String]) readonly height!: Number | String | undefined;
  @Prop([Number, String]) readonly maxHeight!: Number | String | undefined;
  @Prop({ default: false }) readonly disabledHover!: boolean;
  @Prop({ default: false }) readonly highlightRow!: boolean;
  @Prop({ type: Function, default: () => '' }) readonly rowClassName!: Function;
  @Prop(String) readonly size!: string | undefined;
  @Prop(String) readonly noDataText!: string | undefined;
  @Prop(String) readonly noFilteredDataText!: string | undefined;
  @Prop({ default: false }) readonly draggable !: boolean;
  @Prop({ default: 'dark' }) readonly tooltipTheme!: string;
  @Prop({ default: false }) readonly rowKey!: boolean;
  @Prop({ default: true }) readonly pageShowTotal!: boolean;
  @Prop({ default: true }) readonly pageShowElevator!: boolean;
  @Prop({ default: true }) readonly pageShowSizer!: boolean;
  @Prop(String) readonly pageClassName!: string| undefined;
  @Prop(Object) readonly pageStyles!: Object| undefined;
  @Prop({ default: true }) readonly pageTransfer!: boolean;
  @Prop(Function) readonly apiAdd!: Function | undefined;
  @Prop(Function) readonly apiDelete!: Function | undefined;
  @Prop(Function) readonly apiDetail!: Function | undefined;
  @Prop(Function) readonly apiUpdate!: Function | undefined;
  @Prop(Function) readonly apiList!: Function | undefined;
  @Prop({ default: true }) readonly hasActionAdd!: boolean;
  @Prop(Function) readonly childStartInit!: Function | undefined;
  @Prop({ default: 'default' }) readonly viewName!: string | undefined;

  private name = 'SimplePageTable'
  private insideData: any[] = []
  private insideColumns: any[] = []
  private pageTotal: number = 0
  private pageCurrent: number = 1
  private pageSize: number = 20
  private sortBy = ''
  private loading = true
  private filterContent: string = ''
  private filterData: Map<string, string> = new Map<string, string>()
  private search = {}
  private tableColumnsFilters: any[] = []
  private filterShow: boolean = false
  private collapseValue: string = null
  private filters = [{
    title: ''
  }]
  private recountValueMap: Map<string, Function> = new Map<string, Function>()
  // 以item.key的值为map的key item为value
  private columnsMap: Map<string, any> = new Map<string, any>()
  // 渲染的key和数据的key映射
  private columnsValueItemKeyAndKeyMap: Map<string, any> = new Map<string, string>()

  onCurrentChange (currentRow, oldCurrentRow) {
    this.$emit('on-current-change', currentRow, oldCurrentRow)
  }

  onSelect (selection, row) {
    this.$emit('on-select', selection, row)
  }

  onSelectCancel (selection, row) {
    this.$emit('on-select-cancel', selection, row)
  }

  onSelectAll (selection) {
    this.$emit('on-select-all', selection)
  }

  onSelectionChange (selection) {
    this.$emit('on-selection-change', selection)
  }

  onSortChange (column) {
    if (!column.order || column.order === 'normal') {
      this.sortBy = ''
    } else {
      this.sortBy = ConvertUtil.toLine(column.key) + ' ' + column.order
    }
    this.load()
  }

  async onFilterChange (row) {
    let value = null
    if (Array.isArray(row._filterChecked) && row._filterChecked.length > 0) {
      value = row._filterChecked.join(',')
    }
    this.validInputValue(row._index, value)
    this.$emit('on-filter-change', row)
  }

  onRowClick (row, index) {
    this.$emit('on-row-click', row, index)
  }

  onRowDblclick (row, index) {
    this.$emit('on-row-dblclick', row, index)
  }

  onExpand (row, status) {
    this.$emit('on-expand', row, status)
  }

  onDragDrop (index1, index2) {
    this.$emit('on-drag-drop', index1, index2)
  }
  async pageSizeChange (pageSize: number) {
    this.pageSize = pageSize
    this.$emit('on-page-size-change', pageSize)
    await this.load()
  }

  async pageChange (current: number) {
    this.pageCurrent = current
    this.$emit('on-page-change', current)
    await this.load()
  }

  collapseOnChange (value) {
    if (value.length === 1) {
      this.filterShow = true
      const requestBody = this.getRequestBody()
      if (this.filterShow) {
        this.drawResCode(JSON.stringify(requestBody, null, 4))
      }
    } else {
      this.filterShow = false
    }
  }

  onActionAdd () {
    this.$emit('on-action-add')
  }
  get shownColumns () {
    return this.columns.filter(c => c.key !== 'handle')
  }
  async handleColumns () {
    let index = 0
    for (const item of this.columns) {
      if (JSHelperUtil.isNullOrUndefined(item.responseKey)) {
        item.responseKey = item.key
      }
      if (JSHelperUtil.isNullOrUndefined(item.requestKey)) {
        item.requestKey = item.key
      }
      this.columnsMap.set(item.key, item)
      this.columnsValueItemKeyAndKeyMap[item.responseKey] = item.key
      // 重新计算value的值
      if (typeof item.getValue === 'function') {
        this.recountValueMap.set(item.responseKey, item.getValue)
      }
      let customFilter = {}
      /**
       * 因为是采用的两个表的形式,过滤表中显示查询的Input,Select条件输组件,表头显示的是数据表的表头,渲染的数据是传入的columns中的filter字段
       * 数据表隐藏表头,只显示数据,渲染的数据是传入的columns中的key值
       */
      // 将传入的列描述数据对象(columns) 的title和width 复制给 过滤表的列描述数据对象(tableColumnsFilters)
      this.$set(customFilter, 'title', item.title)
      if (item.width) {
        this.$set(customFilter, 'width', item.width)
      }
      let render = (h) => {}
      // 判断是否为_option
      if (item.key === '_option' && Array.isArray(item.optionList)) {
        item.render = (h, params) => {
          const propList = []
          item.optionList.forEach(op => {
            propList.push(h('Button', {
              props: {
                icon: op.icon,
                type: op.buttonType,
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  if (typeof op.click === 'function') {
                    op.click(this.insideData[params.index], params.index)
                  }
                }
              }
            }, op.text))
          })
          return h('div', propList)
        }
      }
      // 如果存在 过滤选项
      if (item.customFilter && item.customFilter.type) {
        if (item.customFilter.type === 'inputNumber') {
          render = this.getInputNumber(index)
        } else if (item.customFilter.type === 'inputText') {
          render = this.getInputText(index)
        } else if (item.customFilter.type === 'date') {
          render = this.getInputDate(index)
        } else if (item.customFilter.type === 'datetime') {
          render = this.getInputDatetime(index)
        } else if (item.customFilter.type === 'dateScope') {
          render = this.getInputDateScope(index)
        } else if (item.customFilter.type === 'datetimeScope') {
          render = this.getInputDatetimeScope(index)
        } else if (item.customFilter.type === 'selectSign') {
          if ('remoteOption' in item.customFilter && typeof item.customFilter.remoteOption === 'function') {
            item.customFilter.option = await item.customFilter.remoteOption()
          }
          this.$set(customFilter, 'filters', item.customFilter.option)
          this.$set(customFilter, 'filterRemote', () => {})
          this.$set(customFilter, 'filterMultiple', false)
        } else if (item.customFilter.type === 'selectMul') {
          if ('remoteOption' in item.customFilter && typeof item.customFilter.remoteOption === 'function') {
            item.customFilter.option = await item.customFilter.remoteOption()
          }
          this.$set(customFilter, 'filters', item.customFilter.option)
          this.$set(customFilter, 'filterRemote', () => {})
          this.$set(customFilter, 'filterMultiple', true)
        }
      }
      this.$set(customFilter, 'render', render)
      this.$set(customFilter, 'sortable', item.sortable)
      this.$set(customFilter, 'key', item.key)
      this.tableColumnsFilters.push(customFilter)
      if (item.simpleOption) {
        this.$set(item, 'render', (h, params) => {
          let label = ''
          if (this.insideData[params.index]) {
            params.column.simpleOption.forEach((o) => {
              if (o.value + '' === this.insideData[params.index][params.column.key] + '') {
                label = o.label
              }
            })
            return h('span', label)
          }
        })
      }
      index++
    }
    this.insideColumns = this.columns
  }
  /**
   * 文本输入
   * @param index
   */
  getInputText (index: number): (h: any) => any {
    return (h) => {
      // 获取输入框的值,为了减少数据库的压力,我这里是
      // 通过回车和点击搜索按钮才进行数据过滤查询,如果
      // 要输入框变化就进行过滤,把 this.load()放到
      // input事件方法就行了
      let inputValue = {}
      return h('Input', {
        props: {
          placeholder: '输入' + this.columns[index].title,
          type: 'text',
          icon: 'ios-search'
        },
        on: {
          input: val => {
            inputValue = val
            if (!inputValue) {
              this.validInputValue(index, inputValue)
            }
          },
          // input框后面的搜索按钮的点击事件
          'on-click': () => {
            this.validInputValue(index, inputValue)
          },
          'on-enter': () => {
            this.validInputValue(index, inputValue)
          }
        }
      })
    }
  }
  /**
   * number输入
   * @param index
   */
  getInputNumber (index: number): (h: any) => any {
    return (h) => {
      // 获取输入框的值,为了减少数据库的压力,我这里是
      // 通过回车和点击搜索按钮才进行数据过滤查询,如果
      // 要输入框变化就进行过滤,把 this.load()放到
      // input事件方法就行了
      let inputValue = {}
      return h('Input', {
        props: {
          placeholder: '输入' + this.columns[index].title,
          type: 'number',
          icon: 'ios-search'
        },
        on: {
          input: val => {
            inputValue = val
            if (!inputValue) {
              this.validInputValue(index, inputValue)
            }
          },
          // input框后面的搜索按钮的点击事件
          'on-click': () => {
            this.validInputValue(index, inputValue)
          },
          'on-enter': () => {
            this.validInputValue(index, inputValue)
          }
        }
      })
    }
  }
  /**
   * Date输入
   * @param index
   */
  getInputDate (index: number): (h: any) => any {
    return (h) => {
      let inputValue: string = null
      return h('DatePicker', {
        props: {
          placeholder: '选择' + this.columns[index].title + '日期',
          type: 'date',
          transfer: true,
          confirm: true
        },
        on: {
          'on-change': (value: string) => {
            inputValue = value
          },
          'on-ok': () => {
            this.validInputValue(index, inputValue)
          }
        }
      })
    }
  }
  /**
   * Datetime输入
   * @param index
   */
  getInputDatetime (index: number): (h: any) => any {
    return (h) => {
      let inputValue: string = null
      return h('DatePicker', {
        props: {
          placeholder: '选择' + this.columns[index].title + '日期',
          type: 'datetime',
          transfer: true,
          confirm: true
        },
        on: {
          'on-change': (value: string) => {
            inputValue = value
          },
          'on-ok': () => {
            this.validInputValue(index, inputValue)
          }
        }
      })
    }
  }
  /**
   * Date输入
   * @param index
   */
  getInputDateScope (index: number): (h: any) => any {
    return (h) => {
      let inputValue: string = null
      return h('DatePicker', {
        props: {
          placeholder: '选择' + this.columns[index].title + '日期',
          type: 'daterange',
          transfer: true,
          confirm: true,
          options: {
            disabledDate: this.columns[index].customFilter.disabledDate
          }
        },
        on: {
          'on-change': (value: string[]) => {
            if (value) {
              if (value.length === 2 && value[0].length > 1 && value[1].length > 1) {
                inputValue = value.join(',')
              } else {
                // 清除了
                inputValue = null
                this.validInputValue(index, inputValue)
              }
            } else {
              inputValue = null
            }
          },
          'on-ok': () => {
            this.validInputValue(index, inputValue)
          }
        }
      })
    }
  }
  /**
   * Datetime输入
   * @param index
   */
  getInputDatetimeScope (index: number): (h: any) => any {
    return (h) => {
      let inputValue: string = null
      return h('DatePicker', {
        props: {
          placeholder: '选择' + this.columns[index].title + '日期',
          type: 'datetimerange',
          transfer: true,
          confirm: true
        },
        on: {
          'on-change': (value: string[]) => {
            if (value) {
              if (value.length === 2 && value[0].length > 1 && value[1].length > 1) {
                inputValue = value.join(',')
              } else {
                // 清除了
                inputValue = null
                this.validInputValue(index, inputValue)
              }
            } else {
              inputValue = null
            }
          },
          'on-ok': () => {
            this.validInputValue(index, inputValue)
          }
        }
      })
    }
  }
  // 重新加载数据
  async load () {
    this.loading = true
    // 会执行一个load的事件
    await this.handleList()
    this.loading = false
  }
  // 验证输入框的值
  validInputValue (index, inputValue) {
    const current = this.columns[index]
    if (!inputValue) {
      this.filterData.delete(current.requestKey)
      this.load()
      return
    }
    this.filterData.set(current.requestKey, inputValue)
    this.load()
  }

  getRequestBody () {
    const requestBody = {}
    requestBody['pageNum'] = this.pageCurrent
    requestBody['pageSize'] = this.pageSize
    if (this.sortBy.length > 0) {
      requestBody['orderBy'] = this.sortBy
    }
    this.filterData.forEach((value, key) => {
      requestBody[key] = value
    })
    return requestBody
  }
  async handleList () {
    if (this.apiList) {
      try {
        const requestBody = this.getRequestBody()
        if (this.filterShow) {
          this.drawResCode(JSON.stringify(requestBody, null, 4))
        }
        const result = await this.apiList(requestBody)
        const data = ApiUtil.getData(result) as any
        if ('total' in data) {
          this.pageTotal = data.total
        }
        if ('list' in data) {
          data.list.forEach(item => {
            this.recountValueMap.forEach((value, key) => {
              if (key in item) {
                item[this.columnsValueItemKeyAndKeyMap[key]] = value(item[key], item, this)
              }
            })
          })
          this.insideData = data.list
        }
      } catch (e) {
        this.$Message.error(e.message)
      }
    } else {
      this.insideData = this.data
    }
  }
  async created () {
    RefreshEvent.on(this.viewName, async () => {
      await this.load()
    })
    if (this.childStartInit) {
      await this.childStartInit()
    }
    await this.handleColumns()
    await this.load()
  }
  drawResCode (content: string) {
    this.filterContent = content
  }
}
</script>
<style lang="less">

</style>
