document.addEventListener('DOMContentLoaded', function() {
    const partForm = document.getElementById('partForm');
    const partList = document.getElementById('partList');
    const tagSearch = document.getElementById('tagSearch');
    const quantityFilter = document.getElementById('quantityFilter');
    const tagFilter = document.getElementById('tagFilter');
    const quantitySearchBtn = document.getElementById('quantitySearchBtn');
    const tagSearchBtn = document.getElementById('tagSearchBtn');

    function getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem('parts')) || [];
    }

    function saveDataToLocalStorage(parts) {
        localStorage.setItem('parts', JSON.stringify(parts));
    }

    function displayData() {
        const parts = getDataFromLocalStorage();
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
                        saveDataToLocalStorage(parts);
                        displayData();
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
                saveDataToLocalStorage(parts);
                displayData();
            });

            partList.appendChild(row);
        });
    }

    partForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const partName = document.getElementById('partName').value;
        const partQuantity = document.getElementById('partQuantity').value;
        const partTags = document.getElementById('partTags').value.split(',').map(tag => tag.trim());

        if (partName && partQuantity) {
            const parts = getDataFromLocalStorage();
            parts.push({ name: partName, quantity: parseInt(partQuantity), tags: partTags });
            saveDataToLocalStorage(parts);
            displayData();
            partForm.reset();
        } else {
            alert('部品名と数量を入力してください');
        }
    });

    quantitySearchBtn.addEventListener('click', function() {
        tagFilter.style.display = 'none';
        quantityFilter.style.display = 'block';
    });

    tagSearchBtn.addEventListener('click', function() {
        quantityFilter.style.display = 'none';
        tagFilter.style.display = 'block';
    });

    tagSearch.addEventListener('input', function() {
        const searchValue = tagSearch.value.trim();
        const parts = getDataFromLocalStorage();
        const filteredParts = parts.filter(part => part.tags.some(tag => tag.includes(searchValue)));
        displayFilteredData(filteredParts);
    });

    document.getElementById('minQuantity').addEventListener('input', filterByQuantity);
    document.getElementById('maxQuantity').addEventListener('input', filterByQuantity);

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
        displayFilteredData(filteredParts);
    }

    function displayFilteredData(filteredParts) {
        partList.innerHTML = '';
        filteredParts.forEach(part => {
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
                        saveDataToLocalStorage(parts);
                        displayData();
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
                const index = parts.findIndex(p => p === part);
                parts.splice(index, 1);
                saveDataToLocalStorage(parts);
                displayFilteredData(filteredParts);
            });

            partList.appendChild(row);
        });
    }

    displayData();
});

