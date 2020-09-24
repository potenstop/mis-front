<template>
  <mavon-editor
    ref="md"
    @imgAdd="imgAdd"
    @imgDel="imgDel"
    v-model="data"
    @change="editChange"
  >
  </mavon-editor>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import editor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import { ForeignApi } from '@/dao/api/ForeignApi'
import { ApiUtil } from '@/common/util/ApiUtil'
import ProjectConfig from '@/config/ProjectConfig'
import moment from 'moment'
import { StringUtil } from 'papio-h5'

const foreignApi = new ForeignApi()
@Component({
  components: {
    'mavon-editor': editor.mavonEditor
  }
})
export default class SimpleMarkdown extends Vue {
  @Prop({ default: () => '' }) value!: string
  private data: string = ''
  private name = 'SimpleMarkdown'
  private created () {
    if (StringUtil.isNotBank(this.value)) {
      this.data = this.value
    }
  }
  private async imgAdd (pos, file) {
    const now = moment()
    const formdata = new FormData()
    const token = ApiUtil.getData(await foreignApi.qiniuTokenRefresh())
    const key = `images/${now.format('YYYY')}/${now.format('MM-DD')}/${now.format('X')}_${Math.floor(Math.random() * 1000)}.jpg`
    formdata.append('file', file)
    formdata.append('token', token)
    formdata.append('key', key)
    await axios({
      url: ProjectConfig.qiniuUpload,
      method: 'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const $vm = this.$refs.md as any
    $vm.$img2Url(pos, ProjectConfig.picDomain + key)
  }
  private async imgDel () {
    const token = ApiUtil.getData(await foreignApi.qiniuTokenRefresh())
  }
  private async editChange (newValue: string) {
    this.$emit('update:value', newValue)
  }
}
</script>

<style scoped>

</style>
