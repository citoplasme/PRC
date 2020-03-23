var express = require('express');
var router = express.Router();
var Movies = require('../../controllers/api/cinema.js')

router.get('/', async (req, res, next) => {
	try{
        res.jsonp(await Movies.listarPersonagens(req.query))
    } catch(erro){
        res.status(500).send(`Erro na listagem das personagens: ${erro}`)
    }
})

router.get('/:id', async (req, res, next) => {
	try{
        res.jsonp(await Movies.PersonagemfindOne(req.params.id))
    } catch(erro){
        res.status(500).send(`Erro na listagem da personagem: ${erro}`)
    }
})

module.exports = router;
