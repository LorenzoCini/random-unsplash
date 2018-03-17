
var dir = require('path').dirname(require.main.filename); //cerco la directory del progetto

var axios = require('axios'); //passo ad una variabile l'oggetto axios
var wget = require('node-wget'); //passo ad una variabile l'oggetto node-wget

var count = 5; //numero foto da scaricare
var apiK = 'ba4b65abe0c262c720a34344deb8831df3cd0ee425f86cf6a367c68f15779345'; //apikey
var url = 'https://api.unsplash.com/photos/random/'; //url unsplash per ottenere le foto random

//faccio una richiesta XMLhttp tramite il modulo axios
axios.get(url, { params: { client_id: apiK, count: count } }).then(function (response) {
    for (var i = 0; i < count; i++) { //richiedo una immagine per volta in base alla variabile count
        wget( // a wget passo i parametri url (la foto da scaricare) e la cartella di destinazione
            {
                url: response.data[i].urls.full,
                dest: dir+'/img' + (i).toString() + '.jpg' // nella dir del progetto importo le foto
            },
            function (error) {
                if (error)
                    console.log(error); // gestisco errori (stampo in console)
                else
                    console.log('Exported image ' + i); // stampo il nome della foto scaricata
            }
        );
    }
}).catch(function (error) {
    if (error) console.log(error); // gestisco errori (stampo in console)
});
