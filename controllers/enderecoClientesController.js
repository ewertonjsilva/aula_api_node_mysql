const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarEnderecoClientes(request, response) { 
        try {
            const sql = 'SELECT cli_id, end_logradouro, end_num, end_bairro, end_complemento, cid_id FROM endereco_clientes;';  
            const endereco = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: endereco[0].length, message: endereco[0]});  
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};
