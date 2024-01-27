export const welcomeController = (req, res, next) => {
  res
    .status(200)
    .json({ status: 200, message: 'Welcome to our apis! 🚀 ', data: '' });
};
