import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger"
import { albumsService } from "./AlbumsService"



class PicturesService {
  async editPictureUrl(update, userInfo, postId) {
    logger.log('starting service')
    const original = await dbContext.Pictures.findById(postId)
    if (userInfo.id == original.creatorId) { 
      original.imgUrl = update.imgUrl || original.imgUrl
      await dbContext.Pictures.findByIdAndUpdate(postId, original)
      return original
    } else {
      throw new Forbidden('Identity theft is a serious crime, Jim!')
    }
  }

  async getByAlbumId(albumId) {
    const pictures = await dbContext.Pictures.find({albumId}).populate('creator', 'name picture')
    return pictures
  }
  
  async postPictureToAlbum(body) {
    const picture = await dbContext.Pictures.create(body)
    picture.populate()
    return picture
  }

  async deletePicture(id, userId) {
    const picture = await dbContext.Pictures.findById(id)
    if (userId == picture.creatorId.toString()) {
      await dbContext.Pictures.findByIdAndRemove(id)
      return 'who cares'
    }
    throw new Forbidden('Identity theft is a serious crime, Jim!')
  }
}
export const picturesService = new PicturesService()