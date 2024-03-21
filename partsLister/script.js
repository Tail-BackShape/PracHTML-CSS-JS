window.onload = function() {
    // CSVファイルのURL
    var csvUrl = 'parts.csv';

    // CSVファイルを読み込む関数
    function loadCSV(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    console.error('Failed to load CSV');
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    // CSVをテーブルに表示する関数
    function displayCSV(csvData) {
        var lines = csvData.split('\n');
        var table = document.getElementById('csvTable');

        for (var i = 0; i < lines.length; i++) {
            var row = table.insertRow();
            var cells = lines[i].split(',');

            for (var j = 0; j < cells.length; j++) {
                var cell = row.insertCell();
                cell.textContent = cells[j];
            }
        }
    }

    // CSVを読み込んで表示
    loadCSV(csvUrl, displayCSV);
};
