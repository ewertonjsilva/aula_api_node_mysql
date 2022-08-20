const db = require("../database/connection"); 
const express = require('express'); 
const router = express.Router();  

// importação dos controlers utilizados nas rotas
const MesasController = require('../controllers/mesasController');

// definição de rotas
router.get('/mesas', MesasController.listarMesas); 


module.exports = router;

