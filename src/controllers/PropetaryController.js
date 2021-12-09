const User = require('../models/User');
const Apartaments = require('../models/Apartaments');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../config/passport');
const sequelize = require('../instances/mysql');

module.exports = {
  //criar usuario
  createUser: async (req,res) => {
    try {
      await sequelize.authenticate();
      console.log('funcionando a conexão')
    } catch (error) {
      console.log('Erro de conexao: ' ,error);
    }
    
    let { name, apartament, contact ,password } = req.body;

    if(name && contact && password && apartament) {
      password = await bcrypt.hashSync(password,10);
      let user = await User.create({name,apartament,password,contact});
      await Apartaments.create({
        proprietary: user.name,
        apartament: user.apartament,
        contact: user.contact
      });
      if(user){
        let token = generateToken({id:user.id});
        res.status(200);
        res.json({token, id:user.id});
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
    let apartamentCheck = await Apartaments.findOne({where:{apartament:user.apartament}});

    if(user){
      if(name){
        user.name = name;
        apartamentCheck.proprietary = name;
      };

      if(password){
        password = await bcrypt.hashSync(password,10);
        user.password = password;
      };

      if(contact){
        user.contact = contact;
        apartamentCheck.contact = contact;
      };

      if(apartament){
        user.apartament = apartament;
        apartamentCheck.apartament = apartament;
      };
      await apartamentCheck.save()
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
  },
  // exibir usuario especifico
  userInfo: async (req, res) => {
    let { id } = req.params;
    let userCheck = await User.findOne({where:{id:id}});

    if(userCheck){
      res.status(201);
      res.json({user:userCheck});
    }else{
      res.status(200);
      res.json({error:'Usuario não encontrado...'});
    }
  }

}