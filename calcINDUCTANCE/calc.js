function calcInductance(freq, capa) {
    na = 1 / ((2 * Math.PI) * Math.sqrt(parseFloat(freq) * parseFloat(capa)));
    alert(na);
    console.log(na);
}

function altHunit() {
    // ラジオボタンの要素を取得
    var radioButtons = document.getElementsByName("L");

    // 選択されているラジオボタンを検索
    var selectedOption;
    for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
        selectedOption = radioButtons[i].value;
        break;
        }
    }

    // 選択されているラジオボタンがあればアラートで表示
    if (selectedOption) {
        alert("選択されているオプション: " + selectedOption);
    } else {
        alert("ラジオボタンが選択されていません。");
    }
}

function altfunit() {
    // ラジオボタンの要素を取得
    var radioButtons = document.getElementsByName("f");

    // 選択されているラジオボタンを検索
    var selectedOption;
    for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
        selectedOption = radioButtons[i].value;
        break;
        }
    }

    // 選択されているラジオボタンがあればアラートで表示
    if (selectedOption) {
        alert("選択されているオプション: " + selectedOption);
    } else {
        alert("ラジオボタンが選択されていません。");
    }
}

function altCunit() {
    // ラジオボタンの要素を取得
    var radioButtons = document.getElementsByName("C");

    // 選択されているラジオボタンを検索
    var selectedOption;
    for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
        selectedOption = radioButtons[i].value;
        break;
        }
    }

    // 選択されているラジオボタンがあればアラートで表示
    if (selectedOption) {
        alert("選択されているオプション: " + selectedOption);
    } else {
        alert("ラジオボタンが選択されていません。");
    }
}
