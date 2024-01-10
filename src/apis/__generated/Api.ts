import type { Executor } from './'
import { AuthController, DictController, UserController, UserWeChatController } from './services/'

export class Api {
  readonly authController: AuthController

  readonly dictController: DictController

  readonly userController: UserController

  readonly userWeChatController: UserWeChatController

  constructor(executor: Executor) {
    this.authController = new AuthController(executor)
    this.dictController = new DictController(executor)
    this.userController = new UserController(executor)
    this.userWeChatController = new UserWeChatController(executor)
  }
}
