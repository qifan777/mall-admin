import type { Executor } from './'
import {
  AuthController,
  DictController,
  RoleController,
  UserController,
  UserWeChatController
} from './services/'

export class Api {
  readonly authController: AuthController

  readonly dictController: DictController

  readonly roleController: RoleController

  readonly userController: UserController

  readonly userWeChatController: UserWeChatController

  constructor(executor: Executor) {
    this.authController = new AuthController(executor)
    this.dictController = new DictController(executor)
    this.roleController = new RoleController(executor)
    this.userController = new UserController(executor)
    this.userWeChatController = new UserWeChatController(executor)
  }
}
