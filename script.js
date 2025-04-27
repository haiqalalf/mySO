// Populate Tanggal, Bulan, Tahun
const daySelect = document.getElementById('daySelect');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');

// Hari
for (let d = 1; d <= 31; d++) {
    const option = document.createElement('option');
    option.value = d;
    option.textContent = d;
    daySelect.appendChild(option);
}

// Bulan
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = month;
    monthSelect.appendChild(option);
});

// Tahun
const currentYear = new Date().getFullYear();
for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
}

// Fungsi Tambah Item
document.getElementById('addItemBtn').addEventListener('click', () => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Nama Item"></td>
        <td><input type="number" placeholder="Stock Candice"></td>
        <td><input type="number" placeholder="Stock Asli"></td>
        <td><input type="file" accept="image/*"></td>
        <td><button class="deleteBtn">Hapus</button></td>
    `;
    document.querySelector('#itemTable tbody').appendChild(row);

    row.querySelector('.deleteBtn').addEventListener('click', () => {
        row.remove();
    });
});

// Fungsi Set Nama User
document.getElementById('setUserBtn').addEventListener('click', () => {
    const userName = document.getElementById('userInput').value;
    if (userName.trim() !== '') {
        alert(`User diset: ${userName}`);
    }
});

// Fungsi Set Nama Cabang
document.getElementById('setBranchBtn').addEventListener('click', () => {
    const branchName = document.getElementById('branchInput').value;
    if (branchName.trim() !== '') {
        alert(`Cabang diset: ${branchName}`);
    }
});

// Fungsi Download PDF (Fix Landscape dan Background)
document.getElementById('downloadPDFBtn').addEventListener('click', () => {
    const element = document.getElementById('contentToDownload');

    const opt = {
        margin: 5,
        filename: `Stock-Opname-${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#FFFFFF' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save();
});
