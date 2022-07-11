import * as AuthController from '../controllers/auth.controller.js';
import ValidatorService from '../services/validation.service.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import express from 'express';

let router = express.Router();

router.post("/login",
    // [ValidatorService.validate('email',['notEmpty']),ValidatorService.validate('password',['notEmpty'])],
    // validationMiddleware,
    AuthController.login)

router.post("/signup", 
    [ValidatorService.validate('email',['notEmpty']),
   // ValidatorService.validate('mobile',['notEmpty']),
    ValidatorService.validate('password',['notEmpty']),
    //ValidatorService.validate('first_name',['notEmpty']),
    //ValidatorService.validate('last_name',['notEmpty'])],
],
    validationMiddleware,
    AuthController.signup)

export default router;