document.addEventListener('DOMContentLoaded', function() {
    const partForm = document.getElementById('partForm');
    const partList = document.getElementById('partList');

    // ローカルストレージからデータを取得する
    function getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem('parts')) || [];
    }

    // データを保存する
    function saveDataToLocalStorage(name, quantity) {
        const parts = getDataFromLocalStorage();
        parts.push({ name, quantity });
        localStorage.setItem('parts', JSON.stringify(parts));
    }

    // ローカルストレージからデータを削除する
    function deleteDataFromLocalStorage(part) {
        const parts = getDataFromLocalStorage();
        const updatedParts = parts.filter(p => p.name !== part.name || p.quantity !== part.quantity);
        localStorage.setItem('parts', JSON.stringify(updatedParts));
    }

    // データを表示する
    function displayData() {
        const parts = getDataFromLocalStorage();
        partList.innerHTML = '';
        parts.forEach(part => {
            const listItem = document.createElement('li');
            listItem.textContent = `${part.name} - ${part.quantity}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', function() {
                deleteDataFromLocalStorage(part);
                displayData();
            });
            listItem.appendChild(deleteButton);
            partList.appendChild(listItem);
        });
    }

    // 部品の追加フォームの送信イベントリスナー
    partForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const partName = document.getElementById('partName').value;
        const partQuantity = document.getElementById('partQuantity').value;

        if (partName && partQuantity) {
            saveDataToLocalStorage(partName, partQuantity);
            displayData();
            partForm.reset();
        } else {
            alert('部品名と数量を入力してください');
        }
    });

    // 初期表示時にデータを表示する
    displayData();
});
