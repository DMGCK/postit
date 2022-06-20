import { dbContext } from "../db/DbContext"
import { albumsService } from "./AlbumsService"



class PicturesService {
  async getByAlbumId(albumId) {
    const pictures = await dbContext.Pictures.find({albumId})
    return pictures
  }

}
export const picturesService = new PicturesService()