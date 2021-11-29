const Location = require('../models/Location');
const Apartament = require('../models/Apartaments');

module.exports = {
  createLocation: async (req,res)=>{
    let {area, date} = req.body;
    let {id} = req.params;

    let idCheck = await Apartament.findOne({ 
      where:{id}
    });

    if(idCheck){

      if(area && date !== ''){
        let proprietary= idCheck.proprietary;
        let apartament= idCheck.apartament;
        let userId = idCheck.id;
        let newLocation = await Location.create({area,proprietary,apartament,date,userId});
        res.status(201);
        res.json({newLocation})
      }else{
        res.status(404);
        res.json({error:'Preencha todos os campos.'})
      }

    }else{
      res.status(404);
      res.json({error:'Não autorizado.'})
    }

  },
  //atualizar locação
  updateLocation: async(req,res) => {
    let { id } =  req.params;
    let {area,date} = req.body;

    let idCheck = await Location.findOne({where: {id}});

    if(idCheck){

      if(area){
        idCheck.area = area;
      };

      if(date){
        idCheck.date = date;
      };

      let location = await idCheck.save();
      res.status(200);
      res.json({location});
    }else{
      res.status(404);
      res.json({error:'Reserva não encontrada.'})
    }
  },
  //excluir reserva
  deleteLocation: async(req,res)=>{
    let { id }= req.params;

    let idCheck = await Location.findOne({where: {id}});
    if(idCheck){
      idCheck.destroy();
      res.status(200);
      res.json({})
    }else{
      res.status(404);
      res.json({error:'Reserva não encontrada'})
    }
  },
  //exibir todas locações
  getLocations: async(req,res)=>{

    let locations = await Location.findAll();
    if(locations){
      res.status(201);
      res.json({locations});
    }else{
      res.status(200);
      res.json({error:'Não há reservas...'})
    }
  },
  // exibir locação especifica pelo id do usuario
  getLocationUser: async(req,res)=>{
    let {id} = req.params;
    let userLocation = await Location.findAll({where: {userId:id}});
    if(userLocation){
      res.status(201);
      res.json({userLocation});
    }else{
      res.status(200);
      res.json({error:'Não há Reserva...'})
    }
  }


}