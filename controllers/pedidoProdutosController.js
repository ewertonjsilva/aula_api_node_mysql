const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarPedidoProdutos(request, response) { 
        try {
            const sql = 'SELECT ppd_id, ppd_hora, ppd_qtd, ppd_valor, ppd_obs, ppd_status, ped_id, prd_id FROM pedido_produtos;';  
            const itens = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: itens[0].length, message: itens[0]});   
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async create(request, response) {
        try {
 
            const { itensPedido } = request.body;
            //console.log(itensPedido);
            let posicoes = []; 
            itensPedido.forEach((pos, i) => {
                //console.log(pos.ppd_hora, pos.ppd_qtd, pos.ppd_valor, pos.ppd_obs, pos.ppd_status, pos.ped_id, pos.prd_id); 
                posicoes.push([pos.ppd_hora, pos.ppd_qtd, pos.ppd_valor, pos.ppd_obs, pos.ppd_status, pos.ped_id, pos.prd_id]); 
            });

            const sql = 'INSERT INTO pedido_produtos (ppd_hora, ppd_qtd, ppd_valor, ppd_obs, ppd_status, ped_id, prd_id) VALUES ?'; 
   
            const confirmacao = await db.query(sql, [posicoes]);

            //console.log(confirmacao[0].insertId);
            return response.status(200).json({confirma: 'Itens adicionados com sucesso!'});   
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    }, 
};

