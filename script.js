const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
const addItemBtn = document.getElementById('addItem');
const downloadPDFBtn = document.getElementById('downloadPDF');
const branchInput = document.getElementById('branch');
const setBranchBtn = document.getElementById('setBranch');
const userInput = document.getElementById('user');
const setUserBtn = document.getElementById('setUser');

setBranchBtn.addEventListener('click', () => {
    const branchName = branchInput.value.trim();
    if (branchName) {
        document.getElementById('branchTitle').textContent = branchName;
    }
});

setUserBtn.addEventListener('click', () => {
    const userName = userInput.value.trim();
    if (userName) {
        document.getElementById('userTitle').textContent = userName;
    }
});

// Tambah item
addItemBtn.addEventListener('click', () => {
    const row = stockTable.insertRow();
    
    const namaItemCell = row.insertCell(0);
    const stockCandiceCell = row.insertCell(1);
    const stockAsliCell = row.insertCell(2);
    const fotoCell = row.insertCell(3);
    const aksiCell = row.insertCell(4);

    namaItemCell.setAttribute('data-label', 'Nama Item');
    stockCandiceCell.setAttribute('data-label', 'Stock Candice');
    stockAsliCell.setAttribute('data-label', 'Stock Asli');
    fotoCell.setAttribute('data-label', 'Foto');
    aksiCell.setAttribute('data-label', 'Aksi');

    namaItemCell.innerHTML = '<input type="text" placeholder="Nama Item">';
    stockCandiceCell.innerHTML = '<input type="number" placeholder="0">';
    stockAsliCell.innerHTML = '<input type="number" placeholder="0">';
    fotoCell.innerHTML = '<input type="file" accept="image/*" capture="camera">';
    aksiCell.innerHTML = '<button onclick="hapusBaris(this)">🗑️ Hapus</button>';
});

// Preview gambar di tabel
function previewImage(event, input) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewDiv = input.nextElementSibling;
      previewDiv.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
}

// Hapus baris
function hapusBaris(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Generate tanggal
function populateDateSelectors() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');

    for (let i = 1; i <= 31; i++) {
        daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    months.forEach((month, index) => {
        monthSelect.innerHTML += `<option value="${index+1}">${month}</option>`;
    });
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
        yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

populateDateSelectors();

// Download PDF (landscape)
downloadPDFBtn.addEventListener('click', () => {
    const element = document.querySelector('.container');
    const opt = {
        margin:       [10, 10, 10, 10],
        filename:     'stock-opname.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 3 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().from(captureArea).set(opt).from(element).save();
});
