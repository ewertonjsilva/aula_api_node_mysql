
function produto (request, response, next) {
    const { prd_nome = '%%' } = request.body; 
    const { ptp_id = '%%' } = request.body;

    // console.log('Nome: ' + typeof(prd_nome));
    // console.log('Tipo: ' + typeof(ptp_id));

    if (typeof(prd_nome) !== 'string') {
        return response.status(500).json({confirma: 'Erro', message: 'O valor informado para pesquisa de produto deve ser um texto'});
    }
    
    if (typeof(ptp_id) !== 'number') {
        if (ptp_id !== '%%') {
            return response.status(500).json({confirma: 'Erro', message: 'O valor informado para o tipo de produto deve ser numérico'});
        }        
    }    

    next();
}

module.exports = produto;