import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";
import { albumMembersService } from "../services/AlbumMembersService";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
    .get('/', this.getAll)
    .get('/:id', this.getById)
    .get('/:id/pictures', this.getPicturesByAlbum)
    .get('/:id/members', this.getMembersByAlbumId)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/', this.create)
    .put('/:id', this.edit)
    .delete('/:id', this.delete)

  }
  async getAll(req, res, next) {
    try {
      // @ts-ignore
      const albums = await albumsService.getAll(req.query)
      res.send(albums)
   } catch (error) {
   next(error);
   }
  }
  async getById(req, res, next) {
   try {
     const album = await albumsService.getById(req.params.id)
     return res.send(album)
   } catch (error) {
   next(error);
   }
  }
  async getPicturesByAlbum(req, res, next) {
   try {
    const pictures = await picturesService.getByAlbumId(req.params.id)
    return res.send(pictures)
  } catch (error) {
    next(error);
  }
}
  async getMembersByAlbumId(req, res, next) {
  try {
    const members = await albumMembersService.getByAlbumId(req.params.id)
    return res.send(members)
  } catch (error) {
  next(error)
  }
}
async create(req, res, next) {
  req.body.creatorId = req.userInfo.id
   try {
     // @ts-ignore
     const album = await albumsService.create(req.body) 
     return res.send(album)
   } catch (error) {
   next(error);
   }
  }
  async edit(req, res, next) {
   try {
    req.body.id = req.params.id
    req.body.creatorId = req.userInfo.id
    const album = await albumsService.edit(req.body)
    return res.send(album)
   } catch (error) {
   next(error);
   }
  }
  async delete(req, res, next) {
   try {
     await albumsService.delete(req.params.id, req.userInfo.id)
     return res.send({message: 'Deleted Album'})
   } catch (error) {
   next(error);
   }
  }



}
