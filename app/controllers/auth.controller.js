// const bcrypt = require('../services/bcrypt.service')
import { ERROR_MESSAGE, HTTP_STATUS_CODES } from "../config/constants.js";
import { BcryptService } from "../services/bcrypt.service.js";
import db from '../config/database.js';
import { AuthService } from "../services/auth.service.js";

export const login = (request, response) => {
    const { body } = request;

    try {
         db.client.query(`select * from stud where email = '${body.email}'`).then(res=>{
           
                const token = AuthService.issueToken({
                    id:res.id
                })
                //delete res.password
                return response.status(HTTP_STATUS_CODES.OK).send({
                    result:{
                        token,
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

export const signup=(request,response)=>{
    const { body } = request;
    try{
        
      db.client.query(`select * from stud where email = '${body.email}'`).then(res=>{
        if(res.rows.length>0){
            return response.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
                message:ERROR_MESSAGE.USEREXISTS
            })
        }else{
            db.client.query(`insert into stud(email,password)values('${body.email}','${BcryptService.encrypt(body.password)}')RETURNING *`).then(res=>{
                let users= res.rows[0];
            if(res.rows.length===1){
                delete users['password'];
                
                const token = AuthService.issueToken({
                    id:res.id
                })
             return response.status(HTTP_STATUS_CODES.OK).send({
                result:{
                    token,
                    ...users
                
                },
                status:HTTP_STATUS_CODES.OK,
                message:'Signup successfully.'
             })
            }else{
                return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
                    message: HTTP_STATUS_CODES.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
                })
            }
            });
        }
      })

    }catch(error){
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            message: error || ERROR_MESSAGE.INTERNAL_SERVER_ERROR
        });
    }

}

