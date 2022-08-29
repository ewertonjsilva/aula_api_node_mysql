const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarClientes(request, response) { 
        try {
            const sql = 'SELECT usu_id, cli_cel, cli_pts FROM clientes; ';  
            const clientes = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: clientes[0].length, message: clientes[0]});  
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};
