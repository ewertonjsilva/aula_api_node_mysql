// Ewerton 
const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarCidades(request, response) { 
        try {
            const sql = 'SELECT cid_id, cid_nome, cid_uf FROM cidades;';  
            const cidades = await db.query(sql); 
            //console.log('tam: ' + mesas[0].length);
            //return response.status(200).json(mesas[0]);   
            // return response.status(200).json(mesas[0][0]); // apenas 1º item do resultado sql
            // return response.status(200).json(mesas[0][0].mes_lugares); // apenas o valor de um item retornado
            return response.status(200).json({confirma: 'Sucesso', nResults: cidades[0].length, message: cidades[0]});    
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },  
};
