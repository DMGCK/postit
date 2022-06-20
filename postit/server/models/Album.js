import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

export const AlbumSchema = new Schema({
  creatorId: {type: ObjectId, ref:'Account', required: true},
  name: {type:String, required:true},
  coverImg: {type:String, required:true}
},
{timestamps: true, toJSON: { virtuals: true}});

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne:true,
  ref: 'Profile'
})