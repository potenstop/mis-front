<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import errorContent from './ErrorContent.vue'
const error404 = require('@/assets/images/error-404.svg')

@Component({
  components: {
    errorContent
  }
})
export default class Error404 extends Vue {
  name = 'Error404';
  src = error404;
}
</script>
