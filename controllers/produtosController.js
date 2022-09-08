const { json } = require("express");
const db = require("../database/connection"); 

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

            // const sql = ('SELECT pd.prd_id, pd.prd_nome, pt.ptp_id, pt.ptp_nome, pd.prd_valor, pd.prd_unidade, pd.prd_disponivel, pd.prd_img FROM produtos pd INNER JOIN produto_tipos pt ON pd.ptp_id = pt.ptp_id WHERE pd.prd_nome like ? AND pt.ptp_id like ? LIMIT ?, ?; ');
            const sqlCampos = ('SELECT pd.prd_id, pd.prd_nome, pt.ptp_id, pt.ptp_nome, pd.prd_valor, pd.prd_unidade, pd.prd_disponivel = 1 as prd_disponivel, pd.prd_img FROM produtos pd '); 
            const sqlJoin = ('INNER JOIN produto_tipos pt ON pd.ptp_id = pt.ptp_id ');
            const sqlFiltro = ('WHERE pd.prd_nome like ? AND pt.ptp_id like ? LIMIT ?, ?; ');
            const values = [p_nome_produto, ptp_id, parseInt(inicio), parseInt(limit)]; 
            const produtos = await db.query(sqlCampos + sqlJoin + sqlFiltro, values);

            response.header('X-Total-Count', n_prod[0][0].cont_prod);
            //return response.status(200).json(produtos[0]);  
            return response.status(200).json({confirma: 'Sucesso', nResults: produtos[0].length, message: produtos[0]});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};

