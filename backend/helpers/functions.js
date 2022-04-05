let dateTime = require("node-datetime");

// ============== DATA HORA ==============
function dataHora(tipo) {
    try{
        let dt = dateTime.create();
        let dataFormatada = '';

        switch(tipo){
            case 'datahora':
                dataFormatada = dt.format("d/m/20y H:M:S");
                break;
            case 'data':
                dataFormatada = dt.format("d/m/20y");
                break;
            case 'hora':
                dataFormatada = dt.format("H:M:S");
                break;
            case 'datainvertida':
                dataFormatada = dt.format("20y-m-d");
                break;
        }
        return dataFormatada;

    }catch(error){
        consoleLog("DATAHORA", "CATCH", "Falha ao capturar a data/hora atual");
    }
}

// ============== CONSOLE LOG ==============
function consoleLog(funcao, acao, mensagem, metodo){
    try{
        console.log(`[${dataHora("datahora")}] [${funcao}] [${metodo}] [${acao}] [${mensagem}]`);
    } catch(error){
        console.log("Falha ao montar log");
    }
}

module.exports = {
    dataHora,
    consoleLog
}