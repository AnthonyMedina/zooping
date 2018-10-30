exports.formatListings = listings => {
  return listings.map(
    ({
      displayable_address,
      price,
      price_change,
      longitude,
      latitude,
      num_bedrooms,
      short_description,
      first_published_date
    }) => ({
      displayable_address,
      price,
      price_change:
        price_change.reduce((acc, { percent }) => {
          if (+percent[0] !== 0) {
            return `latest: ${percent}`;
          }
          return acc;
        }, '') || 'no change',
      location: [longitude, latitude],
      num_bedrooms,
      short_description,
      first_published_date
    })
  );
};
