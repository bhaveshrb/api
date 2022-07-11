// const {Client} = require('pg');
import pg from 'pg';

const client = new pg.Client({
    host : "localhost",
    port: 5432,
    user: "postgres",
    password:"bhavesh",
    database:"test"
});

client.on("connect",()=>{
    console.log("Connected");
})

client.on("end",()=>{
    console.log("Connection End");
})

// module.exports = client;
export default {client};

