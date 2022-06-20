import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AlbumSchema } from "../models/Album";
import { AlbumMemberSchema } from "../models/AlbumMember";
import { PictureSchema } from "../models/Picture";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Albums = mongoose.model('Album', AlbumSchema)

  Pictures =  mongoose.model('Picture', PictureSchema)

  AlbumMembers = mongoose.model('AlbumMember', AlbumMemberSchema)
}

export const dbContext = new DbContext()
