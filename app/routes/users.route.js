import express from 'express';
// import * as ResourceController from '../controllers/resource.controller.js';
import * as UserController from '../controllers/users.controller.js';
import ValidatorService from '../services/validation.service.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import auth from '../middlewares/auth.middleware.js';

let router = express.Router();

router.get("", UserController.getUsers)
//router.get('/dashboard',UserController.dashboard)
router.get("/:id", UserController.getUser)
router.put('/:id',
    auth, 
    [ValidatorService.validate('email',['notEmpty'])],
    validationMiddleware,
    UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
