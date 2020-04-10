import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  // Check if token have sent
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');
  // Got Token after String "Bearer"
  try {
    // Got Data from JWT verify
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = data;

    const user = await User.findOne({
      where: { id, email },
    });
    // Validate if user already exists and have same credentials
    if (!user) {
      return res.status(401).json({
        errors: ['Invalid user'],
      });
    }
    // set commom fields on req to be used after
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expired or invalid'],
    });
  }
};
