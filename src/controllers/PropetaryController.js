const User = require('../models/User');
const bcrypt = require('bcrypt');
const {generateToken} = require('../config/passport');

module.exports = {
  //criar usuario
  createUser: async (req,res) => {
    let { name, apartament, contact ,password } = req.body;

    if(name && contact && password && apartament) {
      password = await bcrypt.hashSync(password,10);
      let user = await User.create({name,apartament,password,contact});

      if(user){
        let token = generateToken({id:user.id});
        res.status(200);
        res.json({token, user});
      }else{
        res.status(404);
        res.json({error:'Ocorreu um erro.'})
      }

    }else{
      res.status(404);
      res.json({error:'Preencha os campos.'})
    }
  },
  //listar usuarios
  getUserList: async (req,res) => {
    let propetarys = await User.findAll();

    if(propetarys){
      res.status(200);
      res.json({propetarys});
    }else{
      res.status(404);
      res.json({error:'Não há proprietarios'})
    }
  },
  //atualizar usuario
  updateUser: async (req,res) => {
    let { id } = req.params;
    let { name, password, contact,apartament } = req.body;
    let user = await User.findOne({where: {id}});

    if(user){
      if(name){
        user.name = name;
      };


      if(password){
        user.password = password;
      };

      if(contact){
        user.contact = contact;
      };

      if(apartament){
        user.apartament = apartament;
      };
      let newData = await user.save();
      res.status(201);
      res.json({newData});
    }else{
      res.status(404);
      res.json({error:'Usuario invalido.'})
    }
  },
  //excluir usuario
  deleteUser: async (req,res) => {
    let { id } = req.params;
    let user = await User.findByPk(id);
    if(user){
      await user.destroy();
      res.status(200);
      res.json({});
    }else{
      res.status(404);
      res.json({error:'Usuario inexistente.'});
    }
  },
  //login usuario
  signin: async (req,res) => {
    let {password,apartament} = req.body;
    let user = await User.findOne({where:{apartament}});

    if(user){
      let passwordCheck = await bcrypt.compareSync(password,user.password);

      if(passwordCheck){
        let token = generateToken({id:user.id});
        res.status(201);
        res.json({id:user.id,token})
      }else{
        res.status(200);
        res.json({error:'Senha invalida'});
      }
    }else{
      res.status(200);
      res.json({error:'Apartamento invalido'});
    }


  }

}