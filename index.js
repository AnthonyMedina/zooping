const axios = require('axios');
const { writeFileSync } = require('fs');

const { BASE_URL, ZOOPLA_API_KEY } = require('./config');
const { formatListings } = require('./utils');
const { previousListingIds } = require('./cache.json');

const updateCache = listings => {
  const listingIds = previousListingIds.concat(
    listings.map(listing => listing.listing_id)
  );
  writeFileSync(
    './cache.json',
    JSON.stringify({ previousListingIds: listingIds }, null, '  ')
  );
};

const getNewProperties = async area => {
  const { data } = await axios({
    method: 'get',
    url: `${BASE_URL}/property_listings.js`,
    responseType: 'application/json',
    params: {
      api_key: ZOOPLA_API_KEY,
      area,
      order_by: 'age',
      maximum_price: 250000,
      minimum_beds: 2,
      page_size: 10,
      listing_status: 'sale',
      property_type: 'houses'
    }
  });

  const listings = data.listing.filter(
    property => !previousListingIds.includes(property.listing_id)
  );

  updateCache(listings);

  return formatListings(listings);
};

const logNewProperties = async () => {
  const newProperties = await getNewProperties('Chorlton Cum Hardy');
  console.log(newProperties);
};

logNewProperties();
