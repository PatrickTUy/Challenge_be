import User from '../models/user.js';

export const validateEmail = (email) => {
  console.log(email, 'this is the email');
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const userExists = async (email) => {
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return user;
  } else {
    return false;
  }
};

export const createUserService = async (data) => {
  const newUser = await User(data);
  newUser.save();
  return newUser;
};

export const deleteUserService = async (data) => {
  const deletedUser = await User.findOneAndDelete({ email: email });
  if (deletedUser) {
    return 'User deleted successfully';
  } else {
    return 'User not found';
  }
};

export const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  if (user) {
    return user;
  } else {
    return false;
  }
};
