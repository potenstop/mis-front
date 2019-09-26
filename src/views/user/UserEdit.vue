<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserDetailResponse } from '@/response/UserDetailResponse'
@Component
export default class UserEdit extends Vue {
  private name = 'UserEdit'
  private data: UserDetailResponse = null
}
</script>

<style scoped>

</style>
