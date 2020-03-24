const execQuery = require('./utils').execQuery
const normalize = require('./utils').normalize
const Movies = module.exports

Movies.listar = (filtro) => {
	const query = `select ?id ?nome ?duracao ?data ?pais ?realizador where {
        ?id rdf:type cinema:Filme .
        ?id cinema:nome ?nome .
        ?id cinema:duração ?duracao .
        ?id cinema:dataLançamento ?data .
        optional {
            ?id cinema:temPaísOrigem ?p .
            bind(replace(strafter(str(?p), "cinema#"), "_", " ") as ?pais) .
        }
    }`
	return execQuery('query', query).then((response) => normalize(response))
}

Movies.findOne = async (id) => {
	const query = `select ?nome ?duracao ?data ?pais ?realizador where {
        cinema:${id} rdf:type cinema:Filme .
        cinema:${id} cinema:nome ?nome .
        cinema:${id} cinema:duração ?duracao .
        cinema:${id} cinema:dataLançamento ?data .
        optional {
            cinema:${id} cinema:temPaísOrigem ?p .
            bind(replace(strafter(str(?p), "cinema#"), "_", " ") as ?pais) .
        }
        optional {
            cinema:${id} cinema:temRealizador ?r .
            ?r cinema:nome ?realizador .
        }
    }`
    const response = await execQuery('query', query)
    return normalize(response)[0]
}
// produtores, realizadores, generos, personagens
Movies.getProducers = async (id) => {
	const query = `select ?prod where {
        cinema:${id} rdf:type cinema:Filme .
        cinema:${id} cinema:foiProduzido ?p .
        ?p cinema:nome ?prod . 
    }`
    
	const response = await execQuery('query', query)
    return normalize(response)
}

Movies.getRealizadores = async (id) => {
	const query = `select ?realizador where {
        cinema:${id} rdf:type cinema:Filme .
        cinema:${id} cinema:temRealizador ?p .
        ?p cinema:nome ?realizador . 
    }`
	const response = await execQuery('query', query)
    return normalize(response)
}

Movies.getGeneros = async (id) => {
	const query = `select ?genero where {
        cinema:${id} rdf:type cinema:Filme .
        cinema:${id} cinema:temGénero ?p .
        ?p cinema:nome ?genero . 
    }`
	const response = await execQuery('query', query)
    return normalize(response)
}

Movies.getPersonagens = async (id) => {
	const query = `select ?personagem where {
        cinema:${id} rdf:type cinema:Filme .
        cinema:${id} cinema:temPersonagem ?p .
        ?p cinema:nome ?personagem . 
    }`
	const response = await execQuery('query', query)
    return normalize(response)
}

Movies.listarPersonagens = (filtro) => {
    const query = `select distinct ?p ?personagem where {
        ?p rdf:type cinema:Personagem .
        ?p cinema:nome ?personagem . 
    }`;
    return execQuery('query', query).then((response) => normalize(response))
}

Movies.PersonagemfindOne = async (id) => {
    const query = `select ?nome where {
        cinema:${id} rdf:type cinema:Personagem .
        cinema:${id} cinema:nome ?nome . 
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}

Movies.listarAtores = (filtro) => {
    const query = `select distinct ?id ?nome where {
        ?id rdf:type cinema:Ator .
        ?id cinema:nome ?nome . 
    }`;
    return execQuery('query', query).then((response) => normalize(response))
}

Movies.AtoresfindOne = async (id) => {
    const query = `select ?nome where {
        cinema:${id} rdf:type cinema:Ator .
        cinema:${id} cinema:nome ?nome . 
    }`;
    const response = await execQuery('query', query)
    return normalize(response)[0]
}