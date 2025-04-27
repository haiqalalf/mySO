// Tampilkan tanggal sekarang
const today = new Date();
document.getElementById('todayDate').textContent = formatDate(today);

// Isi dropdown tanggal/bulan/tahun
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');

for (let i = 1; i <= 31; i++) {
  daySelect.innerHTML += `<option value="${i}">${i}</option>`;
}

const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

months.forEach((month, index) => {
  monthSelect.innerHTML += `<option value="${index+1}">${month}</option>`;
});

for (let y = 2020; y <= 2035; y++) {
  yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
}

// Set Nama User
document.getElementById('setUserBtn').addEventListener('click', () => {
  const user = document.getElementById('userName').value;
  if (user) {
    document.getElementById('userName').disabled = true;
  }
});

// Set Nama Cabang
document.getElementById('setBranchBtn').addEventListener('click', () => {
  const branch = document.getElementById('branchName').value;
  if (branch) {
    document.getElementById('branchName').disabled = true;
  }
});

// Tambah Item
const addItemBtn = document.getElementById('addItemBtn');
const itemTableBody = document.querySelector('#itemTable tbody');

addItemBtn.addEventListener('click', () => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" placeholder="Nama Item"></td>
    <td><input type="number" placeholder="0"></td>
    <td><input type="number" placeholder="0"></td>
    <td><input type="file" accept="image/*"></td>
    <td><button class="deleteBtn">Hapus</button></td>
  `;
  itemTableBody.appendChild(row);

  // Tombol hapus
  row.querySelector('.deleteBtn').addEventListener('click', () => {
    row.remove();
  });
});

// Download PDF
document.getElementById('downloadPDFBtn').addEventListener('click', () => {
  const element = document.getElementById('content');
  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     'stock-opname.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3, backgroundColor: '#ffffff' },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };
  html2pdf().set(opt).from(element).save();
});

function formatDate(date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
