// const bcrypt = require('../services/bcrypt.service')
import { ERROR_MESSAGE, HTTP_STATUS_CODES } from "../config/constants.js";
import { BcryptService } from "../services/bcrypt.service.js";
import db from '../config/database.js';

export const login = (request, response) => {
    const { body } = request;

    try {
        db.client.query(`select * from stud where email = '${body.email}'`).then(res=>{
            console.log(res.rows)
            return response.status(HTTP_STATUS_CODES.OK).send({
                result:{
                    ...res.rows
                },
                status:HTTP_STATUS_CODES.OK,
                message:"Loged in successfully."
            })
        }).catch(err=>{
           return response.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
            message:ERROR_MESSAGE.UNAUTHORIZED
           })
        });


    } catch (error) {
        console.log(error)
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            message: error || ERROR_MESSAGE.INTERNAL_SERVER_ERROR
        });

    }
}

