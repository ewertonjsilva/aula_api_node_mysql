const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarMesas(request, response) { 
        try {
            const sql = 'SELECT mes_id, mes_nome, mes_status, mes_lugares, ped_id FROM mesas;';  
            const mesas = await db.query(sql); 
            //console.log('tam: ' + mesas[0].length);
            //return response.status(200).json(mesas[0]);   
            // return response.status(200).json(mesas[0][0]); // apenas 1º item do resultado sql
            // return response.status(200).json(mesas[0][0].mes_lugares); // apenas o valor de um item retornado
            return response.status(200).json({confirma: 'Sucesso', nResults: mesas[0].length, message: mesas[0]});   
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async create(request, response) {
        try {
            const { mes_nome, mes_status, mes_lugares, ped_id } = request.body; 
            
            const sql = 'INSERT INTO mesas (mes_nome, mes_status, mes_lugares, ped_id) VALUES (?, ?, ?, ?)';
            const values = [mes_nome, mes_status, mes_lugares, ped_id];        
            const confirmacao = await db.query(sql, values);
            // Exibe o id do registro inserido
            const mes_id = confirmacao[0].insertId; 
            // Exibe o código de cadastro de professores
            return response.status(200).json({confirma: 'Sucesso', message: mes_id});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    },
};

