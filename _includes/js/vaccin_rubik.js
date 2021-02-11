function tableVaccin(tableElt, level, populationVaccinnee) {
    tableElt.innerHTML = "";
    let first = true;
    for(let i=0; i<10; i++){

        let row = tableElt.insertRow();

        for(let j=0; j<10; j++){
            let newrow = row.insertCell(j);

            let caseNb = i*10+j+1;
            if (
                (caseNb <= populationVaccinnee && level == 0)
                || (caseNb <= (populationVaccinnee - Math.floor(populationVaccinnee))*100) && level == 1) {
                newrow.classList.add("green");
            } else {
                if(first) {
                    if(level == 1) {
                        newrow.classList.add("blink_me");
                        newrow.classList.add(populationVaccinnee >= 60 ? "grey" : "red");
                        first = false;
                    } else {
                        const subtable = document.createElement("table");
                        subtable.id = "subtableVaccin";
                        newrow.appendChild(subtable);
                        first = false;
                        tableVaccin(subtable, level+1, populationVaccinnee);
                    }
                } else if((caseNb <= 60 && level == 0) || ((populationVaccinnee) < 60 && level == 1)) {
                    newrow.classList.add("red");
                } else {
                    newrow.classList.add("grey");
                }
            }
        }
    }
}