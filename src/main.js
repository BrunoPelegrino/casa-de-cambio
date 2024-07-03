import Swal from 'sweetalert2';
import './style.css';
const API_URL = `https://v6.exchangerate-api.com/v6/f8ebb4f34675fbc43b915c41/latest`;
const coinInput = document.getElementById('coin-input');
const searchBtn = document.getElementById('search-btn');
const list = document.getElementById('result');


searchBtn.addEventListener('click', () => {
  const coin = coinInput.value.toUpperCase();
  
  if (!coin) {
    Swal.fire({
      title: 'Moeda não informada',
      text: 'Você deve passar uma moeda',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  } else
    fetch(`${API_URL}/${coin}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'error') {
          Swal.fire({
            title: 'Moeda não existente',
            text: 'Você deve passar uma moeda que exista',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          const resultObj = data.conversion_rates;
          const resultArr = Object.entries(resultObj);
          list.innerHTML = '';
          resultArr.forEach(([currency, rate]) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span class="currency"> 💱 ${currency}</span>: <span class="rate">${rate}</span>`;
            list.appendChild(listItem);
          });

        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Erro na requisição',
          text: 'Ocorreu um erro ao buscar as taxas de câmbio',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.log(`Erro na requisição: ${error.message}`);
      });
});
