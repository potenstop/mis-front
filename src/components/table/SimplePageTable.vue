<template>
  <div>
    <Table
      :data="filters"
      :columns="tableColumnsFilters"
      :border="border"
      :show-header="showHeader"
      :stripe="stripe"
    >
    </Table>
    <Table
      ref="simplePageTable"
      :data="insideData"
      :columns="insideColumns"
      :stripe="stripe"
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
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
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

@Component
export default class SimplePageTable extends Vue {
  @Prop({ default: () => [] }) data!: any[];
  @Prop({ default: () => [] }) readonly columns!: any[];
  @Prop({ default: true }) readonly stripe!: boolean;
  @Prop({ default: true }) readonly border!: boolean;
  @Prop({ default: true }) readonly showHeader!: boolean;
  @Prop([Number, String]) readonly width!: Number | String | undefined;
  @Prop([Number, String]) readonly height!: Number | String | undefined;
  @Prop([Number, String]) readonly maxHeight!: Number | String | undefined;
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop({ default: false }) readonly disabledHover!: boolean;
  @Prop({ default: false }) readonly highlightRow!: boolean;
  @Prop({ type: Function, default: () => '' }) readonly rowClassName!: Function;
  @Prop(String) readonly size!: string | undefined;
  @Prop(String) readonly noDataText!: string | undefined;
  @Prop(String) readonly noFilteredDataText!: string | undefined;
  @Prop({ default: false }) readonly draggable !: boolean;
  @Prop({ default: 'dark' }) readonly tooltipTheme!: string;
  @Prop({ default: false }) readonly rowKey!: boolean;
  @Prop({ default: 0 }) pageTotal!: number;
  @Prop({ default: 1 }) readonly pageCurrent!: number;
  @Prop({ default: 20 }) readonly pageSize!: number;
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

  name = 'SimplePageTable'
  insideData: any[] = []
  insideColumns: any[] = []
  sortBy = ''
  filterData: Map<string, string> = new Map<string, string>()
  search = {}
  tableColumnsFilters: any[] = []
  filters = [{
    title: ''
  }]

  onTest () {
    alert(11)
  }
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
    this.sortBy = column.key + ' ' + column.order
    console.log(this.sortBy)
    this.handleList()
    this.$emit('on-sort-change', column)
  }

  async onFilterChange (row) {
    if (this.filterData.has(row.key)) {
      this.filterData.delete(row.key)
    }
    if (Array.isArray(row._filterChecked) && row._filterChecked.length > 0) {
      this.filterData.set(row.key, row._filterChecked.join(','))
    }
    await this.handleList()
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
  pageSizeChange (current: number) {
    this.$emit('on-page-size-change', current)
  }

  pageChange (pageSize: number) {
    this.$emit('on-page-change', pageSize)
  }

  get shownColumns () {
    return this.columns.filter(c => c.key !== 'handle')
  }
  handleColumns () {
    this.insideColumns = this.columns
    this.columns.forEach((item: any, index: number) => {
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
      // 如果存在 过滤选项
      if (item.customFilter && item.customFilter.type) {
        if (item.customFilter.type === 'inputNumber') {
          render = this.getInputNumber(index)
        } else if (item.customFilter.type === 'inputText') {
          render = this.getInputText(index)
        } else if (item.customFilter.type === 'date') {
          render = this.getInputDate(index)
        }
      }
      this.$set(customFilter, 'render', render)
      this.tableColumnsFilters.push(customFilter)
    })
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
      // 获取输入框的值,为了减少数据库的压力,我这里是
      // 通过回车和点击搜索按钮才进行数据过滤查询,如果
      // 要输入框变化就进行过滤,把 this.load()放到
      // input事件方法就行了
      let inputValue = {}
      return h('DatePicker', {
        props: {
          placeholder: '选择' + this.columns[index].title + '日期',
          type: 'date'
        },
        on: {
          'on-change': () => {
            this.validInputValue(index, inputValue)
          }
        }
      })
    }
  }
  // 重新加载数据
  load () {
    // 会执行一个load的事件
    console.log(this.search)
    this.$emit('on-search', this.search)
  }
  // 验证输入框的值
  validInputValue (index, inputValue) {
    if (!inputValue) {
      this.$delete(this.search, this.columns[index].key)
      this.load()
      return
    }
    this.$set(this.search, this.columns[index].key, inputValue)
    this.load()
  }
  async handleList () {
    if (this.apiList && false) {
      try {
        const requestBody = {}
        requestBody['pageIndex'] = this.pageCurrent
        requestBody['pageSize'] = this.pageSize
        if (this.sortBy.length > 0) {
          requestBody['orderBy'] = this.sortBy
        }
        this.filterData.forEach((value, key) => {
          requestBody[key] = value
        })
        console.log('requestBody', requestBody)
        const result = await this.apiList(requestBody)
        const data = ApiUtil.getData(result) as any
        if ('total' in data) {
          this.pageTotal = data.total
        }
        if ('data' in data) {
          this.insideData = data.data
        }
      } catch (e) {
        this.$Message.error(e.message)
      }
    }
    this.insideData = this.data
  }
  async mounted () {
    this.handleColumns()
    await this.handleList()
  }
}
</script>
<style lang="less">

</style>
