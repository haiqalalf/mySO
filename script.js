document.addEventListener('DOMContentLoaded', function () {
    const addItemBtn = document.getElementById('addItemBtn');
    const stockTable = document.getElementById('stockTable').querySelector('tbody');
    const downloadBtn = document.getElementById('downloadBtn');
    const setBranchBtn = document.getElementById('setBranchBtn');
    const setUserBtn = document.getElementById('setUserBtn');
    const branchInput = document.getElementById('branchInput');
    const userInput = document.getElementById('userInput');

    let branchName = '';
    let userName = '';

    // Set Nama Cabang
    setBranchBtn.addEventListener('click', () => {
        branchName = branchInput.value;
        alert('Nama Cabang diset: ' + branchName);
    });

    // Set Nama User
    setUserBtn.addEventListener('click', () => {
        userName = userInput.value;
        alert('Nama User diset: ' + userName);
    });

    // Tambah Item
    addItemBtn.addEventListener('click', () => {
        const row = stockTable.insertRow();
        const namaItemCell = row.insertCell(0);
        const stockCandiceCell = row.insertCell(1);
        const stockAsliCell = row.insertCell(2);
        const fotoCell = row.insertCell(3);
        const aksiCell = row.insertCell(4);

        namaItemCell.innerHTML = '<input type="text" placeholder="Nama Item">';
        stockCandiceCell.innerHTML = '<input type="number" placeholder="0">';
        stockAsliCell.innerHTML = '<input type="number" placeholder="0">';
        fotoCell.innerHTML = '<input type="file" accept="image/*" capture="camera">';
        aksiCell.innerHTML = '<button onclick="hapusBaris(this)">🗑️ Hapus</button>';
    });

    // Download PDF
    downloadBtn.addEventListener('click', () => {
        const element = document.createElement('div');
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        let html = `
            <h2>mySO - Stock Opname</h2>
            <p><strong>Tanggal:</strong> ${day} ${month} ${year}</p>
            <p><strong>User:</strong> ${userName}</p>
            <p><strong>Cabang:</strong> ${branchName}</p>
            <table border="1" cellspacing="0" cellpadding="5">
                <tr>
                    <th>Nama Item</th>
                    <th>Stock Candice</th>
                    <th>Stock Asli</th>
                    <th>Foto</th>
                </tr>
        `;

        const rows = stockTable.querySelectorAll('tr');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const namaItem = inputs[0]?.value || '';
            const stockCandice = inputs[1]?.value || '';
            const stockAsli = inputs[2]?.value || '';
            const fotoInput = inputs[3];

            let fotoSrc = '';
            if (fotoInput?.files && fotoInput.files[0]) {
                fotoSrc = URL.createObjectURL(fotoInput.files[0]);
            }

            html += `
                <tr>
                    <td>${namaItem}</td>
                    <td>${stockCandice}</td>
                    <td>${stockAsli}</td>
                    <td>${fotoSrc ? `<img src="${fotoSrc}" style="width:70px;">` : ''}</td>
                </tr>
            `;
        });

        html += '</table>';
        element.innerHTML = html;

        html2pdf().from(element).save(`Stock_Opname_${branchName}.pdf`);
    });

    // Generate dropdown tanggal
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');

    for (let i = 1; i <= 31; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        daySelect.add(option);
    }

    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    months.forEach(month => {
        let option = document.createElement('option');
        option.value = option.text = month;
        monthSelect.add(option);
    });

    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        yearSelect.add(option);
    }
});

// Hapus baris tabel
function hapusBaris(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
