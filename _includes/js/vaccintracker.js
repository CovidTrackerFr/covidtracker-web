const OBJECTIF_FIN_JANVIER = 1000000 // 1_000_000
const OBJECTIF_FIN_AOUT = 52000000 // 1_000_000
var data;
var nb_vaccines = [];

var vaccines_2doses = {};

let differentielVaccinesParJour;
var dejaVaccinesNb;
var dejaVaccines = 0;
var restantaVaccinerImmunite;
var restantaVaccinerAutres = 100
var objectifQuotidien;
var dateProjeteeObjectif;

var dosesRecues = 560000;

var data_stock;
var dates_stock=[];
var stock=[];
var cumul_stock=0;
var cumul_stock_array=[];

var data_news = [];
var titre_news = [];
var contenu_news = [];
var updated = false;
const table = document.getElementById("tableauVaccin");

fetch('https://raw.githubusercontent.com/rozierguillaume/vaccintracker/main/data/output/vacsi-fra-2doses.json', {cache: 'no-cache'})
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        this.vaccines_2doses = json;
        maj2Doses();
    })
    .catch(function (error) {
            this.dataError = true;
            console.log(error.message)
        }
    )

fetch('https://raw.githubusercontent.com/rozierguillaume/vaccintracker/main/data_stock.csv', {cache: 'no-cache'})
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.text();
    })
    .then(csv => {
        this.data_stock = csv;

        array_data_stock = CSVToArray(csv, ",");
        array_data_stock.slice(1, array_data_stock.length-1).map((value, idx) => {
            this.dates_stock.push(value[0])
            this.stock.push(parseInt(value[1]));
            this.cumul_stock += parseInt(value[1]);
            this.cumul_stock_array.push(cumul_stock);
        })

        fetchOtherData();

    })
    .catch(function (error) {
            this.dataError = true;
            console.log(error.message)
        }
    )


function fetchOtherData(){
    // Get data from Guillaume csv
    fetch('https://raw.githubusercontent.com/rozierguillaume/vaccintracker/main/data.csv', {cache: 'no-cache'})
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.text();
        })
        .then(csv => {
            dont_do_that;
            this.data = csv;
            array_data = CSVToArray(csv, ",");
            array_data.slice(1, array_data.length-1).map((value, idx) => {
                nb_vaccines.push({
                    date: value[0],
                    heure: value[2],
                    n_dose1: value[1],
                    source: value[3]
                });
            });

            if(updated) { // si on a les données des 2 sources (csv covidtracker + gouv)
                nb_vaccines = nb_vaccines.filter((v,i,a)=>a.findIndex(t=>(t.date == v.date))===i); // suppression doublons
                nb_vaccines = nb_vaccines.sortBy('date'); // tri par date
                dejaVaccinesNb = nb_vaccines[nb_vaccines.length-1].n_dose1
                dejaVaccines = dejaVaccinesNb*100/67000000;
                restantaVaccinerImmunite = 60 - dejaVaccines
                this.dateProjeteeObjectif = calculerDateProjeteeObjectif();
                this.objectifQuotidien = calculerObjectif();
                majValeurs();
                buildLineChart();
            } else {
                updated = true;
            }
        })
        .catch(function (error) {
                this.dataError = true;
                console.log(error.message)
            }
        )

    // Get data from health ministry csv
    fetch('https://raw.githubusercontent.com/rozierguillaume/vaccintracker/main/data/output/vacsi-fra.json', {cache: 'no-cache'}) //https://www.data.gouv.fr/fr/datasets/r/b234a041-b5ea-4954-889b-67e64a25ce0d
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            this.data = json;
            //console.log(json)
            data["dates"].map((value, idx) =>{
                nb_vaccines.push({
                    date: value,
                    heure: "",
                    total: 0,
                    n_dose1: data["n_dose1_cumsum"][idx],
                    source: "Ministère de la santé"
                });
            })

            if(true) { // si on a les données des 2 sources (csv covidtracker + gouv)
                nb_vaccines = nb_vaccines.filter((v,i,a)=>a.findIndex(t=>(t.date == v.date))===i); // suppression doublons
                nb_vaccines = nb_vaccines.sortBy('date'); // tri par date
                dejaVaccinesNb = nb_vaccines[nb_vaccines.length-1].n_dose1
                dejaVaccines = dejaVaccinesNb*100/67000000;
                restantaVaccinerImmunite = 60 - dejaVaccines
                this.dateProjeteeObjectif = calculerDateProjeteeObjectif();
                this.objectifQuotidien = calculerObjectif();
                majValeurs();
                buildLineChart();
            } else {
                updated = true;
            }
        })
        .catch(function (error) {
                this.dataError = true;
                console.log(error.message);
            }
        )

}
var lineChart;

function calculerObjectif(){

    let one_day = (1000 * 60 * 60 * 24)
    let jours_restant = (Date.parse("2021-08-31") - Date.parse(nb_vaccines[nb_vaccines.length-1].date) )/ one_day
    let objectif = OBJECTIF_FIN_AOUT;
    let resteAVacciner = objectif - nb_vaccines[nb_vaccines.length-1].n_dose1
    //console.log(jours_restant)
    if ((resteAVacciner>=0) && (jours_restant>=0)){
        return Math.round(resteAVacciner*2/jours_restant)
    } else {
        return -1
    }
}

function maj2Doses(){
    //log(vaccines_2doses)
    let N = vaccines_2doses.n_dose2.length
    let vaccines_2doses_24h = vaccines_2doses.n_dose2[N-1] - vaccines_2doses.n_dose2[N-2]

    document.getElementById("nb_vaccines_2_doses").innerHTML = numberWithSpaces(vaccines_2doses.n_dose2[N-1]);
    document.getElementById("nb_vaccines_24h_2_doses").innerHTML = numberWithSpaces(vaccines_2doses_24h);

    date=vaccines_2doses.jour[N-1]
    document.getElementById("date_maj_2").innerHTML = date.slice(8) + "/" + date.slice(5, 7);
}


function calculerDateProjeteeObjectif () {
    const objectif = OBJECTIF_FIN_AOUT
    const indexDerniereMaj = nb_vaccines.length - 1;
    const indexDebutFenetre = Math.max(0, indexDerniereMaj - 7)
    const derniereMaj = Date.parse(nb_vaccines[indexDerniereMaj].date)
    const resteAVacciner = objectif*2 - Number(nb_vaccines[indexDerniereMaj].n_dose1)
    const differentielVaccinesFenetre = Number(nb_vaccines[indexDerniereMaj].n_dose1) - Number(nb_vaccines[indexDebutFenetre].n_dose1)
    differentielVaccinesParJour = differentielVaccinesFenetre / (indexDerniereMaj - indexDebutFenetre)
    const oneDay = (1000 * 60 * 60 * 24)
    const nbJoursAvantObjectif = Math.round(resteAVacciner / differentielVaccinesParJour)
    return new Date(derniereMaj + (oneDay * nbJoursAvantObjectif))
}

function buildLineChart(){

    var ctx = document.getElementById('lineVacChart').getContext('2d');
    let data_values = nb_vaccines.map(val => ({x: val.date, y:parseInt(val.n_dose1)}));
    let data_object_stock = cumul_stock_array.map((value, idx)=> ({x: dates_stock[idx], y: parseInt(value)}))
    let data_values_2doses = vaccines_2doses.n_dose2.map((value, idx)=> ({x: vaccines_2doses.jour[idx], y: parseInt(value)}))

    this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            //labels: nb_vaccines.map(val => val.date),
            datasets: [
                {
                    label: 'Cumul vaccinés (2 doses) ',
                    data: data_values_2doses,
                    borderWidth: 3,
                    backgroundColor: '#1796e6',
                    borderColor: '#127aba',
                    pointRadius: 2,
                    steppedLine: true,
                },
                {
                    label: 'Cumul vaccinés (1 ou 2 doses) ',
                    data: data_values,
                    borderWidth: 3,
                    backgroundColor: '#a1cbe6',
                    borderColor: '#3691c9',
                    pointRadius: 2,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Doses réceptionnées (cumul) ',
                    data: data_object_stock,
                    borderWidth: 3,
                    borderColor: 'grey',
                    pointRadius: 2,
                    steppedLine: true,
                },

            ]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let value = data['datasets'][tooltipItem.datasetIndex]['data'][tooltipItem['index']].y.toString().split(/(?=(?:...)*$)/).join(' ');
                        return data['datasets'][tooltipItem.datasetIndex]['label'] + ': ' + value.toString();
                    }
                }
            },
            maintainAspectRatio: false,
            plugins: {
                deferred: {
                    xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
                    yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
                    delay: 200      // delay of 500 ms after the canvas is considered inside the viewport
                }
            },
            scales: {
                yAxes: [{
                    stacked: false,
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    gridLines: {
                        display: false
                    }
                }]
            },
            annotation: {
                events: ["click"],
                annotations: [
                ]
            }
        }
    });
}

function rollingMean(data){
    var moveMean = [];
    let N = data.length;

    for (var i = 3; i < N-3; i++)
    {
        var mean = (parseInt(data[i-3]) + data[i-2] + data[i-1] + data[i] + data[i+1] + data[i+2] + data[i+3])/7;
        moveMean.push(mean);
    }
    return moveMean;
}

function buildBarChart(data){
    var ctx = document.getElementById('lineVacChart').getContext('2d');
    let labels = nb_vaccines.map(val => val.date)
    let data_values = data.map((value, idx) => ({x: labels[idx], y: value}))
    let rollingMeanValues = rollingMean(data).map((value, idx)=> ({x: labels[idx+3], y: Math.round(value)}))

    this.lineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre quotidien de vaccinés ',
                data: data_values,
                borderWidth: 3,
                backgroundColor: 'rgba(0, 168, 235, 0.5)',
                borderColor: 'rgba(0, 168, 235, 0)',
                cubicInterpolationMode: 'monotone'
            },
                {
                    label: 'Moyenne quotidienne ',
                    data: rollingMeanValues,
                    type: 'line',
                    borderColor: 'rgba(0, 168, 235, 1)',
                    backgroundColor: 'rgba(0, 168, 235, 0)',
                }
            ]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let value = data['datasets'][tooltipItem.datasetIndex]['data'][tooltipItem['index']].y.toString().split(/(?=(?:...)*$)/).join(' ');
                        return data['datasets'][tooltipItem.datasetIndex]['label'] + ': ' + value;
                    }
                }
            },
            maintainAspectRatio: false,
            legend: {
                display: true
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        min: 0
                    },

                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        maxTicksLimit: 6,
                        callback: function(value, index, values) {
                            return value.slice(8) + "/" + value.slice(5, 7);
                        }
                    }

                }]
            },
            annotation: {
                events: ["click"],
                annotations: [

                ]
            }
        }
    });
}
function typeDonneesChart(){
    type_donnees = document.getElementById("type").value
    this.lineChart.destroy()
    document.getElementById("objectif").checked=false;
    if (type_donnees=="quotidien"){

        nb_vaccines_quot = [nb_vaccines[0].total]
        for(i=0; i<nb_vaccines.length-1; i++){
            nb_vaccines_quot.push(nb_vaccines[i+1].n_dose1-nb_vaccines[i].n_dose1)
        }
        buildBarChart(nb_vaccines_quot);
    } else {
        buildLineChart();
    }
}
function ajouterObjectifAnnotation(){
    type_donnees = document.getElementById("type").value
    if (type_donnees=="quotidien"){
        obj = objectifQuotidien;
    }
    else {
        obj = OBJECTIF_FIN_AOUT;
    }
    if (this.lineChart.options.annotation.annotations.length==0){
        this.lineChart.options.annotation.annotations.push(
            {
                drawTime: "afterDatasetsDraw",
                id: "hline",
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: obj,
                borderColor: "green",
                borderWidth: 3,
                label: {
                    backgroundColor: "green",
                    content: "Objectif",
                    enabled: true
                },
                onClick: function(e) {
                    console.log("Annotation", e.type, this);
                }
            });
    } else {
        this.lineChart.options.annotation.annotations = [];
    }
    this.lineChart.update()
}


function majValeurs(){

    if (nb_vaccines[nb_vaccines.length-1].source == "Estimation"){
        document.getElementById("estimation_str").innerHTML = "⚠️ Données non consolidées";
    }

    document.getElementById("nb_vaccines").innerHTML = numberWithSpaces(dejaVaccinesNb);
    document.getElementById("nb_vaccines_24h").innerHTML = numberWithSpaces(dejaVaccinesNb - nb_vaccines[nb_vaccines.length-2].n_dose1);
    document.getElementById("nb_doses").innerHTML = numberWithSpaces(cumul_stock);
    document.getElementById("proportionVaccinesMax").innerHTML = (Math.round(dejaVaccines*10000000)/10000000).toFixed(2);
    //document.getElementById("proportionVaccinesMin").innerHTML = (Math.round(dejaVaccines/2*10000000)/10000000).toFixed(2);
    //document.getElementById("proportion_doses").innerHTML = (dejaVaccinesNb/cumul_stock*100).toFixed(1);

    document.getElementById("proportionAVaccinerImmu").innerHTML = (Math.round(restantaVaccinerImmunite*10000000)/10000000).toFixed(2);
    document.getElementById("objectif_quotidien").innerHTML = numberWithSpaces(objectifQuotidien);
    //document.getElementById("date_projetee_objectif").innerHTML = formaterDate(dateProjeteeObjectif);
    date = nb_vaccines[nb_vaccines.length-1].date
    date = date.slice(8) + "/" + date.slice(5, 7)
    heure = nb_vaccines[nb_vaccines.length-1].heure

    date_stock = dates_stock[dates_stock.length-1]
    date_stock = date_stock.slice(8) + "/" + date_stock.slice(5, 7)

    document.getElementById("date_maj_1").innerHTML = date;
    document.getElementById("date_maj_2").innerHTML = date + " à " + heure;
    document.getElementById("date_maj_3").innerHTML = date;
    //document.getElementById("date_maj_4").innerHTML = date_stock;

}

Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}