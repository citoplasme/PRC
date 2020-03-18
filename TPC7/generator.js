var fs = require('fs')

function Movie(id, name, directors, musicians, writers, country) {
    this.id = id;
    this.name = name;
    this.directors = directors;
    this.musicians = musicians;
    this.writers = writers;
    this.country = country;
}

function Actor(id, name, gender) {
    this.id = id;
    this.name = name;
    this.gender = gender;
}

function get_dmw(dados) {
    var writers = new Set();
    var musicians = new Set();
    var directors = new Set();
    dados.forEach(element => {
        writers.add(element.writer.split('/')[element.writer.split('/').length - 1]);
        musicians.add(element.music.split('/')[element.music.split('/').length - 1]);
        directors.add(element.dir.split('/')[element.dir.split('/').length - 1]);        
    });
    return {writers, musicians, directors};
}

function actors(dados){
    var actors = new Set();
    dados.forEach(element => {
        if(typeof element.wife === 'undefined') gender = 'F';
        else gender = 'M';
        var a = new Actor(element.m.split('/')[element.m.split('/').length - 1], element.mname, gender);
        actors.add(a);
    });
    return actors;
}

function groupBy(key, array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var added = false;
        for (var j = 0; j < result.length; j++) {
            if (result[j][key] == array[i][key]) {
                result[j].items.push(array[i]);
                added = true;
                break;
            }
        }
        if (!added) {
            var entry = {items: []};
            entry[key] = array[i][key];
            entry.items.push(array[i]);
            result.push(entry);
        }
    }
    return result;
}

function filter_array(obj){
    var movies = new Set();
    obj.forEach(element => {
        var writers = new Set();
        var musicians = new Set();
        var directors = new Set();
        element.items.forEach(item => {
            writers.add(item.writer.split('/')[item.writer.split('/').length - 1]);
            musicians.add(item.music.split('/')[item.music.split('/').length - 1]);
            directors.add(item.dir.split('/')[item.dir.split('/').length - 1]);        
        })
        var country = element.items[0].country;
        var name = element.items[0].fname;
        var id = element.f.split('/')[element.f.split('/').length - 1];
        var movie = new Movie(id, name, directors, musicians, writers, country);
        movies.add(movie);
    })
    return movies;
}

function moviestoJSON(obj){
    var response = [];
    for (var movie of obj) {
        filme = {
            id : movie.id,
            name : movie.name,
            directors : Array.from(movie.directors),
            musicians : Array.from(movie.musicians),
            writers : Array.from(movie.writers),
            country : movie.country,
        };
        response.push(filme);
    }
    // JSON.stringify([...obj]);;
    return response;
}

function wmdtoJSON(obj){
    fs.writeFile('directors.json', JSON.stringify(Array.from(obj.directors), null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    })
    fs.writeFile('writers.json', JSON.stringify(Array.from(obj.writers), null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    })
    fs.writeFile('musicians.json', JSON.stringify(Array.from(obj.musicians), null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    })
}

function actorstoJSON(obj){
    var response = [];
    for (var actor of obj) {
        var a = {
            id : actor.id,
            name : actor.name,
            gender : actor.gender 
        };
        response.push(a);
    }
    return response;
}



var input = fs.readFileSync('q1_normalized.json').toString();
var obj = JSON.parse(input)
var wmd = get_dmw(obj)
var writers_musicians_directors = wmdtoJSON(wmd);

var grouped = groupBy("f",obj)
var filtred = filter_array(grouped);

var movies_json = moviestoJSON(filtred);
fs.writeFile('movies.json', JSON.stringify(movies_json, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
})

var input = fs.readFileSync('q3_normalized.json').toString();
var obj = JSON.parse(input)
var acs = actors(obj)

var actors = actorstoJSON(acs);
fs.writeFile('actors.json', JSON.stringify(actors, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
})



//q1
/*
id = f.split('/')[f.split('/').length - 1]
name = fname
diretores.push(dir.split('/')[dir.split('/').length - 1])
musicos.push(music.split('/')[music.split('/').length - 1])
writer.push(writer.split('/')[writer.split('/').length - 1])
country = country 

//q3
id = m.split('/')[m.split('/').length - 1]
name = mname
if(wife) 
    gender = 'M'
else 
    gender = 'F'
*/