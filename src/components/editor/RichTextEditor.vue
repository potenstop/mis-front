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
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
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
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
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

  private insertImage (value) {
    let src = '' // 图片存储地址
    tinymce.execCommand('mceInsertContent', false, `<img src=${src}>`)
  }
  private created () {
    const that = this
    this.tinymceInit = {
      skin_url: '/tinymce/skins/ui/oxide',
      language_url: '/tinymce/langs/zh_CN.js',
      language: 'zh_CN',
      inline: false,
      plugins: 'advlist anchor autolink autoresize autosave bbcode charmap code codesample colorpicker contextmenu directionality emoticons fullpage help hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern toc visualblocks visualchars wordcount',
      toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat |table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em',
      // toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter removeformat | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | link image media uploadbtn',
      font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
      fontsize_formats: '8px 10px 11px 12px 14px 18px 24px 36px',
      style_formats_merge: true,
      style_formats: [
        {
          title: '行间距',
          inline: 'span',
          items: [
            { title: '1倍', inline: 'span', styles: { 'line-height': '1' } },
            { title: '1.5倍', inline: 'span', styles: { 'line-height': '1.5' } },
            { title: '2倍', inline: 'span', styles: { 'line-height': '2' } },
            { title: '2.5倍', inline: 'span', styles: { 'line-height': '2.5' } },
            { title: '3倍', inline: 'span', styles: { 'line-height': '3' } }
          ]
        },
        {
          title: '字间距',
          inline: 'span',
          items: [
            { title: '0.1px', inline: 'span', styles: { 'letter-spacing': '0.1px' } },
            { title: '0.2px', inline: 'span', styles: { 'letter-spacing': '0.2px' } },
            { title: '0.3px', inline: 'span', styles: { 'letter-spacing': '0.3px' } },
            { title: '0.4px', inline: 'span', styles: { 'letter-spacing': '0.4px' } },
            { title: '0.5px', inline: 'span', styles: { 'letter-spacing': '0.5px' } },
            { title: '0.6px', inline: 'span', styles: { 'letter-spacing': '0.6px' } },
            { title: '0.7px', inline: 'span', styles: { 'letter-spacing': '0.7px' } },
            { title: '0.8px', inline: 'span', styles: { 'letter-spacing': '0.8px' } },
            { title: '0.9px', inline: 'span', styles: { 'letter-spacing': '0.9px' } },
            { title: '1px', inline: 'span', styles: { 'letter-spacing': '1px' } },
            { title: '1.5px', inline: 'span', styles: { 'letter-spacing': '1.5px' } },
            { title: '2px', inline: 'span', styles: { 'letter-spacing': '2px' } },
            { title: '3px', inline: 'span', styles: { 'letter-spacing': '3px' } },
            { title: '4px', inline: 'span', styles: { 'letter-spacing': '4px' } },
            { title: '5px', inline: 'span', styles: { 'letter-spacing': '5px' } }
          ]
        },
        {
          title: '两端缩进',
          inline: 'span',
          items: [
            { title: '取消', inline: 'span', styles: { 'display': 'inline-block', 'padding': '0', 'word-break': 'break-word' } },
            { title: '8px', inline: 'span', styles: { 'display': 'inline-block', 'padding-left': '8px', 'padding-right': '8px', 'word-break': 'break-word' } },
            { title: '16px', inline: 'span', styles: { 'display': 'inline-block', 'padding-left': '16px', 'padding-right': '16px', 'word-break': 'break-word' } },
            { title: '32px', inline: 'span', styles: { 'display': 'inline-block', 'padding-left': '32px', 'padding-right': '32px', 'word-break': 'break-word' } },
            { title: '48px', inline: 'span', styles: { 'display': 'inline-block', 'padding-left': '48px', 'padding-right': '48px', 'word-break': 'break-word' } }
          ]
        }
      ],
      suffix: '.min',
      modelEvents: 'change keyup undo redo',
      menubar: true,
      mediaembed_service_url: '',
      file_picker_types: 'file image media',
      valid_children: '+span[div|p]',
      powerpaste_allow_local_images: false,
      powerpaste_block_drop: true
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
