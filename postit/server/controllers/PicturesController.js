import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumMembersService } from "../services/AlbumMembersService";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";
import { Forbidden } from "../utils/Errors";
import { logger } from "../utils/Logger";

export class PicturesController extends BaseController {
  constructor() {
    super('api/pictures')
    this.router
      // get pictures in albumsController
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.postPictureToAlbum)
      .put('/:id', this.editPictureUrl)
      .delete('/:id', this.deletePicture)
    //delete
  }
  async postPictureToAlbum(req, res, next) {

    try {
      const member = await albumMembersService.getByBothIds(req.userInfo.id, req.body.albumId)
      if (req.userInfo.id != member.accountId) {
        throw new Forbidden('Please become a collaborator')
      }
      const picture = await picturesService.postPictureToAlbum(req.body)
      res.send(picture)
    } catch (error) {
      next(error)
    }
  }
  
  async editPictureUrl(req, res, next) {
    try {
      const picture = await picturesService.editPictureUrl(req.body, req.userInfo, req.params.id)
      return res.send(picture)
    } catch (error) {
      next(error)
    }
  }

  async deletePicture(req, res, next) {
    try {
      logger.log('hello')
      const message = await picturesService.deletePicture(req.params.id, req.userInfo.id)
     return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}