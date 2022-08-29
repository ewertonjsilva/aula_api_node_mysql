const db = require('../database/connection'); 
const express = require('express'); 
const router = express.Router();  

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

// definição de rotas

router.get('/cidades', CidadesController.listarCidades); 
// cadastrar
// editar
// excluir


router.get('/clientes', ClientesController.listarClientes); 
// cadastrar
// editar
// excluir


router.get('/enderecoclientes', EnderecoClientesController.listarEnderecoClientes); 
// cadastrar
// editar
// excluir


router.get('/mesas', MesasController.listarMesas); 
// cadastrar
// editar
// excluir


router.get('/pedidoprodutos', PedidoProdutosController.listarPedidoProdutos); 
// cadastrar
// editar
// excluir


router.get('/pedidos', PedidosController.listarPedidos); 
// cadastrar
// editar
// excluir


router.get('/pedidos', ProdutosController.listarProdutos); 
// cadastrar
// editar
// excluir


router.get('/produtostipo', ProdutosTipoController.listarProdutosTipo); 
// cadastrar
// editar
// excluir


router.get('/usuarios', UsuariosController.listarUsuarios); 
// cadastrar
// editar
// excluir

module.exports = router;

