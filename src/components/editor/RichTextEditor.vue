<template>
  <div>
    <!--
      给editor加key是因为给tinymce keep-alive以后组件切换时tinymce编辑器会显示异常，
      在activated钩子里改变key的值可以让编辑器重新创建
    -->
    <tinymce-editor id="tinymceEditor" :init="tinymceInit" v-model="content" :key="tinymceFlag"></tinymce-editor>
    <Upload
      multiple
      ref="imageUpload"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-success="insertImage"
      style="display:none">
    </Upload>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import TinymceEditor from '@tinymce/tinymce-vue'

import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/bbcode'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/emoticons/js/emojis'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/legacyoutput'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/toc'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
@Component({
  components: {
    TinymceEditor
  }
})
export default class RichTextEditor extends Vue {
  private name = 'RichTextEditor'
  private tinymceFlag = 1
  private tinymceInit = {};
  private content = '本地图片上传功能仅为演示，实际使用需要补全图片存储地址'

  private insertImage () {
    let src = '' // 图片存储地址
    tinymce.execCommand('mceInsertContent', false, `<img src=${src}>`)
  }
  private created () {
    const that = this
    this.tinymceInit = {
      skin_url: '/tinymce/skins/ui/oxide',
      language_url: '/tinymce/langs/zh_CN.js',
      language: 'zh_CN',
      height: 500,
      browser_spellcheck: true, // 拼写检查
      branding: true, // 去水印
      elementpath: false, // 禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: true, // 隐藏最上方menu
      plugins: 'advlist anchor autolink autoresize autosave bbcode charmap code codesample colorpicker contextmenu directionality emoticons fullpage help hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print quickbars save searchreplace spellchecker tabfocus table template textcolor textpattern toc visualblocks visualchars wordcount',
      toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat |table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em',
      fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
      font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
      link_list: [
        { title: '预置链接1', value: 'http://www.tinymce.com' },
        { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
      ],
      image_list: [
        { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
        { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
      ],
      image_class_list: [
        { title: 'None', value: '' },
        { title: 'Some class', value: 'class-name' }
      ],
      importcss_append: true,
      // 自定义文件选择器的回调内容
      file_picker_callback: (resolve, value, meta) => {
        if (meta.filetype === 'file') {
          resolve(value)
        }
        if (meta.filetype === 'image') {
          resolve(value)
        }
        if (meta.filetype === 'media') {
          resolve(value)
        }
      },
      // 为内容模板插件提供预置模板
      templates: [
        { title: '模板1', description: '介绍文字1', content: '模板内容' },
        { title: '模板2', description: '介绍文字2', content: '<div class="mceTmpl"><span class="cdate">CDATE</span>，<span class="mdate">MDATE</span>，我的内容</div>' }
      ],
      //
      template_cdate_format: '[CDATE: %m/%d/%Y : %H:%M:%S]',
      template_mdate_format: '[MDATE: %m/%d/%Y : %H:%M:%S]',
      image_caption: true,
      /**
       * 下面方法是为tinymce添加自定义插入图片按钮
       * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
       */
      setup: (editor) => {
        editor.ui.registry.addButton('imageUpload', {
          // text: '插入图片',
          tooltip: '插入图片',
          icon: 'image',
          onAction: () => {
            let upload = that.$refs.imageUpload as any
            upload.handleClick()
          }
        })
      }
    }
  }
  private activated () {
    this.tinymceFlag++
  }
}
</script>

<style lang="less">
  .editor-wrapper * {
    z-index: 100 !important;
  }
</style>
