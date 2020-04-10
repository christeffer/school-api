import multer from 'multer';

import multerConfig from '../config/multer';

import File from '../models/File';

const upload = multer(multerConfig).single('file');

class FileController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const createdFile = await File.create({
          student_id,
          originalname,
          filename,
        });

        return res.json(createdFile);
      } catch (e) {
        return res.status(400).json({
          errors: ['Student not exists'],
        });
      }
    });
  }
}
export default new FileController();
