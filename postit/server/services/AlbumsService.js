import { dbContext } from "../db/DbContext"


class AlbumsService {
  async getAll(query = {}) {
    const albums = await dbContext.Albums.find(query)
    // @ts-ignore
    await albums.populate('creator', 'name picture')
    return albums
  }

}

export const albumsService = new AlbumsService()