<template>
  <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import errorContent from './ErrorContent.vue'
const error401 = require('@/assets/images/error-401.svg')

@Component({
  components: {
    errorContent
  }
})
export default class Error401 extends Vue {
  name = 'Error401';
  src = error401;
}
</script>
