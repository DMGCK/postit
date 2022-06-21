import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class AlbumsService {
  async getAll(query = {}) {
    const albums = await dbContext.Albums.find(query)
    return albums
  }
  
  async getById(id) {
    const album = await dbContext.Albums.findById(id).populate('creator', 'name picture')
    if(!album){
      throw new BadRequest("invalid Id")
    }
    return album
  }
  
  
  async create(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
    
  }
  async delete(albumId, userId) {
    const album = await this.getById(albumId)
    if(album.creatorId.toString() != userId){
      throw new Forbidden("You can't do that")
    }
    await album.remove()
  }
  async edit(body) {
    const original = await this.getById(body.id)
    if(original.creatorId.toString() != body.creatorId){
      throw new Forbidden('not allowed')
    }
    original.name = body.name || original.name
    original.coverImg = body.coverImg || original.coverImg

    await original.save()
    return original
  }
  

}

export const albumsService = new AlbumsService()