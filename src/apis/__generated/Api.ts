import type { Executor } from './'
import {
  AddressController,
  AgentController,
  AgentLevelController,
  AgentRebateRecordController,
  AuthController,
  CouponController,
  CouponUserController,
  DictController,
  MenuController,
  ProductCategoryController,
  ProductController,
  ProductOrderController,
  ProductSkuController,
  RefundRecordController,
  RoleController,
  UserController,
  UserWeChatController,
  WalletController,
  WalletRecordController
} from './services/'

export class Api {
  readonly addressController: AddressController

  readonly agentLevelController: AgentLevelController

  readonly agentRebateRecordController: AgentRebateRecordController

  readonly agentController: AgentController

  readonly authController: AuthController

  readonly couponController: CouponController

  readonly couponUserController: CouponUserController

  readonly dictController: DictController

  readonly menuController: MenuController

  readonly productOrderController: ProductOrderController

  readonly productCategoryController: ProductCategoryController

  readonly productController: ProductController

  readonly productSkuController: ProductSkuController

  readonly refundRecordController: RefundRecordController

  readonly roleController: RoleController

  readonly userController: UserController

  readonly userWeChatController: UserWeChatController

  readonly walletRecordController: WalletRecordController

  readonly walletController: WalletController

  constructor(executor: Executor) {
    this.addressController = new AddressController(executor)
    this.agentLevelController = new AgentLevelController(executor)
    this.agentRebateRecordController = new AgentRebateRecordController(executor)
    this.agentController = new AgentController(executor)
    this.authController = new AuthController(executor)
    this.couponController = new CouponController(executor)
    this.couponUserController = new CouponUserController(executor)
    this.dictController = new DictController(executor)
    this.menuController = new MenuController(executor)
    this.productOrderController = new ProductOrderController(executor)
    this.productCategoryController = new ProductCategoryController(executor)
    this.productController = new ProductController(executor)
    this.productSkuController = new ProductSkuController(executor)
    this.refundRecordController = new RefundRecordController(executor)
    this.roleController = new RoleController(executor)
    this.userController = new UserController(executor)
    this.userWeChatController = new UserWeChatController(executor)
    this.walletRecordController = new WalletRecordController(executor)
    this.walletController = new WalletController(executor)
  }
}
