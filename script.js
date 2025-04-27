// Tambah baris baru
function addItem(tbody) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td><input type="text" placeholder="Nama Item"></td>
    <td><input type="number" placeholder="Stock Candice"></td>
    <td><input type="number" placeholder="Stock Asli"></td>
    <td>
      <input type="file" accept="image/*" capture="environment" onchange="previewImage(event, this)">
      <div></div>
    </td>
    <td>
      <button onclick="deleteRow(this)">🗑️ Hapus</button>
    </td>
  `;

  tbody.appendChild(row);
}

// Hapus baris
function deleteRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

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

// Tampilkan tanggal hari ini
function setTanggalHariIni() {
  const today = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('tanggal').textContent = today.toLocaleDateString('id-ID', options);
}

// Set nama cabang ke tampilan
function setCabang() {
  const cabangInput = document.getElementById('cabang').value.trim();
  const display = document.getElementById('namaCabangDisplay');
  if (cabangInput) {
    display.textContent = "Cabang: " + cabangInput;
  } else {
    display.textContent = "";
  }
}

// Generate dan download PDF
function downloadPDF() {
  const captureArea = document.getElementById('captureArea');

  const opt = {
    margin:       0.2,
    filename:     `Stock_Opname.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
  };

  html2pdf().from(captureArea).set(opt).save();
}

// Event listener tombol
document.getElementById('addItemBtn').addEventListener('click', function() {
  addItem(document.querySelector('#itemsTable tbody'));
});

document.getElementById('downloadBtn').addEventListener('click', downloadPDF);

document.getElementById('setCabangBtn').addEventListener('click', setCabang);

// Saat load, set tanggal
window.onload = setTanggalHariIni;
