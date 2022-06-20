import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumMembersService } from "../services/AlbumMembersService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";


export class AlbumMembersController extends BaseController {
  constructor() {
    super('api/albumMembers')
    this.router
    // .get('/', this.getAll)
    .get('/:id/member', this.getByMemberId)
    .get('/:id/album', this.getByAlbumId)
    // .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/', this.create)
    //TODO put not necessary?
    // .delete('/:id', this.remove)
  }
  // getAll(req, res, next) {
  //  try {
  //    await  
  //  } catch (error) {
  //  logger.error(error);
  //  }
  // }
  async getByMemberId(req, res, next) {
   try {
     const members = await albumMembersService.getByMemberId(req.params.id)
     return res.send(members)
   } catch (error) {
   logger.error(error);
   }
  }
  async getByAlbumId(req, res, next) {
   try {
     const members = await albumMembersService.getByAlbumId(req.params.id)
     return res.send(members)
   } catch (error) {
   logger.error(error);
   }
  }
  async create(req, res, next) {
    // req.body.creatorId = req.params.id
   try { 
    const member = await albumMembersService.create(req.body)
    return res.send(member)
   } catch (error) {
   logger.error(error);
   }
  }
  // remove(req, res, next) {
  //  try {
  //    await  
  //  } catch (error) {
  //  logger.error(error);
  //  }
  // }





}