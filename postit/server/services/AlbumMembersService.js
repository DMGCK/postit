import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class AlbumMembersService {
  async getById(memberId) {
    const member = await dbContext.AlbumMembers.findOne({memberId}).populate('collaborator', 'name picture').populate('album', 'name coverImg');
    // member.populate('album', 'name coverImg');
    if (!member) {
      throw new BadRequest('Improper ID')
    }
    return member
  }
  async getByBothIds(accountId, albumId) {
    const member = await dbContext.AlbumMembers.findOne({accountId, albumId})
    if(!member) {
      throw new BadRequest('Improper ID')
    }
    return member
  }
  async getByMemberId(accountId) {
    const members = dbContext.AlbumMembers.find({accountId})
    members.populate('collaborator', 'name picture');
    members.populate('album', 'name coverImg');
    if(!members) {
      throw new BadRequest('Improper ID')
    }
    return members
  }
  getByAlbumId(albumId) {
    const members = dbContext.AlbumMembers.find({albumId})
    members.populate('collaborator', 'name picture');
    members.populate('album', 'name coverImg');
    if(!members) {
      throw new BadRequest('Improper ID')
    }
    return members
  }
  async create(body) {
    const member = await dbContext.AlbumMembers.create(body)
    member.populate('collaborator', 'name picture');
    member.populate('album', 'name coverImg');
    return member
  }
  async remove(memberId, userId) {
    const member = await this.getById(memberId)
    if(member.accountId.toString() != userId){
      throw new Forbidden("You can't do that")
    }
    await member.remove()
  }

}

export const albumMembersService = new AlbumMembersService