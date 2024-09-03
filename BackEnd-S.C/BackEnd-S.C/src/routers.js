const express = require("express");
const clientController = require("../controller/controller");
const client = require("../config/db");
const router = express.Router();

router.get('/', clientController.getRoot); //Rota Raiz
router.get('/api/read', clientController.listAllUsers); //Listar todos os usuários
router.get('/api/readNews', clientController.listAllNews); //Listar todos os usuários
router.get('/api/readNewsID/:id', clientController.listNewsbyID); //Listar todos os usuários
router.get('/api/read/:id', clientController.listByID); //Listar Usuários por ID
router.get('/api/readTreino/:id', clientController.listByIDTreino); //Listar Usuários por ID
router.post('/api/cadastro', clientController.createNewUser); //Cadastrar novo Usuário
router.post('/api/addWorkout', clientController.addWorkout); //Cadastrar novo Usuário
router.post('/api/validation', clientController.login); //login usuário
router.post('/api/resetPassword', clientController.resetPassword);//resetar a senha//
router.post('/api/resetInfo', clientController.resetInfo);//resetar a senha//
router.post('/api/reset', clientController.getByEmailReset);//verificar o email de reset//
router.post('/api/registerImage', clientController.registerImageProfile);//verificar o email de reset//
router.put('/api/registerImage/:id', clientController.updateUser);
router.delete('/api/deleteWorkout/:id', clientController.deleteWorkout);
module.exports = router;