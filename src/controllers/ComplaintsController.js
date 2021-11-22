const Apartaments = require('../models/Apartaments');
const Complaint = require('../models/Complaint');

const formatDate = ()=>{
  let date = new Date();
  let day = date.getDate().toString().padStart(2,'0');
  let month = date.getMonth()+1;
  let year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

module.exports = {
  // criar reclamação
  createComplaint: async(req,res)=>{

    let {description,conclusion,date_conclusion} = req.body;
    let {id} = req.params;

    let userCheck = await Apartaments.findOne({
      where:{id}
    });

    if(!conclusion){
      conclusion = false;
    }

    if(date_conclusion === '' || !date_conclusion){
      date_conclusion = 'Em Analise'
    }

    if(userCheck){
      if(description !== ''){
        let image = req.file.filename;
        let userId = userCheck.id;
        let date_inicial = formatDate();

        const newComplaints = await Complaint.create({description,image,userId,date_inicial,conclusion,date_conclusion});
        res.status(201)
        res.json({newComplaints})
      }else{
        res.status(200);
        res.json({error:'Precisa de descrição'})
      }

    }else{
      res.status(200);
      res.json({error:'Não autorizado'});
    }
  },
  //atualizar reclamação
  updateComplaint: async (req,res)=>{
    let {id} = req.params;
    let { description, conclusion, image } = req.body;

    let complaintCheck = await Complaint.findOne({
      where:{id}
    });

    if(complaintCheck){

      if(description){
        complaintCheck.description = description;
      };

      if(conclusion){
        complaintCheck.conclusion = conclusion;
      };

      if(image){
        complaintCheck.image = req.file.filename;
      }

      let newComplaint = await complaintCheck.save();
      res.status(201);
      res.json({newComplaint})

    }else{
      res.status(200);
      res.json({error:'Reclamação não encontrada.'})
    }
  },
  // exibir reclamações
  complaintsAll: async (req,res)=>{
    let complaints = await Complaint.findAll();
    res.status(201);
    res.json({complaints})
  },
  //deletar reclamação
  deleteComplaint: async (req,res)=>{
    let { id } = req.params;

    let complaintCheck = await Complaint.findOne({
      where:{id}
    });

    if(complaintCheck){
      await complaintCheck.destroy();
      res.status(200);
      res.json({});
    }else{
      res.status(200);
      res.json({error:'Reclamação não encontrada.'});
    }
  },
  // exibir reclamaçoes da usuario
  complaintsUser: async (req,res)=>{
    let { id } = req.params;
    let user = await Apartaments.findOne({where: {id}});
    if (user){
      let complaints = await Complaint.findAll({where:{userId: user.id}});
      res.status(201);
      res.json({complaints})

    }else{
      res.status(200);
      res.json({error:'Reclamação não encontrada.'});
    }
  }

}