import User from '../models/User';
import jwt from 'jsonwebtoken';

class TokenController {
  async index(req, res) {
    res.json('ok');
  }

  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      res.status(401).json({
        errors: ['Invalid credentials'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({
        errors: ['User not exists'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid Password'],
      });
    }

    const { id } = user;
    // Using JWT to generate token
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ token, user: { name: user.name, id, email } });
  }
}
export default new TokenController();
