<template>
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <ul
      v-show="visible"
      :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
      class="contextmenu"
    >
      <li
        v-for="(item, key) of menuList"
        @click="handleTagsOption(key)"
        :key="key"
      >
        {{ item }}
      </li>
    </ul>
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div
      class="scroll-outer"
      ref="scrollOuter"
      @DOMMouseScroll="handlescroll"
      @mousewheel="handlescroll"
    >
      <div
        ref="scrollBody"
        class="scroll-body"
        :style="{ left: tagBodyLeft + 'px' }"
      >
        <transition-group name="taglist-moving-animation">
          <Tag
            type="dot"
            v-for="(item, index) in list"
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            :name="item.name"
            :data-route-item="item"
            @on-close="handleClose(item)"
            @click.native="handleClick(item)"
            :closable="item.name !== $config.homeName"
            :color="isCurrentTag(item) ? 'primary' : 'default'"
            @contextmenu.prevent.native="contextMenu(item, $event)"
          >{{ showTitleInside(item) }}</Tag
          >
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { RouterUtil } from '@/common/util/RouterUtil'
import { BeforeCloseRouter } from '@/router/BeforeCloseRouter'
import { Tag } from 'view-design'

@Component
export default class TagsNav extends Vue {
    @Prop({ default: () => [] }) readonly list!: Route[];
    @Prop(Object) readonly value!: Partial<Route>;

    name = 'TagsNav';

    refsTag: Tag[] = [];

    // data
    tagBodyLeft = 0;
    rightOffset = 40;
    outerPadding = 4;
    contextMenuLeft = 0;
    contextMenuTop = 0;
    visible = false;
    menuList = {
      others: '关闭其他',
      all: '关闭所有'
    };

    get currentRouteObj () {
      const { name, params, query } = this.value
      return { name, params, query }
    }

    handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    }

    handleScroll (offset) {
      const outerWidth = (this.$refs.scrollOuter as HTMLElement).offsetWidth
      const bodyWidth = (this.$refs.scrollBody as HTMLElement).offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            // this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            )
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    }

    handleTagsOption (type) {
      if (type.includes('all')) {
        // 关闭所有，除了home
        let res = (this.list as Route[]).filter(
          item => item.name === this.$config.homeName
        )
        this.$emit('on-close', res, 'all')
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        let res = (this.list as Route[]).filter(
          item =>
            RouterUtil.routeEqual(this.currentRouteObj, item) ||
            item.name === this.$config.homeName
        )
        this.$emit('on-close', res, 'others', this.currentRouteObj)
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj)
        }, 100)
      }
    }

    handleClose (current) {
      if (
        current.meta &&
        current.meta.beforeCloseName &&
        current.meta.beforeCloseName in BeforeCloseRouter
      ) {
        new Promise((resolve) => {
          return BeforeCloseRouter[current.meta.beforeCloseName](resolve, this)
        }).then(close => {
          if (close) {
            this.close(current)
          }
        })
      } else {
        this.close(current)
      }
    }

    close (route) {
      let res = this.list.filter(item => !RouterUtil.routeEqual(route, item))
      console.log('11111111111111111111111')
      this.$emit('on-close', res, undefined, route)
    }

    handleClick (item) {
      this.$emit('input', item)
    }

    showTitleInside (item) {
      return RouterUtil.showTitle(item, this)
    }

    isCurrentTag (item) {
      return RouterUtil.routeEqual(this.currentRouteObj, item)
    }

    moveToView (tag) {
      const outerWidth = (this.$refs.scrollOuter as HTMLElement).offsetWidth
      const bodyWidth = (this.$refs.scrollBody as HTMLElement).offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        )
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        )
      }
    }

    getTagElementByRoute (route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened as Tag[]
        this.refsTag.forEach((item, index) => {
          if (
            RouterUtil.routeEqual(route, item.$attrs['data-route-item'] as Partial<Route>)
          ) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    }

    contextMenu (item, e) {
      if (item.name === this.$config.homeName) {
        return
      }
      this.visible = true
      const offsetLeft = this.$el.getBoundingClientRect().left
      this.contextMenuLeft = e.clientX - offsetLeft + 10
      this.contextMenuTop = e.clientY - 64
    }

    closeMenu () {
      this.visible = false
    }

    @Watch('$route')
    routeChanged (to) {
      this.getTagElementByRoute(to)
    }

    @Watch('visible')
    visibleChanged (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }

    mounted () {
      setTimeout(() => {
        this.getTagElementByRoute(this.$route)
      }, 200)
    }
}
</script>

<style lang="less">
  .no-select{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .size{
    width: 100%;
    height: 100%;
  }
  .tags-nav{
    position: relative;
    border-top: 1px solid #F0F0F0;
    border-bottom: 1px solid #F0F0F0;
    .no-select;
    .size;
    .close-con{
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 32px;
      background: #fff;
      text-align: center;
      z-index: 10;
    }
    .btn-con{
      position: absolute;
      top: 0px;
      height: 100%;
      background: #fff;
      padding-top: 3px;
      z-index: 10;
      button{
        padding: 6px 4px;
        line-height: 14px;
        text-align: center;
      }
      &.left-btn{
        left: 0px;
      }
      &.right-btn{
        right: 32px;
        border-right: 1px solid #F0F0F0;
      }
    }
    .scroll-outer{
      position: absolute;
      left: 28px;
      right: 61px;
      top: 0;
      bottom: 0;
      box-shadow: 0px 0 3px 2px rgba(100,100,100,.1) inset;
      .scroll-body{
        height: ~"calc(100% - 1px)";
        display: inline-block;
        padding: 1px 4px 0;
        position: absolute;
        overflow: visible;
        white-space: nowrap;
        transition: left .3s ease;
        .ivu-tag-dot-inner{
          transition: background .2s ease;
        }
      }
    }
    .contextmenu {
      position: absolute;
      margin: 0;
      padding: 5px 0;
      background: #fff;
      z-index: 1000;
      list-style-type: none;
      border-radius: 4px;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .1);
      li {
        margin: 0;
        padding: 5px 15px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
