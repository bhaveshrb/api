import { ERROR_MESSAGE, HTTP_STATUS_CODES } from "../config/constants.js";
import db from '../config/database.js';
export const getUsers = async (request, response) =>{
    try{
        const [result] = await db.client.query(`select * from stud`);
        
        if(result.length>0){
            const users = result.map((user)=>{
                delete user['password']
                return user
            });
            return  response.status(HTTP_STATUS_CODES.OK).send({
                result: users,
                status: HTTP_STATUS_CODES.OK,
                message: 'Users fetched sucessfully.'
            })
        }else{
            return response.status(HTTP_STATUS_CODES.NOT_FOUND).send({
                message:'No user found'
            })
        }


    }
    catch(error){
        console.log(error);
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            message: error || ERROR_MESSAGE.INTERNAL_SERVER_ERROR
        });
    }
}

export const getUser = async(request, response) =>{
    let res = [];
    try{
         db.client.query(`select * from stud where id=${request.params.id}`,(err,result)=>{
            //console.log(result);
            if(!err){
                res = result.rows;
                console.log(result.rows);
            }
           
        });
        console.log(res);
        // if(result.length === 1){
            
        //     const user = result[0];
        //     //delete user['password'];
        //     return response.status(HTTP_STATUS_CODES.OK).send({
        //         result:{
        //             ...user
        //         },
        //         status: HTTP_STATUS_CODES.OK,
        //         message: 'Users fetched sucessfully.'
        //     })
        // }else{
        //     return response.status(HTTP_STATUS_CODES.NOT_FOUND).send({
        //         message:'No user found with such ID'
        //     })    
        // }
    }catch(error){
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            message:"error|| ERROR_MESSAGE.INTERNAL_SERVER_ERROR"
        })
    }
}

export const updateUser = async (request, response) =>{
    const { body } = request;
    try{
        const [result] = await db.client.query(`
            UPDATE users
                SET first_name = '${body.first_name}', 
                    email = '${body.email}',
                    mobile = '${body.mobile}',
                    last_name = '${body.last_name}'
                WHERE id='${request.params.id}'
        `);
        if(result){
            return response.status(HTTP_STATUS_CODES.OK).send({
                result:{
                    ...body
                },
                status: HTTP_STATUS_CODES.OK,
                message: 'User updated sucessfully.'
            })
        }else{
            return response.status(HTTP_STATUS_CODES.NOT_FOUND).send({
                message:'No user found with such ID'
            })    
        }
    }catch(error){
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            message:error|| ERROR_MESSAGE.INTERNAL_SERVER_ERROR
        })
    }
}

export const deleteUser = (request, response) =>{
    return response.status(HTTP_STATUS_CODES.OK).send({
        status: 200,
        message: '',
        results: {}
    })
}

export const dashboard = async(request,response) =>{
    try{
        const [getTotalUserCount] = await db.client.query('SELECT COUNT(*) as count from users')
        const [getTotalOrderCount] = await db.client.query(`SELECT COUNT(*) as count, SUM(total) as total from orders where order_status_id != 1`)
        // const [getRevenueOverMonth] = await db.client.query(`SELECT SUM(total) as value FROM orders where date_part('year',created_at) = date_part('year',now()) and id !=1 group by date_part('month',created_at) order by date_part('month',created_at)`)
        const [getTotalRevenue] = await db.client.query(`SELECT SUM(total) as total from orders where order_status_id != 1`)

        // const [getRevenueOverMonth] = await db.client.query(`SELECT date_part('year',created_at) as year, date_part('month',created_at) as month ,SUM(total) as value FROM orders where order_status_id !=1 group by date_part('month',created_at), date_part('year',created_at) order by date_part('year',created_at) ASC, date_part('month',created_at) ASC`)

        const [getRevenueOverMonth] = await db.client.query(`
            SELECT 
                D.year as year,
                D.month as month,
                CASE WHEN O.value is NULL THEN 0 ELSE O.value END
            FROM (
                SELECT 
                    date_part('year',day) as year,
                    date_part('month',day) as month 
                FROM 
                    generate_series(
                        date_trunc('month', CURRENT_DATE) - INTERVAL '11 month',
                        timestamp 'now()', interval  '1 month'
                    ) 
                    day
                ) D 
            LEFT JOIN (SELECT SUM(total) as value, date_part('year',created_at) as year,date_part('month',created_at) as month from orders group by date_part('year',created_at),date_part('month',created_at)) O USING (year,month) order by year,month
        `)
        
        // for(let i = getRevenueOverMonth.length;i<12;i++){
        //     getRevenueOverMonth.push({value:0})
        // }
        
        return response.status(HTTP_STATUS_CODES.OK).send({
            result:{
                totalUser:Number(getTotalUserCount[0].count),
                totalOrder:Number(getTotalOrderCount[0].count),
                totalRevenue:Number(getTotalRevenue[0].total),
                revenueGraph:getRevenueOverMonth.map(item => {
                        return{
                            ...item,
                            value:Number(item.value)
                        }
                    }
                )
            }
        })   
    }catch(error){
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            message:error|| ERROR_MESSAGE.INTERNAL_SERVER_ERROR
        })
    }
}