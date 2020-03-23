var express = require('express');
var router = express.Router();
var Movies = require('../../controllers/api/cinema.js')

router.get('/', async (req, res, next) => {
	try{
        res.jsonp(await Movies.listarAtores(req.query))
    } catch(erro){
        res.status(500).send(`Erro na listagem dos atores: ${erro}`)
    }
})

router.get('/:id', async (req, res, next) => {
	try{
        res.jsonp(await Movies.AtoresfindOne(req.params.id))
    } catch(erro){
        res.status(500).send(`Erro na listagem do ator: ${erro}`)
    }
})

module.exports = router;
