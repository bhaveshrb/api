import * as AuthController from '../controllers/auth.controller.js';
import ValidatorService from '../services/validation.service.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import express from 'express';

let router = express.Router();

router.post("/login",
    // [ValidatorService.validate('email',['notEmpty']),ValidatorService.validate('password',['notEmpty'])],
    // validationMiddleware,
    AuthController.login)

export default router;