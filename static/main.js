var dom = {
    alphabetBG: ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ь", "ю", "я"],
    alphabetEN: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    colorBG: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    colorEN: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    session: false,
};

(async function () {
    //            get data from json
    await ajax_get_promise('/api/get_data', function (data) {
        dom.data = data;
    });


    dom.htmlFirstRow = '';
    dom.htmlRow = '';

    for (let r = 0; r < dom.data.length; r += 1) {
        var row = `<td>${dom.data[r].date}</td>`;

        for (let k = 0; k < dom.data[r].colorBG.length; k++) {
            row += `<td><div class="data-box" style="background-color:${dom.data[r].colorBG[k]}"></div></td>`;
        }

        dom.htmlRow += `<tr>${row}</tr>`;
    }

    for (var i = 0; i < dom.alphabetBG.length; i += 1) {
        dom.text = `<div id="box_${i}" class="box_bg">
                                <div id="text_bg_${i}" class="text">${dom.alphabetBG[i]}</div>
                                <input id="color_bg_${i}" class="color" type="color" value="${dom.colorBG[i]}" data-id="${i}" onchange="changeColor(this, 'bg');">
                            </div>`;

        document.querySelector(`#bg_top`).insertAdjacentHTML('beforeend', dom.text);

        dom.htmlFirstRow += `<th>${dom.alphabetBG[i]}</th>`;

        dom.text = "text_bg_" + i + "";
        document.getElementById(dom.text).style.color = dom.colorBG[i];
    }

    dom.htmlTable = `<table id="table_bg" class="table"><tbody>
                            <tr><th>date</th>${dom.htmlFirstRow}</tr>
                            ${dom.htmlRow}
                        </tbody></table>`;

    document.querySelector(`#data_bg`).insertAdjacentHTML('beforeend', dom.htmlTable);



    dom.htmlFirstRow = '';
    dom.htmlRow = '';

    for (let r = 0; r < dom.data.length; r += 1) {
        var row = `<td>${dom.data[r].date}</td>`;

        for (let k = 0; k < dom.data[r].colorEN.length; k++) {
            row += `<td><div class="data-box" style="background-color:${dom.data[r].colorEN[k]}"></div></td>`;
        }

        dom.htmlRow += `<tr>${row}</tr>`;
    }

    for (var i = 0; i < dom.alphabetEN.length; i += 1) {
        dom.text = `<div id="box_${i}" class="box_en">
                                <div id="text_en_${i}" class="text">${dom.alphabetEN[i]}</div>
                                <input id="color_en_${i}" class="color" type="color" value="${dom.colorEN[i]}" data-id="${i}" onchange="changeColor(this, 'en');">
                            </div>`;

        document.querySelector(`#en_top`).insertAdjacentHTML('beforeend', dom.text);

        dom.htmlFirstRow += `<th>${dom.alphabetEN[i]}</th>`;

        dom.text = "text_en_" + i + "";
        document.getElementById(dom.text).style.color = dom.colorEN[i];
    }

    dom.htmlTable = `<table id="table_en" class="table"><tbody>
                            <tr><th>date</th>${dom.htmlFirstRow}</tr>
                            ${dom.htmlRow}
                        </tbody></table>`;

    document.querySelector(`#data_en`).insertAdjacentHTML('beforeend', dom.htmlTable);

})();