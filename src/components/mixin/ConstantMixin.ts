/**
 *
 * 功能描述:
 *
 * @className ConstantMixin
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/11/11 10:53
 */
import { Vue, Component } from 'vue-property-decorator'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'

@Component
export default class ConstantMixin extends Vue {
  private getContentTopicTypeNameById (id: number) {
    if (ContentTopicConstant.TYPE_SIGN_SELECT === id) {
      return this.$t('CONTENT_TOPIC_TYPE_SIGN_SELECT')
    } else if (ContentTopicConstant.TYPE_MUL_SELECT === id) {
      return this.$t('CONTENT_TOPIC_TYPE_MUL_SELECT')
    } else if (ContentTopicConstant.TYPE_FILL_BLANK === id) {
      return this.$t('CONTENT_TOPIC_TYPE_FILL_BLANK')
    } else if (ContentTopicConstant.TYPE_SHORT_ANSWER === id) {
      return this.$t('CONTENT_TOPIC_TYPE_SHORT_ANSWER')
    }
    return this.$t('P_ERROR_ENUM')
  }
  private getContentStateNameById (id: number) {
    if (ContentTopicConstant.STATE_ONLINE === id) {
      return this.$t('CONTENT_STATE_ONLINE')
    } else if (ContentTopicConstant.STATE_OFFLINE === id) {
      return this.$t('CONTENT_STATE_OFFLINE')
    }
    return this.$t('P_ERROR_ENUM')
  }
}
