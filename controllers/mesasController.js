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
            const { ins_nome, ins_status, ins_tipo, ins_n_aln, ins_prof, ins_dt_cad, ins_dt_controle, ins_classificacao, cid_id, ins_cnpj, ins_limite_aln } = request.body; 
            
            //const conn = db.connect(); 
            const sql = 'INSERT INTO INSTITUICOES (ins_nome, ins_status, ins_tipo, ins_cod_cad_prof, ins_n_aln, ins_prof, ins_dt_cad, ins_dt_controle, ins_classificacao, cid_id, ins_cnpj, ins_limite_aln) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [ins_nome, ins_status, ins_tipo, ins_cod_cad_prof, ins_n_aln, ins_prof, ins_dt_cad, ins_dt_controle, ins_classificacao, cid_id, ins_cnpj, ins_limite_aln];        
            const resultado = await db.query(sql, values);
            // Exibe o id do registro inserido
            const idInst = resultado[0].insertId; 
            // Exibe o código de cadastro de professores
            return response.status(200).json(ins_cod_cad_prof);
        } catch (error) { 
            return response.status(500).json(error);
        }
        
    },
};

