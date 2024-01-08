import type { Executor } from './'
import { AuthController, UserController } from './services/'

export class Api {
  readonly authController: AuthController

  readonly userController: UserController

  constructor(executor: Executor) {
    this.authController = new AuthController(executor)
    this.userController = new UserController(executor)
  }
}
