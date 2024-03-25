document.addEventListener('DOMContentLoaded', function() {
    const partForm = document.getElementById('partForm');
    const partList = document.getElementById('partList');
    const tagSearch = document.getElementById('tagSearch');
    const quantityFilter = document.getElementById('quantityFilter');
    const tagFilter = document.getElementById('tagFilter');
    const quantitySearchBtn = document.getElementById('quantitySearchBtn');
    const tagSearchBtn = document.getElementById('tagSearchBtn');

    function displayData(parts) {
        partList.innerHTML = '';
        parts.forEach((part, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${part.name}</td>
                <td>${part.quantity}</td>
                <td>${part.tags.join(', ')}</td>
                <td>
                    <button class="edit-btn">編集</button>
                    <button class="delete-btn">削除</button>
                </td>
            `;
            const editButton = row.querySelector('.edit-btn');
            const deleteButton = row.querySelector('.delete-btn');
            editButton.addEventListener('click', function() {
                const editQuantityInput = document.getElementById('editQuantity');
                const editTagsInput = document.getElementById('editTags');
                const saveEditBtn = document.getElementById('saveEditBtn');
                const cancelEditBtn = document.getElementById('cancelEditBtn');

                editQuantityInput.value = part.quantity;
                editTagsInput.value = part.tags.join(', ');

                document.getElementById('popupContainer').style.display = 'block';

                saveEditBtn.onclick = function() {
                    const newQuantity = parseInt(editQuantityInput.value);
                    const newTags = editTagsInput.value.split(',').map(tag => tag.trim());

                    if (!isNaN(newQuantity) && newQuantity >= 0) {
                        part.quantity = newQuantity;
                        part.tags = newTags;
                        saveDataToFile(parts);
                        displayData(parts);
                        document.getElementById('popupContainer').style.display = 'none';
                    } else {
                        alert('数量は正の整数で入力してください。');
                    }
                };

                cancelEditBtn.onclick = function() {
                    document.getElementById('popupContainer').style.display = 'none';
                };
            });

            deleteButton.addEventListener('click', function() {
                parts.splice(index, 1);
                saveDataToFile(parts);
                displayData(parts);
            });

            partList.appendChild(row);
        });
    }

    function getDataFromFile() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error('データを読み込めませんでした:', error));
    }

    function filterByQuantity() {
        const minQuantity = parseInt(document.getElementById('minQuantity').value);
        const maxQuantity = parseInt(document.getElementById('maxQuantity').value);
        const parts = getDataFromLocalStorage();
        const filteredParts = parts.filter(part => {
            if (isNaN(minQuantity) && isNaN(maxQuantity)) {
                return true;
            }
            if (isNaN(minQuantity)) {
                return part.quantity <= maxQuantity;
            }
            if (isNaN(maxQuantity)) {
                return part.quantity >= minQuantity;
            }
            return part.quantity >= minQuantity && part.quantity <= maxQuantity;
        });
        displayData(filteredParts);
    }

    function saveDataToFile(data) {
        const jsonData = JSON.stringify(data);
        fetch('save.php', {
            method: 'POST',
            body: jsonData
        })
        .then(() => console.log('データを保存しました。'))
        .catch(error => console.error('データの保存中にエラーが発生しました:', error));
    }

    function getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem('parts')) || [];
    }

    partForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const partName = document.getElementById('partName').value;
        const partQuantity = document.getElementById('partQuantity').value;
        const partTags = document.getElementById('partTags').value.split(',').map(tag => tag.trim());

        if (partName && partQuantity) {
            const parts = getDataFromLocalStorage();
            parts.push({ name: partName, quantity: parseInt(partQuantity), tags: partTags });
            saveDataToFile(parts);
            displayData(parts);
            partForm.reset();
        } else {
            alert('部品名と数量は必須です。');
        }
    });

    quantitySearchBtn.addEventListener('click', function() {
        quantityFilter.style.display = 'block';
        tagFilter.style.display = 'none';
    });

    tagSearchBtn.addEventListener('click', function() {
        tagFilter.style.display = 'block';
        quantityFilter.style.display = 'none';
    });

    tagSearch.addEventListener('input', function() {
        const searchValue = tagSearch.value.toLowerCase();
        const parts = getDataFromLocalStorage();
        const filteredParts = parts.filter(part => {
            return part.tags.some(tag => tag.toLowerCase().includes(searchValue));
        });
        displayData(filteredParts);
    });

    document.getElementById('minQuantity').addEventListener('input', filterByQuantity);
    document.getElementById('maxQuantity').addEventListener('input', filterByQuantity);

    document.getElementById('popupContainer').addEventListener('click', function(event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });

    getDataFromFile(); // 初回読み込み時にデータを表示
});
