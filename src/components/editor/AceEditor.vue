<template>
  <pre :id="editorId"></pre>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Ace from 'ace-builds'
import 'ace-builds/webpack-resolver'
@Component
export default class AceEditor extends Vue {
  private name = 'AceEditor'
  @Prop({ default: 'json' }) lang!: string;
  @Prop({ default: undefined }) minLines!: number;
  @Prop({ default: 50 }) maxLines!: number;
  @Prop({ default: false }) readOnly!: boolean;
  @Prop({ default: '' }) content!: string;
  @Prop({ default: 18 }) fontSize!: number;
  private outCodeAceEdit: Ace.Ace.Editor = null

  get editorId () {
    return `ace${(this as any)._uid}`
  }
  @Watch('content')
  contentChanged () {
    if (this.outCodeAceEdit) {
      this.outCodeAceEdit.session.setValue(this.content)
      this.outCodeAceEdit.session.setMode('ace/mode/' + this.lang)
      return
    }

    this.outCodeAceEdit = Ace.edit(this.editorId, {
      mode: 'ace/mode/' + this.lang,
      theme: 'ace/theme/dracula',
      maxLines: this.maxLines,
      minLines: this.minLines,
      fontSize: this.fontSize,
      value: this.content,
      readOnly: this.readOnly
    })
  }
}
</script>

<style scoped>

</style>
