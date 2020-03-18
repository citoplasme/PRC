var fs = require('fs')

function dirtoTTL(id){
    id = id.replace(new RegExp('\'', 'g'), '_');
    id = id.replace(new RegExp('\,', 'g'), '_');
    id = id.replace('(', '');
    id = id.replace(')', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('-', '');
    id = id.replace('&', '');
    id = id.replace('−', '-');
    
    return `
###  http://www.semanticweb.org/joaopimentel/ontologies/2020/2/aula7#${id}
:${id} rdf:type owl:NamedIndividual ,
                                :Pessoa ,
                                :Realizador .
`;
}

function writertoTTL(id){
    id = id.replace(new RegExp('\'', 'g'), '_');
    id = id.replace(new RegExp('\,', 'g'), '_');
    id = id.replace('(', '');
    id = id.replace(')', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('-', '');
    id = id.replace('&', '');
    id = id.replace('−', '-');
    
    return `
###  http://www.semanticweb.org/joaopimentel/ontologies/2020/2/aula7#${id}
:${id} rdf:type owl:NamedIndividual ,
                            :Escritor ,
                            :Pessoa .
`;
}

function musiciantoTTL(id){
    id = id.replace(new RegExp('\'', 'g'), '_');
    id = id.replace(new RegExp('\.', 'g'), '_');
    id = id.replace(new RegExp('\,', 'g'), '_');
    id = id.replace('(', '');
    id = id.replace(')', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('-', '');
    id = id.replace('&', '');
    id = id.replace('−', '-');
    
    return `
###  http://www.semanticweb.org/joaopimentel/ontologies/2020/2/aula7#${id}
:${id} rdf:type owl:NamedIndividual ,
                            :Compositor ,
                            :Pessoa .
`;
}


function actortoTTL(id, name, gender){
    id = id.replace(new RegExp('\'', 'g'), '_');
    id = id.replace(new RegExp('\,', 'g'), '_');
    id = id.replace('(', '');
    id = id.replace(')', '');
    id = id.replace('-', '');
    id = id.replace('&', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('−', '-');
    name = name.replace(new RegExp('\"', 'g'), '');
    return `
###  http://www.semanticweb.org/joaopimentel/ontologies/2020/2/aula7#${id}
:${id} rdf:type owl:NamedIndividual ,
                        :Ator ,
                        :Pessoa ;
                :nome "${name}" ;
                :sexo "${gender}" .    
`;
}

function movietoTTL(id, name, directors,/* musicians, writers,*/ country){
    id = id.replace(new RegExp('\'', 'g'), '_');
    id = id.replace(new RegExp('\,', 'g'), '_');
    id = id.replace('(', '');
    id = id.replace(')', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('.', '');
    id = id.replace('-', '');
    id = id.replace('&', '');
    id = id.replace('−', '-');
    var res = `###  http://www.semanticweb.org/joaopimentel/ontologies/2020/2/aula7#${id}\n`
    res += `:${id} rdf:type owl:NamedIndividual ,\n`
    res += `                :FIlme ;\n`
    directors.forEach(dir => {
        dir = dir.replace(new RegExp('\'', 'g'), '_');
        dir = dir.replace(new RegExp('\,', 'g'), '_');
        dir = dir.replace('(', '');
        dir = dir.replace(')', '');
        dir = dir.replace('.', '');
        dir = dir.replace('.', '');
        dir = dir.replace('.', '');
        dir = dir.replace('-', '');
        dir = dir.replace('&', '');
        dir = dir.replace('−', '-');
        res += `                :temRealizador :${dir};\n`;
    })
    if(country == 'United States')
        res += '                :temPaísOrigem :Estados_Unidos ;\n'
    res += `                :nome "${name}".\n`;
    return res;
}

var di = fs.readFileSync('directors.json').toString();
var dirs = JSON.parse(di)

dirs.forEach(dir => {
    fs.appendFileSync('output.ttl', dirtoTTL(dir));
})

var wi = fs.readFileSync('writers.json').toString();
var writs = JSON.parse(wi)

writs.forEach(wri => {
    fs.appendFileSync('output.ttl', writertoTTL(wri));
})

var mui = fs.readFileSync('musicians.json').toString();
var musics = JSON.parse(mui)

musics.forEach(mus => {
    fs.appendFileSync('output.ttl', musiciantoTTL(mus));
})

var ai = fs.readFileSync('actors.json').toString();
var acs = JSON.parse(ai)

acs.forEach(element => {
    fs.appendFileSync('output_actors.ttl', actortoTTL(element.id, element.name, element.gender));    
});

var mi = fs.readFileSync('movies.json').toString();
var movs = JSON.parse(mi)

movs.forEach(element => {
    fs.appendFileSync('output_movies.ttl', movietoTTL(element.id, element.name, element.directors, element.country));    
});

