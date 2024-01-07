import type { Executor } from './'
import { UserController } from './services/'

export class Api {
  readonly userController: UserController

  constructor(executor: Executor) {
    this.userController = new UserController(executor)
  }
}
