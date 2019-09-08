import { Modal, ModalInstance } from "iview";
export class BeforeCloseRouter {
  public static normal(resolve) {
    ((Modal as unknown) as ModalInstance).confirm({
      title: '确定要关闭这一页吗',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  }
}

