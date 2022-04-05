const { dataHora } = require('../helpers/functions')
const { consoleLog } = require('../helpers/functions')

module.exports = {

    healthCheck(req, res){
        consoleLog("CHAMADA-ENDPOINT", "HEALTH-CHECK", "/api/health-check")
        res.status(200).send({
            status: true,
            dataHora: dataHora("datahora"),
            message: 'Aplicação rodando normalmente'
        })
    }

}