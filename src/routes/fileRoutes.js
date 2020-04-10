import { Router } from 'express';

import fileController from '../controllers/FileController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// There is an another option, can be uses before, and all routes after that will follow the middleware
router.use(loginRequired);

router.post('/', fileController.store);

export default router;
