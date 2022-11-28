const db = require('../database/connection'); 
const express = require('express'); 
const router = express.Router();  

const upload = require('../middlewares/uploadImage');
// const multer = require("multer"); 

// const storage = multer.diskStorage({
//    destination: function (req, file, cb)  {
//         cb(null, './public/upload/produtos/');
//    }, 
//    filename: function (req, file, cb) {
//         let data = new Date().toISOString().replace(/:/g, '-') + '-';
//         cb(null, data + file.originalname);
//    }
// }); 

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false); 
//     }
// } 

// const upload = multer({
//     storage: storage, 
//     limits: {
//         fieldSize: 1024 * 1024 * 5
//     }, 
//     fileFilter: fileFilter
// });

// importação dos controlers utilizados nas rotas
const CidadesController = require('../controllers/cidadesController');
const ClientesController = require('../controllers/clientesController');
const EnderecoClientesController = require('../controllers/enderecoClientesController');
const MesasController = require('../controllers/mesasController');
const PedidoProdutosController = require('../controllers/pedidoProdutosController');
const PedidosController = require('../controllers/pedidosController');
const ProdutosController = require('../controllers/produtosController');
const ProdutosTipoController = require('../controllers/produtoTipoController');
const UsuariosController = require('../controllers/usuariosController'); 

// importação Middleware
const produto = require('../middlewares/validaProdutos');

// definição de rotas

router.post('/cidades', CidadesController.listarCidades); 
router.get('/estados', CidadesController.listarEstados); 
// cadastrar
// editar
// excluir


router.get('/clientes', ClientesController.listarClientes); 
router.post('/clientes', ClientesController.cadClientes); 
// editar
// excluir


router.get('/enderecoclientes', EnderecoClientesController.listarEnderecoClientes); 
// cadastrar
// editar
// excluir


router.get('/mesas', MesasController.listarMesas); 
router.get('/mesas/:mes_id', MesasController.listarMesa); 
router.post('/mesas', MesasController.create); // body
router.patch('/mesas/:mes_id', MesasController.update); // params(link) e body
router.delete('/mesas/:mes_id', MesasController.delete); // params(link)


router.get('/pedidoprodutos', PedidoProdutosController.listarPedidoProdutos); 
router.post('/pedidoprodutos', PedidoProdutosController.create); 
// editar
// excluir


router.get('/pedidos', PedidosController.listarPedidos); 
// cadastrar
// editar
// excluir


router.get('/produtos', produto, ProdutosController.listarProdutos); // query(link)
router.get('/produtoshome', ProdutosController.listarHome); 
router.post('/produtos', upload.single('img'), ProdutosController.create);
// editar
// excluir


router.get('/produtostipo', ProdutosTipoController.listarProdutosTipo); 
// cadastrar
// editar
// excluir


router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.create); 
router.post('/usuarios/login', UsuariosController.session);
// editar
// excluir

module.exports = router;

