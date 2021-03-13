const express = require('express');
const app = express();
const db = require('./queries')

app.get('/customer', db.getCustomers)
app.get('/customer/:id',db.getCustomerById);

app.get('/hotel/hotellistingWithDetail',db. getHotelListingWithDetails);
app.get('/hotel/hotellistingWithDetail/:id',db. getHotelListingWithDetailsById);


app.get('/hotel/hotellisting',db.getHotelListing);
app.get('/hotel/hotellisting/:id',db.getHotelListingById);

app.get('/hotel/hotellistingdetail',db.getHotelListingDetails);
app.get('/hotel/hotellistingdetail/:id',db.getHotelListingDetailsById);

app.get('/hotel/hotelreview',db.getHotelReview );
app.get('/hotel/hotelreview/:id',db.getHotelReviewById);


app.get('/booking',db.getBooking );
app.get('/booking/:id',db.getBookingById);



const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
