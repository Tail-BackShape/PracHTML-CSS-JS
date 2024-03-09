function calcInductance(freq, capa) {
    var LUnit = getLunit();
    var fUnit = getfunit();
    var CUnit = getCunit();
    var ind;
    ind = 1 / (4 * Math.PI * Math.PI * (freq * fUnit) * (freq * fUnit) * capa * CUnit);
    ind = ind / LUnit;
    alert(ind);
    document.getElementById("inductance").value = ind;
    console.log(ind);
}

function getLunit() {
    // ラジオボタンの要素を取得
    var Lunit = document.getElementsByName("L");

    // 選択されているラジオボタンを検索
    var selectedOption;
    for (var i = 0; i < Lunit.length; i++) {
    if (Lunit[i].checked) {
        selectedOption = Lunit[i].value;
        break;
        }
    }

    switch (selectedOption) {
        case "μH":
            selectedOption = 1e-6;
            break;
        case "mH":
            selectedOption = 1e-3;
            break;
        case "H":
            selectedOption = 1;
            break;
    }

    return selectedOption;
}

function getfunit() {
    // ラジオボタンの要素を取得
    var funit = document.getElementsByName("f");

    // 選択されているラジオボタンを検索
    var selectedOption;
    for (var i = 0; i < funit.length; i++) {
    if (funit[i].checked) {
        selectedOption = funit[i].value;
        break;
        }
    }

    switch (selectedOption) {
        case "Hz":
            selectedOption = 1;
            break;
        case "kHz":
            selectedOption = 1e3;
            break;
        case "MHz":
            selectedOption = 1e6;
            break;
    }

    return selectedOption;
}


function getCunit() {
    // ラジオボタンの要素を取得
    var Cunit = document.getElementsByName("C");

    // 選択されているラジオボタンを検索
    var selectedOption;
    for (var i = 0; i < Cunit.length; i++) {
    if (Cunit[i].checked) {
        selectedOption = Cunit[i].value;
        break;
        }
    }

    switch (selectedOption) {
        case "pF":
            selectedOption = 1e-12;
            break;
        case "nF":
            selectedOption = 1e-9;
            break;
        case "μF":
            selectedOption = 1e-6;
            break;
    }

    return selectedOption;
}
