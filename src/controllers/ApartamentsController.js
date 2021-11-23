const Apartaments = require('../models/Apartaments');

module.exports = {
  // adicionar apartamento
  createApartament: async (req,res)=>{
    if(req.body.apartament && req.body.proprietary && req.body.contact !== ''){
      let { apartament, contact, proprietary } = req.body;

      let apartamentCheck = await Apartaments.findOne({ 
        where: { apartament }
      });
      if(!apartamentCheck){

        let newApartament = await Apartaments.create({apartament, contact, proprietary});
        res.status(200);
        res.json({newApartament});
      }else{
        res.status(404);
        res.json({error:'Apartamento já cadastrado.'});
      }

    }else{
      res.status(404);
      res.json({error:'Preencha todos os campos...'});
    }
  },
  // mostrar apartamentos
  apartamentsAll: async (req,res)=>{
    let apartaments = await Apartaments.findAll({order:[['apartament','ASC']]});
    if(apartaments){
      res.status(200);
      res.json({apartaments});

    }else{
      res.status(404);
      res.json({error:'Não há apartamentos cadastrado.'})
    }
  },
  //atualizar dados do apartamento
  updateApartaments: async (req,res)=>{
    let { id } = req.params;
    let apartament = await Apartaments.findOne({
      where:{id}
    });

    if(apartament){
      let { contact, proprietary } = req.body;

      if(contact){
        apartament.contact = contact;
      };

      if(proprietary){
        apartament.proprietary = proprietary;
      };

      let newData = await apartament.save();
      res.status(200);
      res.json({newData});

    }else{
      res.status(200);
      res.json({error:'Apartamento não encontrado.'})
    }
  },
  // exibir apartamento especifico pelo id
  userApartament: async (req,res)=>{
    let { id } = req.params;

    let apartament = await Apartaments.findOne({where: {id}});

    if(apartament){
      res.status(201);
      res.json({apartament})
    }else{
      res.status(200);
      res.json({error:'Apartamento não encontrado...'})
    }
  }

}