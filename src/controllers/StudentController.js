import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: [
        'id',
        'name',
        'lastname',
        'email',
        'age',
        'height',
        'weight',
      ],
      order: [['id', 'DESC'], [File, 'id', 'DESC']],
      include: {
        model: File,
        attributes: ['filename', 'url'],
      },
    });
    res.json(students);
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body);
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID not found'],
        });
      }
      // Include file refereced on model
      const student = await Student.findByPk(id, {
        attributes: [
          'id',
          'name',
          'lastname',
          'email',
          'age',
          'height',
          'weight',
        ],
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
          attributes: ['filename', 'url'],
        },
      });

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found'],
        });
      }

      return res.json(student);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID not found'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found'],
        });
      }

      const newStudent = await student.update(req.body);
      return res.json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID not found'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found'],
        });
      }

      await student.destroy();
      return res.json({ deleted: true });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }
}
export default new StudentController();
