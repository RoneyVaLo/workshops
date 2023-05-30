const result = document.getElementById('result');
const btnExchange = document.getElementById('btnExchange');
const countriesSelect = document.getElementById("countries");

let currency = countriesSelect.value;

//* EXCHANGE RATE FROM MY API

const completed = (e) => {
    const data = JSON.parse(e.target.responseText);
    const USDcurrencyValue = (1 / (data.usd)).toFixed(2);
    const EURcurrencyValue = (1 / (data.eur)).toFixed(2);
    result.innerHTML = `
        <p class="result-paragraph">
            <span class="currency-name">Dolar (USD):</span>
            <span class="currency-value">${USDcurrencyValue}</span>
        </p>
        <p class="result-paragraph">
            <span class="currency-name">Euro (EUR):</span>
            <span class="currency-value">${EURcurrencyValue}</span>
        </p>
    `;
    result.style.opacity = 1;
};

const error = () => console.log(this.responseText);

function getExchange() {
    if (currency !== "") {
        const ajaxRequest = new XMLHttpRequest();
        ajaxRequest.addEventListener("load", completed);
        ajaxRequest.addEventListener("error", error);
        ajaxRequest.open("GET", `http://localhost:3000/tipocambio/${currency}`);
        ajaxRequest.send();
    } else {
        result.style.opacity = 0;
    }
}

btnExchange.addEventListener('click', (e) => {
    e.preventDefault();
    getExchange();
});


//* SET COUNTRIES
const ajaxRequest = new XMLHttpRequest();
ajaxRequest.addEventListener("load", (e) => {

    const countries = JSON.parse(e.target.responseText);
    let optionsHtml = "";
    console.log(countries);
    countries
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        .forEach(country => {
            optionsHtml += `<option value="${country.currency}">${country.name}</option>`;
        });
    countriesSelect.innerHTML += optionsHtml;
});
ajaxRequest.addEventListener("error", () => { });
ajaxRequest.open("GET", "http://localhost:3000/countries");
ajaxRequest.send();


//* UPDATE THE EXCHANGE RATE WHEN THE COUNTRY CHANGES

countriesSelect.addEventListener('change', () => {
    currency = countriesSelect.value;
    getExchange();
});

