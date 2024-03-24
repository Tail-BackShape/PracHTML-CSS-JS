document.addEventListener('DOMContentLoaded', function() {
    const partForm = document.getElementById('partForm');
    const partList = document.getElementById('partList');

    // ローカルストレージからデータを取得する
    function getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem('parts')) || [];
    }

    // データを保存する
    function saveDataToLocalStorage(parts) {
        localStorage.setItem('parts', JSON.stringify(parts));
    }

    // データを表示する
    function displayData() {
        const parts = getDataFromLocalStorage();
        partList.innerHTML = '';
        parts.forEach((part, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${part.name} - ${part.quantity}`;

            const editButton = document.createElement('button');
            editButton.textContent = '編集';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', function() {
                const newQuantity = prompt('新しい数量を入力してください:', part.quantity);
                if (newQuantity !== null && !isNaN(newQuantity) && newQuantity !== '') {
                    parts[index].quantity = parseInt(newQuantity);
                    saveDataToLocalStorage(parts);
                    displayData();
                } else {
                    alert('数量は数値で入力してください。');
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', function() {
                parts.splice(index, 1);
                saveDataToLocalStorage(parts);
                displayData();
            });

            listItem.appendChild(editButton);
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
            const parts = getDataFromLocalStorage();
            parts.push({ name: partName, quantity: parseInt(partQuantity) });
            saveDataToLocalStorage(parts);
            displayData();
            partForm.reset();
        } else {
            alert('部品名と数量を入力してください');
        }
    });

    // 初期表示時にデータを表示する
    displayData();
});
