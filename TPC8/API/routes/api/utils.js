var axios = require('axios')
const myhost = require('../../config/database').host
//var ExtractJWT = require("passport-jwt").ExtractJwt;
const urlGraphDB = require('../../config/database').onthology
const prefixes = require('../../config/database').prefixes

/**
 * Executa uma query SPARQL e devolve o resultado
 * @param method Define se é uma SPARQL Query ou uma SPARQL Update
 * @param query a query a executar
 */
exports.execQuery = async function(method, query){
    var getLink = urlGraphDB + "?query="
    var postLink = urlGraphDB + "/statements"
    var encoded = encodeURIComponent(prefixes + query)
    var response
    try{
        switch(method) {
            case "query":
                response = await axios.get(getLink + encoded)
                break;
            case "update":
                response = await axios.post(postLink, `update=${encoded}`)
                break;
            default:
                response = await axios.get(getLink + encoded)
                break;
        }
        return response.data
    }catch(error){
        throw(error)
    }
}

/**
 * Normaliza e simplifica os resultados de uma query SPARQL.
 * 
 * @example
 * response = {  
 *   head: { vars: ["sigla", "designacao", "estado", "internacional"] },
 *   results: {
 *     bindings: [{  
 *       estado:{ type: "literal", value:"Ativa" },
 *       sigla: { type:"literal", value:"AR" },
 *       designacao: { type:"literal", value:"Assembeia da República" },
 *       internacional: { type:"literal", value:"Não" }
 *     }]
 *   }
 * }
 * 
 * // O resultado da normalização da resposta acima será:
 * [{ estado: "Ativa", sigla: "PGR", designacao:"Assembleia da República", internacional:"Não" }]
 * 
 * @param response objeto de resposta da query SPARQL
 * @return objeto normalizado e simplificado
 */
exports.normalize = function(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
};