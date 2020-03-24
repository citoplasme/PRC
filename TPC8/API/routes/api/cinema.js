var express = require('express');
var router = express.Router();
var Movies = require('../../controllers/api/cinema.js')

router.get('/', async (req, res, next) => {
	try{
        res.jsonp(await Movies.listar(req.query))
    } catch(erro){
        res.status(500).send(`Erro na listagem dos filmes: ${erro}`)
    }
})

router.get('/:id', async (req, res, next) => {
	try{
        var filme = await Movies.findOne(req.params.id);
        filme.produtores = await Movies.getProducers(req.params.id);
        filme.generos = await Movies.getGeneros(req.params.id);
        filme.personagens = await Movies.getPersonagens(req.params.id);
        filme.realizadores = await Movies.getRealizadores(req.params.id);
        res.jsonp(filme)
    } catch(erro){
        res.status(500).send(`Erro na apresentação do filme: ${erro}`)
    }
})

module.exports = router;
