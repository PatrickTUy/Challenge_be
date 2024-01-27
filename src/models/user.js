import mongoose from 'mongoose';

const schema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  picture: String,
  password: String,
  role: String,
  created_at: Date,
});

export default mongoose.model('User', schema);
