// const client = require('./database'); 
// const express = require('express');
import Express from 'express';
import { config } from './app/config/index.js';
const app = Express();
 
app.use(Express.json()); // TO GET BODY IN REQUEST
app.listen(config.port,()=>{
  console.log("Server now listening at port 8080");
})

//console.log(client);
// db.client.connect();

// app.get('/stud',(req,res)=>{
//   client.query(`select * from stud`,(err,result)=>{
//     if(!err){
//       res.json(result.rows);

//     }
//   });
//   client.end;
// })
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

