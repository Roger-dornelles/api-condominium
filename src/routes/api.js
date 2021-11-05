const express = require('express');
const router = express.Router();

//middleware
const upload = require('../middleware/uploadImage');

// controllers
const NoticeController = require('../controllers/NoticeController');
const ComplaintsController = require('../controllers/ComplaintsController');
const ApartamentsController = require('../controllers/ApartamentsController');
const LocationController = require('../controllers/LocationController');
const MeetingsController = require('../controllers/MeetingsController');

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

//Location
//criar locação
router.post('/location/:id', LocationController.createLocation);
// editar locação
router.put('/location/:id', LocationController.updateLocation);
// excluir reserva
router.delete('/location/delete/:id', LocationController.deleteLocation);
// exibir locações
router.get('/location', LocationController.getLocations);

//Meetings
//criar reunião
router.post('/meeting', MeetingsController.createMeeting);
// atualizar reunião
router.put('/meeting/:id', MeetingsController.updateMeeting);
// exibir reuniões
router.get('/meetings', MeetingsController.getMeetings);
//excluir Reunião
router.delete('/meeting/:id', MeetingsController.deleteMeeting);


module.exports = router;