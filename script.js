const apiKey = "AIzaSyCvCa8ryE6TCZ6cGPE57kTIbBSCmPcMBPc";
const sheetID = "1L06lCHVHHmZ6lmt9EVZHfFX9bTda6JIAok8gKiOz254";
const range = "A5:E60"; 

const textoTitulo = "GRUPO ESPECIAL DE REAÇÃO";
const elementoTitulo = document.getElementById("texto-titulo");
let i = 0;

function escreverTitulo() {
  if (i < textoTitulo.length) {
    elementoTitulo.textContent += textoTitulo.charAt(i);
    i++;
    setTimeout(escreverTitulo, 100);
  }
}

function getSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      if (rows) {
        const tbodyTreinos = document.querySelector('#tabela-treinos tbody');
        tbodyTreinos.innerHTML = "";

        rows.forEach((row) => {
          const tr = document.createElement('tr');
          row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || "";
            tr.appendChild(td);
          });
          tbodyTreinos.appendChild(tr);
        });
      }
    })
    .catch(error => console.error("Erro ao buscar dados da planilha:", error));
}

window.onload = () => {
  escreverTitulo();
  getSheetData();
};
