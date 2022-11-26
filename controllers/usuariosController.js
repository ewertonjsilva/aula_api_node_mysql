const { json } = require("express");
const db = require("../database/connection"); 
const bcrypt = require("bcrypt");

module.exports = {
    async listarUsuarios(request, response) { 
        try {
            const sql = 'SELECT usu_id, usu_nome, usu_email, usu_senha, usu_tipo FROM usuarios;';  
            const usuarios = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].length, message: usuarios[0]});   
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
    async create(request, response) {
        try {
                // parâmtros passados via corpo da requisição
            const { nome, email, senha, tipo } = request.body;  
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, salt);
                 
            const sql = 'INSERT INTO usuarios (usu_nome, usu_email, usu_senha, usu_tipo) VALUES (?, ?, ?, ?)'; 
                // definição de array com os parâmetros que receberam os valores do front-end
            const values = [nome, email, hash, tipo]; 
                // executa a instrução de inserção no banco de dados       
            const confirmacao = await db.query(sql, values);
                // Exibe o id do registro inserido
            const usu_id = confirmacao[0].insertId; 
                // Mensagem de retorno no formato JSON
            const dados = {id: usu_id, nome, email, tipo};
            return response.status(200).json({confirma: 'Sucesso', message: dados});
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }   
    },
    async session(request, response) {
        try {
            const { login, senha } = request.body; 
 
            const sql = 'SELECT usu_id, usu_nome, usu_email, usu_senha, usu_tipo FROM usuarios WHERE usu_email = ?;';  
            const values = [login];      
            const usuario = await db.query(sql, values);
  
            if (usuario[0].length === 0) {
                return response.status(200).json({confirma: 'Erro', message: 'E-mail não existe!'});   
            }

            let logar = bcrypt.compareSync(senha, usuario[0][0].usu_senha);
            if (logar == true) {
                return response.status(200).json({confirma: true, id: usuario[0][0].usu_id, nome: usuario[0][0].usu_nome, tipo: usuario[0][0].usu_tipo});   
            } else {
                return response.status(200).json({confirma: false, message: 'A senha não corresponde!'});   
            }            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    }, 
};

