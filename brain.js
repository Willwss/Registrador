let data = [
    ["Nome", "Preço", "Produto", "CPF", "Telefone", "Parcelas"]
  ];
  
  document.querySelector("#dataForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.querySelector("#nameInput").value;
    let price = parseFloat(document.querySelector("#priceInput").value);
    let prod = document.querySelector("#prodInput").value;
    let cpf = document.querySelector("#cpfInput").value;
    let phone = document.querySelector("#phoneInput").value;
    let qtdparcelas = parseInt(document.querySelector("#parcelaSelect").value);
  
    let parcelas = [];
    for (let i = 1; i <= qtdparcelas; i++) {
      let parcelaValue = (price / qtdparcelas).toFixed(2);
      parcelas.push(`Parcela ${i}: R$${parcelaValue}`);
    }
  
    data.push([name, price, prod, cpf, phone, qtdparcelas, ...parcelas]);
    document.querySelector("#dataForm").reset();
    console.log(data)
  });
  
  document.querySelector("#priceInput").addEventListener("input", function() {
    let price = parseFloat(document.querySelector("#priceInput").value);
    let parcelaSelect = document.querySelector("#parcelaSelect");
    
    if (isNaN(price)) {
      parcelaSelect.innerHTML = "";
      parcelaSelect.disabled = true;
      return;
    }
    
    let options = "<option value=''>Selecione a quantidade de parcelas</option>";
    
    for (let i = 1; i <= 12; i++) {
      let parcelaValue = (price / i).toFixed(2);
      options += `<option value="${i}">${i}x (R$${parcelaValue})</option>`;
    }
    
    parcelaSelect.innerHTML = options;
    parcelaSelect.disabled = false;
  });
  
  function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;
  
    csvFile = new Blob([csv], {type: "text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function exportToCSV(filename) {
  let maxParcelas = data.slice(1).reduce((max, row) => Math.max(max, row[5]), 0);
  
  let header = ["Nome", "Preço", "Produto", "CPF", "Telefone", "Parcelas"];
  for (let i = 1; i <= maxParcelas; i++) {
    header.push(`Parcela ${i}`);
    console.log(maxParcelas)
  }
  
  let csv = [header.join(",")];
  
  data.slice(1).forEach(function(row) {
    let paddedRow = row.concat(Array(Math.max(0, maxParcelas - row[5])).fill(""));
    csv.push(paddedRow.join(","));
  });
  
  let csvString = csv.join("\n");
  downloadCSV(csvString, filename);
}

document.querySelector("#exportForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let filename = document.querySelector("#filenameInput").value;
  if (filename) {
    exportToCSV(filename + ".csv");
    document.querySelector("#exportForm").reset();
  }
});
