import {
  validateEmail,
  userExists,
  createUserService,
} from '../services/userServices.js';
import { comparePassword, hashPassword } from '../helpers/helper.js';
import { generateToken } from '../helpers/jwtFunctions.js';

export class UserControllers {
  // I don't access the database from here, I pass data to the services I imported

  async registerUser(req, res, next) {
    try {
      const isValidEmail = await validateEmail(req.body.email);

      if (!isValidEmail) {
        return res
          .status(400)
          .json({ status: 400, message: 'Please enter a valid email' });
      }
      if (req.body.password.length < 6) {
        return res.status(400).json({
          status: 400,
          message: 'Password must have atleast 6 characters',
        });
      }
      const exists = await userExists(req.body.email);
      if (exists) {
        return res.status(409).json({
          status: 409,
          message: 'User with this email already exists',
        });
      }
      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        picture:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png',
        password: await hashPassword(req.body.password),
        role: 'user',
        created_at: new Date(),
      };
      const newUser = await createUserService(data);
      res.status(200).json({
        status: 200,
        message: 'Successfully registered',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      const exist = await userExists(req.body.email);
      if (exist) {
        const valid = await comparePassword(req.body.password, exist.password);
        if (!valid) {
          res.status(403).json({ status: 403, message: 'Invalid credentials' });
        }
        const token = generateToken({ id: exist._id, role: exist.role });
        res.status(200).json({
          status: 200,
          message: 'Logged in successfully',
          accessToken: token,
          first_name: exist.first_name,
          last_name: exist.last_name,
          role: exist.role,
        });
      } else {
        res.status(403).json({ status: 403, message: 'user not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async authGoogleLogin(req, res, next) {
    try {
      const params = new URLSearchParams();
      params.set('names', req.user.names);
      params.set('email', req.user.email);
      params.set('role', 'user');
      params.set('picture', req.user.picture);
      params.set(' created_at', new Date());
    } catch (err) {
      next(err);
    }
  }
}
