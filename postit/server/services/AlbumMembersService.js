import { dbContext } from "../db/DbContext"


class AlbumMembersService {
  async getByMemberId(accountId) {
    const members = dbContext.AlbumMembers.find({accountId})
    return members
  }
  getByAlbumId(albumId) {
    const members = dbContext.AlbumMembers.find({albumId})
    return members
  }
  async create(body) {
    const member = await dbContext.AlbumMembers.create(body)
    member.populate('collaborator', 'name picture')
    member.populate('album', 'name coverImg')
    return member
  }

}

export const albumMembersService = new AlbumMembersService