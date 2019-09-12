<template>
  <error-content code="500" desc="Oh~~鬼知道服务器经历了什么~" :src="src" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import errorContent from './ErrorContent.vue'
const error500 = require('@/assets/images/error-500.svg')

@Component({
  components: {
    errorContent
  }
})
export default class Error500 extends Vue {
  name = 'Error500';
  src = error500;
}
</script>
