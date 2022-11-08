/* Example in Node.js */
const axios = require('axios');
//app.use(bodyParser.urlencoded({ extended: true }));
let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': 'e5417da8-46fd-4e64-96ec-cbed260959f4',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    let json = response.data.data;
    console.log(json);
    resolve(json);
  }
});