import { Router } from 'express';

import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Not Necessary
//router.get('/', userController.index);
//router.get('/:id', userController.show);

router.post('/', userController.store);
//Using middleware (authentication required)
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
