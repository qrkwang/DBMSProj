const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./queries");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

//Parse passed data into request.body
app.use(bodyParser.json());

app.get("/customer", db.getCustomers);
app.get("/customer/customerbyid", db.getCustomersById);
app.get("/hotel/hotellisting", db.getHotelListing);
app.get("hotel/hotellistingbyid", db.getHotelListingById);
app.get("/hotel/hotellistingdetail", db.getHotelListingDetails);
app.get("/hotel/hotellistingdetailbyid", db.getHotelListingDetailsById);
app.get("/hotel/hotelreview", db.getHotelReview);
app.get("/hotel/hotelreviewbyid", db.getHotelReviewById);
app.get("/hotel/hotellistingwithdetails", db.getHotelListingWithDetails);
app.get("/hotel/hotellistingwithdetailsbyid", db.getHotelListingWithDetailsById);
app.get("/booking", db.getBooking);
app.get("/booking/bookingbyid", db.getBookingById);
app.post("/user/create", db.createUser);
app.post("/booking/createbooking", db.createBooking);
app.post("/hotel/createhotelreview", db.createHotelReview);
app.post("/hotel/createlistingdetails", db.createListingDetails);
app.post("/hotel/createlisting", db.createListing);
app.post("/customer/updateuser", db.updateUser);
app.post("/booking/updatebooking", db.updateBooking);
app.post("/hotel/updatehotelreview", db.updateHotelReview);
app.post("/hotel/hotellisting", db.updateListing);
app.post("/hotel/hotellistingdetails", db.updateListingDetails);
app.post("/booking/deletebooking", db.deleteBooking);
app.post("/hotel/deletehotelreview", db.deleteHotelReview);
app.post("/hotel/deletelisting", db.deleteListing);
app.post("/hotel/deletelistingdetails", db.deleteListingDetails);
app.post("/customer/deleteuser", db.deleteUser);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
