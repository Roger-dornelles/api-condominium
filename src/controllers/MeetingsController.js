const Meeting = require('../models/Meeting');

module.exports = {
  createMeeting: async(req,res) => {
      let { description, date} = req.body;

      if(description && date) {
        let meeting = await Meeting.create({ description,date});
        res.status(201);
        res.json({ meeting});
      }else{
        res.status(404);
        res.json({error: 'Preencha todos os campos.'});
    }
  },
  // atualizar reunião
  updateMeeting: async (req,res)=>{
    let { id } = req.params;
    let { description,date,canceled } = req.body;
    let meetingCheck = await Meeting.findOne({where: {id}});

    if(meetingCheck){
      if(description){
        meetingCheck.description = description;
      };

      if(date){
        meetingCheck.date = date;
      };

      if(canceled){
        meetingCheck.canceled = canceled;
      };

      let meeting = await meetingCheck.save();
      res.status(201);
      res.json({ meeting})
    }else{
      res.status(404);
      res.json({error:'Reunião não encontrada.'});
    }
  },
  //exibir reuniões
  getMeetings: async(req,res) => {
    let meetings = await Meeting.findAll();
    if(meetings){
      res.status(200);
      res.json({meetings});
    }else{
      res.status(404);
      res.json({error:'Não há reuniões.'})
    }
  },
  //excluir reunião
  deleteMeeting: async(req,res) => {
    let { id } = req.params;
    let idCheck = await Meeting.findOne({where: {id}});

    if(idCheck){
      await idCheck.destroy();
      res.status(200);
      res.json({});
    }else{
      res.status(404);
      res.json({error:'Reunião não encontrada.'})
    }
  }
}