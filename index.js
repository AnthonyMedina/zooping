const axios = require('axios');

const { BASE_URL, ZOOPLA_API_KEY } = require('./config');
const { formatListings } = require('./utils');

const getProperties = async () => {
  const { data } = await axios({
    method: 'get',
    url: `${BASE_URL}/property_listings.js`,
    responseType: 'application/json',
    params: {
      api_key: ZOOPLA_API_KEY,
      area: 'Chorlton Cum Hardy, Greater Manchester',
      order_by: 'age',
      maximum_price: 250000,
      minimum_beds: 2,
      page_size: 10,
      listing_status: 'sale',
      property_type: 'houses'
    }
  });
  // console.log(data);
  const properties = formatListings(data.listing);
  console.log(properties);
};

getProperties();
