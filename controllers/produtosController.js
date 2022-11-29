const { json } = require("express"); 
var fs = require('fs');
const db = require("../database/connection"); 
const produto = require("../middlewares/validaProdutos");

function geraUrl (e) { 

    // garantir que valores em branco carreguem algo
    let img = e.prd_img ? e.prd_img : 'sem.png';
    // verifica se imagem existe
    if (fs.existsSync('./public/upload/produtos/' + img)) {
        img = 'sem.jpg';
    }    

    const produto = {
        prd_id: e.prd_id, 
        prd_nome: e.prd_nome, 
		ptp_id: e.ptp_id, 
		ptp_nome: e.ptp_nome, 
		prd_valor: e.prd_valor, 
		prd_unidade: e.prd_unidade, 
		prd_disponivel: e.prd_disponivel, 
		prd_img: 'http://10.67.23.125:3333/public/upload/produtos/' + img, 
		prd_destaque: e.prd_destaque, 
		prd_img_destaque: e.prd_img_destaque, 
		prd_descricao: e.prd_descricao
    }
    return produto;
}

module.exports = {
    async listarProdutos(request, response) { 
        try {
            // controle de resultados com paginação
            const { page = 1, limit = 5 } = request.query; 
            const inicio = (page -1) * limit;
            
            const { prd_nome = '%%' } = request.body; 
            const { ptp_id = '%%' } = request.body; 

            const p_nome_produto = prd_nome === '%%' ? '%%' : '%' + prd_nome + '%'; 

            const sqlCount = ('SELECT COUNT(*) AS cont_prod FROM produtos WHERE prd_nome like ? AND ptp_id like ?;');
            const valuesCont = [p_nome_produto, ptp_id];
            const n_prod = await db.query(sqlCount, valuesCont); 
            //console.log(n_txt[0].cont_txt);

            // const sql = ('SELECT pd.prd_id, pd.prd_nome, pt.ptp_id, pt.ptp_nome, pd.prd_valor, pd.prd_unidade, pd.prd_disponivel = 1 as prd_disponivel, pd.prd_img, pd.prd_destaque, pd.prd_img_destaque, pd.prd_descricao FROM produtos pd INNER JOIN produto_tipos pt ON pd.ptp_id = pt.ptp_id WHERE pd.prd_nome like ? AND pt.ptp_id like ? LIMIT ?, ?; ');
            const sqlCampos = ('SELECT pd.prd_id, pd.prd_nome, pt.ptp_id, pt.ptp_nome, pd.prd_valor, pd.prd_unidade, pd.prd_disponivel = 1 as prd_disponivel, pd.prd_img, pd.prd_destaque = 1 as prd_destaque, pd.prd_img_destaque, pd.prd_descricao FROM produtos pd '); 
            const sqlJoin = ('INNER JOIN produto_tipos pt ON pd.ptp_id = pt.ptp_id ');
            const sqlFiltro = ('WHERE pd.prd_nome like ? AND pt.ptp_id like ? LIMIT ?, ?; ');
            const values = [p_nome_produto, ptp_id, parseInt(inicio), parseInt(limit)]; 
            const produtos = await db.query(sqlCampos + sqlJoin + sqlFiltro, values); 

            // chamada para montar url
            const resultado = produtos[0].map(geraUrl);

            response.header('X-Total-Count', n_prod[0][0].cont_prod);  
            return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: resultado});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },  
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { nome, valor, unidade, tipo, disponivel, destaque, img_destaque, descricao } = request.body;  
            const img = request.file.filename;
                // instrução sql para inserção
            const sql = 'INSERT INTO produtos (prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [nome, parseFloat(valor), unidade, parseInt(tipo), parseInt(disponivel), img, parseInt(destaque), img_destaque, descricao]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const prd_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            const dados = {id: prd_id, nome, valor: parseFloat(valor).toFixed(2), unidade, tipo, disponivel, img: 'http://localhost:3333/public/upload/produtos/' + img};
            return response.status(200).json({confirma: 'Sucesso', message: dados});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 
    async listarHome(request, response) { 
        try {
           
            const sql = ('SELECT pd.prd_id, pd.prd_nome, pt.ptp_id, pt.ptp_nome, pd.prd_valor, pd.prd_unidade, pd.prd_disponivel = 1 as prd_disponivel, pd.prd_img, pd.prd_destaque = 1 as prd_destaque, pd.prd_img_destaque, pd.prd_descricao FROM produtos pd INNER JOIN produto_tipos pt ON pd.ptp_id = pt.ptp_id ORDER BY RAND() LIMIT 6;'); 
            const produtos = await db.query(sql); 

            // chamada para montar url
            const resultado = produtos[0].map(geraUrl);
  
            return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: resultado});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};

