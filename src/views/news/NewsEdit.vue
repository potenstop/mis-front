<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <FormItem label="Input">
        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="Input">
        <rich-text-editor ref="editor" :value="111" @on-change="handleChange" />
      </FormItem>
      <FormItem>
        <Button type="primary">Submit</Button>
        <Button style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RichTextEditor from '@/components/editor/RichTextEditor.vue'
@Component({
  components: {
    RichTextEditor
  }
})
export default class NewsEdit extends Vue {
  private name = 'NewsEdit'
  private formItem = {
    input: '11'
  }
  private handleChange () {
    console.log('11111111111')
  }
}
</script>

<style scoped>

</style>
