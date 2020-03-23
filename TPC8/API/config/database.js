const ip = process.env.IP || 'localhost'
const port = process.env.PORT || '7779'

module.exports.onthology = process.env.GRAPHDB ? 'http://' + process.env.GRAPHDB +'/repositories/PRC_TPC7' : 'http://'+ip+':7200/repositories/PRC_TPC7'

module.exports.prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX cinema: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`
module.exports.host = 'http://'+ip+':'+port
