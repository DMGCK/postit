import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
    .get('/', this.getAll)
    // .get('/:id', this.getById)
    // .get('/:id/pictures', this.getPicturesByAlbum)
    // .use(Auth0Provider.getAuthorizedUserInfo)
    // .post('/' this.create)
    // .put('/:id', this.edit)
    // .delete('/:id', this.delete)

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
//   async getById(req, res, next) {
//    try {
//      await  
//    } catch (error) {
//    next(error);
//    }
//   }
//   async getPicturesByAlbum(req, res, next) {
//    try {
//      await  
//    } catch (error) {
//    next(error);
//    }
//   }
//   async create(req, res, next) {
//    try {
//      await  
//    } catch (error) {
//    next(error);
//    }
//   }
//   async edit(req, res, next) {
//    try {
//      await  
//    } catch (error) {
//    next(error);
//    }
//   }
//   async delete(req, res, next) {
//    try {
//      await  
//    } catch (error) {
//    next(error);
//    }
//   }
// }