import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumMembersService } from "../services/AlbumMembersService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";


export class AlbumMembersController extends BaseController {
  constructor() {
    super('api/albumMembers')
    this.router
    .get('/:id', this.getById)
    // .get('/:id/member', this.getByMemberId)
    // .get('/:id/album', this.getByAlbumId)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/', this.create)
    //TODO put not necessary?
    .delete('/:id', this.remove)
  }
  async getById(req, res, next) {
   try {
     const member = await albumMembersService.getById(req.params.id)
     return res.send(member)
   } catch (error) {
   next(error)
   }
  }
  async getByMemberId(req, res, next) {
    //TODO not working yet
   try {
     const member = await albumMembersService.getByMemberId(req.params.id)
     return res.send(member)
   } catch (error) {
   next(error)
   }
  }
  async getByAlbumId(req, res, next) {
   try {
     const members = await albumMembersService.getByAlbumId(req.params.id)
     return res.send(members)
   } catch (error) {
   next(error)
   }
  }
  async create(req, res, next) {
    // req.body.creatorId = req.params.id
   try { 
    const member = await albumMembersService.create(req.body)
    return res.send(member)
   } catch (error) {
   next(error)
   }
  }
  async remove(req, res, next) {
    //TODO userid
   try {
     await albumMembersService.remove(req.body.id, req.userInfo.id)
     return res.send('-Your record has been destroyed-')
   } catch (error) {
   next(error)
   }
  }





}