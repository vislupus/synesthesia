function changeColor(id, tab) {
    dom.color = id.value;
    dom.color_id = id.getAttribute('data-id');

    if (tab == 'bg') {
        dom.colorBG[dom.color_id] = dom.color;
        document.getElementById(`text_bg_${dom.color_id}`).style.color = dom.color;
    } else {
        dom.colorEN[dom.color_id] = dom.color;
        document.getElementById(`text_en_${dom.color_id}`).style.color = dom.color;
    }

    if (dom.id) {
        text(dom.id, tab);
    }


    if (!dom.session) {
        addNewRow();
    } else {
        let data = JSON.stringify({
            id: dom.color_id,
            lan: tab,
            color: dom.color
        });

        ajax_post('/api/edit_data', data, function (data_json) {
            console.log(data_json)
            dom.data = data_json;
        });
    }

    dom.session = true;
}

function addNewRow() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();

    let data = JSON.stringify({
        colorBG: dom.colorBG,
        colorEN: dom.colorEN,
        date: `${day}/${month}/${year}`
    });

    ajax_post('/api/add_data', data, function (data_json) {
        dom.data = data_json;
    });

    createNewRow();
}

function createNewRow() {
    let htmlRow = '';
    let row = '';
    let dataLastRow = dom.data[dom.data.length - 1];

    for (let k = 0; k < dataLastRow.colorEN.length; k++) {
        row += `<td><div class="data-box" style="background-color:${dataLastRow.colorEN[k]}"></div></td>`;
    }

    document.querySelector(`#table_en`).insertAdjacentHTML('beforeend', `<tr><td>${dataLastRow.date}</td>${row}</tr>`);

    row = '';
    for (let k = 0; k < dataLastRow.colorBG.length; k++) {
        row += `<td><div class="data-box" style="background-color:${dataLastRow.colorBG[k]}"></div></td>`;
    }

    document.querySelector(`#table_bg`).insertAdjacentHTML('beforeend', `<tr><td>${dataLastRow.date}</td>${row}</tr>`);
}

function dataShow() {
    let dataLastRow = dom.data[dom.data.length - 1];
    let tableEN = document.getElementById('data_en').querySelector('.table');
    let divEN = tableEN.rows[tableEN.rows.length - 1].querySelectorAll('.data-box');

    let tableBG = document.getElementById('data_bg').querySelector('.table');
    let divBG = tableBG.rows[tableBG.rows.length - 1].querySelectorAll('.data-box');

    for (let i = 0; i < divEN.length; i += 1) {
        //                divs[i].style.backgroundColor = dom.colorEN[i];
        divEN[i].style.backgroundColor = dataLastRow.colorEN[i];
    }

    for (let i = 0; i < divBG.length; i += 1) {
        divBG[i].style.backgroundColor = dataLastRow.colorBG[i];
    }
}


function text(id, tab) {
    dom.id = id;
    let str = id.value;
    let colorLetter = "";

    let en_letter = false;
    let bg_letter = false;

    if (tab == "bg") {
        for (var i = 0; i < str.length; i += 1) {
            bg_letter = false;

            for (var j = 0; j < dom.alphabetBG.length; j += 1) {
                if (dom.alphabetBG[j] == str[i] || dom.alphabetBG[j].toUpperCase() == str[i]) {
                    colorLetter += `<span style="color:${dom.colorBG[j]}">${str[i]}</span>`;

                    bg_letter = true;
                }
            }

            if (!bg_letter) {
                colorLetter += str[i];
            }
        }

        document.getElementById("show_bg").innerHTML = colorLetter;
    } else {
        for (var i = 0; i < str.length; i += 1) {
            en_letter = false;

            for (var j = 0; j < dom.alphabetEN.length; j += 1) {
                if (dom.alphabetEN[j] == str[i] || dom.alphabetEN[j].toUpperCase() == str[i]) {
                    colorLetter += `<span style="color:${dom.colorEN[j]}">${str[i]}</span>`;

                    en_letter = true;
                }
            }

            if (!en_letter) {
                colorLetter += str[i];
            }
        }

        document.getElementById("show_en").innerHTML = colorLetter;
    }
}

function tab(id, tab) {
    hideStuff();

    id.classList.add("active");
    document.getElementById(tab).style.display = "flex";

    dom.id = '';

    if (tab == 'data_container') {
        dataShow();
    }
}

function hideStuff() {
    let all_pages = document.querySelectorAll('.pages');

    for (let i = 0; i < all_pages.length; i += 1) {
        all_pages[i].style.display = "none";
    }

    let all_tabs = document.querySelectorAll('.tabs');

    for (let i = 0; i < all_tabs.length; i += 1) {
        all_tabs[i].classList.remove("active");
    }
}
