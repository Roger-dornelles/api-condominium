require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const routes = require('./routes/api')
console.log(process.env.PORT)
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static(path.join(__dirname, './public')));
server.use('/',routes)
server.use((req,res)=>{
  res.status(404);
  res.json({error:'Endpoint não encontrado'})
})
server.listen(process.env.PORT,() => {
  console.log('Rodando na porta ', process.env.BASE);
})

