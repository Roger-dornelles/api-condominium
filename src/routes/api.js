const express = require('express');
const router = express.Router();

//middleware
const upload = require('../middleware/uploadImage');

//config
const {privateRoute} = require('../config/passport');

// controllers
const NoticeController = require('../controllers/NoticeController');
const ComplaintsController = require('../controllers/ComplaintsController');
const ApartamentsController = require('../controllers/ApartamentsController');
const LocationController = require('../controllers/LocationController');
const MeetingsController = require('../controllers/MeetingsController');
const UserController = require('../controllers/PropetaryController');

//user
//cadastrar usuario
router.post('/user/new', UserController.createUser);
//exibir usuarios
router.get('/user/list',privateRoute, UserController.getUserList);
//atualizar dados do usuario
router.put('/user/:id',privateRoute, UserController.updateUser);
//excluir usuario
router.delete('/user/delete/:id',privateRoute, UserController.deleteUser);
//login do usuario
router.post('/user/signin', UserController.signin)

// notices
// criar aviso
router.post('/notice',privateRoute, NoticeController.createNotice);
// atualizar aviso
router.put('/notice/:id',privateRoute, NoticeController.updateNotice);
//deletar aviso
router.delete('/notice/:id',privateRoute, NoticeController.deleteNotice);
//mostrar avisos
router.get('/notices',privateRoute, NoticeController.noticesAll);

// complaints
//criar reclamação
router.post('/complaint/:id',privateRoute,upload.single('image'), ComplaintsController.createComplaint);
//atualizar reclamação
router.put('/complaint/:id',privateRoute,upload.single('image'), ComplaintsController.updateComplaint);
//exibir reclamações
router.get('/complaints',privateRoute, ComplaintsController.complaintsAll);
//deletar reclamação
router.delete('/complaint/:id',privateRoute, ComplaintsController.deleteComplaint);
//exibir reclamação do usuario
router.get('/user/complaints/:id',privateRoute,ComplaintsController.complaintsUser);

//apartaments
// adicionar apartamento
router.post('/apartament',privateRoute, ApartamentsController.createApartament);
//mostrar apartamentos
router.get('/apartaments',privateRoute, ApartamentsController.apartamentsAll);
//atualizar apartamento
router.put('/apartaments/:id',privateRoute, ApartamentsController.updateApartaments);
// exibir apartamento especifico pelo id
router.get('/apartament/user/:id',privateRoute, ApartamentsController.userApartament);

//Location
//criar locação
router.post('/location/:id',privateRoute, LocationController.createLocation);
// editar locação
router.put('/location/:id',privateRoute, LocationController.updateLocation);
// excluir reserva
router.delete('/location/delete/:id',privateRoute, LocationController.deleteLocation);
// exibir locações
router.get('/location',privateRoute, LocationController.getLocations);

//Meetings
//criar reunião
router.post('/meeting',privateRoute, MeetingsController.createMeeting);
// atualizar reunião
router.put('/meeting/:id',privateRoute, MeetingsController.updateMeeting);
// exibir reuniões
router.get('/meetings',privateRoute, MeetingsController.getMeetings);
//excluir Reunião
router.delete('/meeting/:id',privateRoute, MeetingsController.deleteMeeting);


module.exports = router;