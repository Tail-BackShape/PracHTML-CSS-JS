function showRadioState() {
    // ラジオボタンの要素を取得
    var radioButtons = document.getElementsByName("radioGroup");

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
