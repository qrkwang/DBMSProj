const express = require('express');
const app = express();
const db = require('./queries')



app.get('/customer', db.getCustomers)

app.get('/hotel/hotellisting',db.getHotelListing);

app.get('/hotel/hotellistingdetail',db.getHotelListingDetails);

app.get('/hotel/hotelreview',db.getHotelReview );

app.get('/booking',db.getBooking );



const port = process.env.PORT || 5050
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
