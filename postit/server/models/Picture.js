import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

export const PictureSchema = new Schema({
  creatorId: {type: ObjectId, ref:'Account', required: true},
  imgUrl: {type: String, required: true},
  albumId: {type: ObjectId, ref:'Album', required: true}
},
{timestamps: true, toJSON: { virtuals: true}});

PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne:true,
  ref: 'Account'
})