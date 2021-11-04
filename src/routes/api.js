const express = require('express');
const router = express.Router();

//middleware
const upload = require('../middleware/uploadImage');

// controllers
const NoticeController = require('../controllers/NoticeController');
const ComplaintsController = require('../controllers/ComplaintsController');
const ApartamentsController = require('../controllers/ApartamentsController');
// notices
// criar aviso
router.post('/notice', NoticeController.createNotice);
// atualizar aviso
router.put('/notice/:id', NoticeController.updateNotice);
//deletar aviso
router.delete('/notice/:id', NoticeController.deleteNotice);
//mostrar avisos
router.get('/notices', NoticeController.noticesAll);

// complaints
//criar reclamação
router.post('/complaint/:id',upload.single('image'), ComplaintsController.createComplaint);
//atualizar reclamação
router.put('/complaint/:id',upload.single('image'), ComplaintsController.updateComplaint);
//exibir reclamações
router.get('/complaints', ComplaintsController.complaintsAll);
//deletar reclamação
router.delete('/complaint/:id', ComplaintsController.deleteComplaint);

//apartaments
// adicionar apartamento
router.post('/apartament', ApartamentsController.createApartament);
//mostrar apartamentos
router.get('/apartaments', ApartamentsController.apartamentsAll);
//atualizar apartamento
router.put('/apartaments/:id', ApartamentsController.updateApartaments);

module.exports = router;