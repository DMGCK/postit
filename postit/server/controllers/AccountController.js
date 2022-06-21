import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { albumMembersService } from "../services/AlbumMembersService"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:id/member', this.getAlbumsByMember)
  }
  
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getAlbumsByMember(req, res, next) {
    try {
      const member = await albumMembersService.getByMemberId(req.params.id)
      return res.send(member)
    } catch (error) {
    next(error)
    }
  }
}
