const express = require('express');
const cors = require("cors");
const axios = require('axios');

const app = express();


// check for cors
app.use(cors({
    domains: '*',
    methods: "*"
}));


// listen to GET requests on /hello
app.get('/hello', function (req, res) {
    res.send('Hello World');
});

// Get Exchange Rate by Country
app.get('/tipocambio/:currency', async function (req, res) {
    let currency = req.params.currency;
    let exchange = { usd: 0, eur: 0 };

    try {
        const countryExchangeRates = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.json`);
        
        exchange.usd = countryExchangeRates.data[currency.toLowerCase()].usd;
        exchange.eur = countryExchangeRates.data[currency.toLowerCase()].eur;

        res.send(exchange);
    } catch (error) {
        console.error(error);
    }
});

// Get Country Data
app.get('/countries', async function (req, res) {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const filteredResponse = response.data.filter(date => date.currencies);
        const data = filteredResponse.map(country => (
            {
                name: country.name.common,
                currency: Object.keys(country.currencies)[0],
            }
        ));

        res.send(data);
    } catch (error) {
        console.error(error);
    }
});


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
