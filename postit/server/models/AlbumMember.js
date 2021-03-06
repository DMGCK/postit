import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId


export const AlbumMemberSchema = new Schema({
  albumId: {type: ObjectId, required:true},
  accountId: {type: ObjectId, required: true}
},
  {timestamps: true, toJSON: { virtuals: true}});

AlbumMemberSchema.virtual('member', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

AlbumMemberSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id', 
  ref: 'Album',
  justOne: true
})