import { check, validationResult } from 'express-validator';

// validator('x',['notEmpty','isString'])
//import db from '../../config/database.js';

export default class ValidatorService{
    static validate = (param, validations) => {
        let result = check(param);
        result = result.exists().withMessage(`${param} required.`);
        validations.forEach(v => {
            switch (v){
                case 'exists':{
                    result = result.exists().withMessage(`${param} required.`)
                    break
                }
                case 'notEmpty': {
                    result = result.notEmpty().withMessage(`${param} required.`)
                    break
                }
                case 'isString': {
                    result = result.isString().withMessage(`${param} should be string.`)
                    break
                }
                case 'isBoolean': {
                    result = result.isBoolean().withMessage(`${param} should be boolean.`)
                    break
                }
                case 'toBoolean': {
                    result = result.toBoolean();
                    break
                }
                case 'isNumeric':{
                    result = result.isNumeric().withMessage(`${param} should be numeric.`)
                    break
                }
            }
        });
        return result;
    }
}