require("dotenv").config();
//require("./models/db");
///const jwt = require("jsonwebtoken");
const express = require("express");
//const path = require("path");
//const exphbs=require('express-handlebars');
const axios = require("axios");
const bodyparser = require("body-parser");

//can hong 2 dong

var app = express();

//app.use(express.static('./filestatuc'))
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
//app.use(filter());

//app.use(cookieParser());

app.listen(5000, () => {
  console.log("Express server started at port :5000");
});
// let response = null;
// new Promise(async (resolve, reject) => {
//   try {
//     response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
//       headers: {
//         'X-CMC_PRO_API_KEY': 'e5417da8-46fd-4e64-96ec-cbed260959f4',
//       },
//     });
//   } catch(ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
//   }
//   if (response) {
//     // success
//     let json = response.data.data;
//     console.log(json);
//     resolve(json);
//   }
// });
app.post("/getdata", async (req, res) => {
  // let
  try {
    response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "e5417da8-46fd-4e64-96ec-cbed260959f4",
        },
      }
    );
  } catch (ex) {
    // response = null;
    // error
    // console.log(ex);
    // reject(ex);
  }
  if (response) {
    // success
    let json = response.data.data;
    //console.log(JSON.stringify(json))
    // console.log(JSON.parse(JSON.stringify(json)))
    // let result='[ ';
    // // console.log(json);
    // // resolve(json);
    // for(let i=0;i<json.length;i++){
    //     result+=JSON.stringify(json[i].quote);
    // }
    // result+='] ';
    // console.log(JSON.parse(result));

    let temp = json.map((element) => ({
      id: element.id,
      name: element.name,
      symbol: element.symbol,
      price: element.quote.USD.price,
      percent_change_1h:element.quote.USD.percent_change_1h,
      percent_change_24h:element.quote.USD.percent_change_24h,
      percent_change_7d:element.quote.USD.percent_change_7d,
      market_cap:element.quote.USD.market_cap,
      volume_24h:element.quote.USD.volume_24h,
    }));
    //console.log(temp);
    res.status(200).send(temp);
  }
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resouces not found</h1>");
});
