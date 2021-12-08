require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const routes = require('./routes/api');

const errorHandler =(err,req,res,next) => {
  if(err.status){
    res.status(err.status);
  }else{
    res.status(400);
  }

  if(err.message){
    res.json({error:err.message});
  }else{
    res.json({error:'Ocorreu um erro.'});
  }
};
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const server = express();
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static(path.join(__dirname, '../public')));
server.use(passport.initialize())
server.use('/',routes);
server.use((req,res)=>{
  res.status(404);
  res.json({error:'Endpoint não encontrado'})
});
server.use(errorHandler)
server.listen(process.env.PORT,() => {
  console.log('Rodando na porta ', process.env.BASE);
})

