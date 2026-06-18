import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

const sendAuthResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    token: signToken(user),
    user: user.toSafeJSON()
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'user'
    });

    sendAuthResponse(res, 201, user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    sendAuthResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
};
