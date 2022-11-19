const { json } = require("express");
const db = require("../database/connection"); 
const bcrypt = require("bcrypt");

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
    async cadClientes(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { nome, email, senha, tipo, pts, cidade, celular, logradouro, num, bairro, compl } = request.body;  
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, salt);
            
            // insere usuario
            const sqlUsu = 'INSERT INTO usuarios (usu_nome, usu_email, usu_senha, usu_tipo) VALUES (?, ?, ?, ?)'; 
            const valuesUsu = [nome, email, hash, tipo];      
            const confirmacaoUsu = await db.query(sqlUsu, valuesUsu);
            const usu_id = confirmacaoUsu[0].insertId; 

            // insere cliente
            const sqlCli = 'INSERT INTO clientes (usu_id, cli_cel, cli_pts) VALUES (?, ?, ?)'; 
            const valuesCli = [usu_id, celular, pts];      
            const confirmacaoCli = await db.query(sqlCli, valuesCli);

            // insere endereco
            const sqlEnd = 'INSERT INTO endereco_clientes (cli_id, end_logradouro, end_num, end_bairro, end_complemento, cid_id) VALUES (?, ?, ?, ?, ?, ?)'; 
            const valuesEnd = [usu_id, logradouro, num, bairro, compl, cidade];      
            const confirmacaoEnd = await db.query(sqlEnd, valuesEnd);            


                // Mensagem de retorno no formato JSON
            const dados = {id: usu_id, pts, logradouro};
            return response.status(200).json({confirma: 'Sucesso', message: dados});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    },
};
