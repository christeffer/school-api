import { Router } from 'express';

import StudentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', StudentController.index);
router.get('/:id', StudentController.show);

// There is an another option, can be uses before, and all routes after that will follow the middleware
router.use(loginRequired);

router.post('/', StudentController.store);
router.put('/:id', StudentController.update);
router.delete('/:id', StudentController.delete);

export default router;
