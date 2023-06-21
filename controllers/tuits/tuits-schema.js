import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  dislikes : Number,
  disliked : Boolean,
  comments : Number,
  retweets : Number,
  image : String,
  handle : String,
  username : String

}, {collection: 'tuits'});
export default schema;

