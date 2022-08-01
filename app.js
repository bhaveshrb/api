// const client = require('./database'); 
import db from './app/config/database.js';
// const express = require('express');
import Express from 'express';
import UsersRoutes from './app/routes/users.route.js';
import AuthRoutes from './app/routes/auth.route.js';
import { config } from './app/config/index.js';
const app = Express();
 
app.use(Express.json()); // TO GET BODY IN REQUEST
app.listen(config.port,()=>{
  console.log("Server now listening at port 8080");
})

//console.log(client);
db.client.connect();

// app.get('/stud',(req,res)=>{
//   client.query(`select * from stud`,(err,result)=>{
//     if(!err){
//       res.json(result.rows);

//     }
//   });
//   client.end;
// })
app.get('/stud/:id',(req,res)=>{
  db.client.query(`select * from stud where id = ${req.params.id}`,(err,result)=>{
    if(!err){
      res.send(result.rows);
    }
  });
  
})
app.use('/auth',AuthRoutes);
app.use('/stud/users',UsersRoutes);


// {
//   "name": "khhj",
//   id: 8
// }

// (async ()=>{
//   // const result = await client.query(`insert into stud(email,password)
//   // values($1,$2) RETURNING *`,['e@yopmail.com','teste']);
//   const result = await client.query(`select * from stud`);
//   console.log(result.rows);
//   console.log(result.rowCount);
//   client.end();
// })();

