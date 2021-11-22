const Notices = require('../models/Notices');
module.exports = {
  //criar aviso
  createNotice:async (req,res) =>{
    if(req.body.title && req.body.description !== ''){
      let {title, description} = req.body;

      let newNotice = await Notices.create({title,description});
      res.json({newNotice});

    }else{
      res.status(200);
      res.json({error:'Campos não preechidos...'})
    }
  },
  // atualizar aviso
  updateNotice:async (req,res)=>{
    let {id} = req.params;

    let warning = await Notices.findByPk(id);
    if(warning){
      let {title, description} = req.body;
      if(title !== ''){
        warning.title = title;
      };

      if(description !== ''){
        warning.description = description;
      };

      await warning.save();
      res.status(200);
      res.json(warning);
      
    }else{
      res.status(404);
      res.json({error:'Aviso não encontrado...'})
    }
  },
  //deletar aviso
  deleteNotice:async (req,res)=>{
    let { id } = req.params;
    let warning = await Notices.findByPk(id);
    if(warning){
      await warning.destroy();
      res.status(200);
      res.json({})
    }else{
      res.status(404);
      res.json({error:'Aviso não encontrado...'})
    }
    
  },
  //mostrar avisos
  noticesAll: async (req, res)=>{
    let notices = await Notices.findAll();
    res.status(200);
    res.json({notices});

    if(!notices){
      res.status(404);
      res.json({error:'Não existe Avisos'})
    }
  }

};