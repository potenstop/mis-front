import { Modal, ModalInstance } from 'view-design'
export class BeforeCloseRouter {
  public static normal (resolve, vm) {
    ((Modal as unknown) as ModalInstance).confirm({
      title: vm.$t('CONFIRM_CLOSE_TIP'),
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  }
}
