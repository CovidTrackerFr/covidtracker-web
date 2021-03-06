function tableVaccin(tableElt, level, populationVaccinnee, populationVaccinnee2Doses) {

    tableElt.innerHTML = "";
    let first = true;
    for(let i=0; i<10; i++){

        let row = tableElt.insertRow();

        for(let j=0; j<10; j++){
            let newrow = row.insertCell(j)

            let subtable = document.createElement("table");
            subtable.classList = "subtableVaccin";
            newrow.appendChild(subtable);

            for (let k=0; k<10; k++) {
                let subrow = subtable.insertRow();
                for(let l=0 ; l < 10 ; l++) {
                    let caseNb = i*10+j+0.1*k+0.01*l+0.01
                    let newsubrow = subrow.insertCell(l);
                    if(caseNb <= populationVaccinnee2Doses){
                        newsubrow.classList.add('darkgreen');
                    } else if(caseNb <= populationVaccinnee2Doses+0.01) {
                        newsubrow.classList.add('animation-seconde-dose');
                    } else if(caseNb <= populationVaccinnee){
                        newsubrow.classList.add('green');
                    } else if(caseNb <= populationVaccinnee+0.01) {
                        newsubrow.classList.add('animation-premiere-dose');
                    } else if(caseNb <= 60) {
                        newsubrow.classList.add("red");
                    } else {
                        newsubrow.classList.add("grey");
                    }
                }
            }
        }
    }
}