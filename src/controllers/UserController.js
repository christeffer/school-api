import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      // Use Attributes to select only some fields
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      // filter only some fields to return
      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      // filter only some fields to return
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((erro) => erro.message) });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
      }
      const updatedUser = await user.update(req.body);
      // filter only some fields to return
      const { id, name, email } = updatedUser;
      return res.json({ id, name, email });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((erro) => erro.message) });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
      }

      await user.destroy();
      // return deleted true to confirm
      return res.json({ deleted: true });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((erro) => erro.message) });
    }
  }
}
export default new UserController();
