const MongoClient = require("mongodb").MongoClient;
const MongoDBUrl = "mongodb://localhost:27017/MongoDB";
const database = "MongoDB";
var objectId = require("mongodb").ObjectID;

const loginUser = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var userInfo = {
      username: request.body.username,
      password: request.body.password,
    };

    db.collection("customer").findOne(userInfo, function (err, result) {
      if (err) throw err;

      response.status(200).json(result);
    });
  });
};

const getCustomers = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);

    db.collection("customer")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getCustomersById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var customerId = request.body.id;

    db.collection("customer").findOne(
      { _id: objectId(customerId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const getHotelListing = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);

    db.collection("listing")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getHotelListingById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var hotelId = request.body.hotelId;

    db.collection("listing").findOne(
      { _id: objectId(hotelId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const getHotelListingDetails = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);

    db.collection("hotellistingdetails")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getHotelListingDetailsById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var hotelListingDetailId = request.body.hotelListingDetailId;

    db.collection("hotellistingdetails").findOne(
      { _id: objectId(hotelListingDetailId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const getHotelReview = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);

    db.collection("hotelreview")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getHotelReviewById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var hotelReviewId = request.body.hotelReviewId;

    db.collection("hotelreview").findOne(
      { _id: objectId(hotelReviewId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const getHotelListingWithDetails = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);

    db.collection("listing")
      .aggregate([
        {
          $lookup: {
            from: "hotellistingdetails",
            localField: "_id",
            foreignField: "listingid",
            as: "hotellistingwithdetails",
          },
        },
      ])
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getHotelListingWithDetailsById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var listingId = request.body.listingid;

    db.collection("listing")
      .aggregate([
        {
          $lookup: {
            from: "hotellistingdetails",
            localField: "_id",
            foreignField: "listingid",
            as: "hotellistingwithdetails",
          },
        },
      ])
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getBooking = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var bookingId = request.body.bookingId;

    db.collection("bookings")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getBookingById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var bookingId = request.body.id;
    bookingId = request.params.id;
    // .aggregate([
    //   {
    //     $lookup: {
    //       from: "hotellistingdetails",
    //       localField: "_id",
    //       foreignField: "listingid",
    //       as: "hotellistingwithdetails",
    //     },
    //   },
    // ])
    db.collection("bookings")
      .aggregate([
        { $match: { _id: objectId(bookingId) } },
        {
          $lookup: {
            from: "customer",
            localField: "_id",
            foreignField: "customerid",
            as: "bookingswithCustomerId",
          },
        },
      ])
      .toArray(function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      });
  });
};
// db.users.aggregate([
//   { $match: { UserName: "administrator" } },
//   {
//     $lookup: {
//       from: "companies",
//       as: "Company",
//       let: { CompanyID: "$CompanyID" },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 { $eq: ["$CompanyID", "$$CompanyID"] },
//                 { $eq: ["$CompanyName", "edt5"] },
//               ],
//             },
//           },
//         },
//       ],
//     },
//   },
// ]);
const createUser = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var user = {
      name: request.body.name,
      address: request.body.address,
      contactno: request.body.contactno,
      username: request.body.username,
      password: request.body.password,
    };

    db.collection("customer").insertOne(user, function (err, result) {
      if (err) throw err;

      response.status(200).json(result);
    });
  });
};

const createBooking = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var booking = {
      checkindate: request.body.checkindate,
      checkoutdate: request.body.checkoutdate,
      numofguest: request.body.numofguest,
      isCanceled: request.body.isCanceled,
      customerid: request.body.customerId,
      roomType: request.body.roomType,
      listingid: request.body.listingId,
    };

    db.collection("bookings").insertOne(booking, function (err, result) {
      if (err) throw err;

      response.status(200).json(result);
    });
  });
};

const createHotelReview = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var hotelReview = {
      listingid: request.body.listingid,
      ratings: request.body.ratings,
      reviews: request.body.reviews,
    };

    db.collection("hotelreview").insertOne(hotelReview, function (err, result) {
      if (err) throw err;

      response.status(200).json(result);
    });
  });
};

const createListingDetails = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var listingDetails = {
      roomTyp: request.body.roomType,
      numOfRooms: request.body.numOfRooms,
      listingid: request.body.listingid,
    };

    db.collection("hotellistingdetails").insertOne(
      listingDetails,
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const createListing = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var listing = {
      hotelname: request.body.hotelname,
      address: request.body.address,
      city: request.body.city,
      amenities: request.body.amenities,
    };

    db.collection("hotellisting").insertOne(listing, function (err, result) {
      if (err) throw err;

      response.status(200).json(result);
    });
  });
};

const updateUser = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var updateUser = {
      name: request.body.name,
      username: request.body.user,
      password: request.body.password,
      address: request.body.address,
      contactno: request.body.contactNo,
    };

    var customerId = request.body.customerId;

    db.collection("customer").updateOne(
      { _id: objectId(customerId) },
      { $set: updateUser },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const updateBooking = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var updateBooking = {
      checkindate: request.body.checkindate,
      checkoutdate: request.body.checkoutdate,
      numofguest: request.body.numofguest,
      isCanceled: request.body.isCanceled,
      customerid: request.body.customerId,
      roomType: request.body.roomType,
    };

    var bookingId = request.body.bookingId;

    db.collection("bookings").updateOne(
      { _id: objectId(bookingId) },
      { $set: updateBooking },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const updateHotelReview = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var updateHotelReview = {
      listingid: request.body.listingId,
      rating: request.body.rating,
      reviews: request.body.reviews,
    };

    var hotelReviewId = request.body.hotelReviewId;

    db.collection("hotelreview").updateOne(
      { _id: objectId(hotelReviewId) },
      { $set: updateHotelReview },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const updateListing = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var updateListing = {
      hotelname: request.body.hotelname,
      address: request.body.address,
      city: request.body.city,
      amenities: request.body.amenities,
    };

    var listingId = request.body.listingId;

    db.collection("listing").updateOne(
      { _id: objectId(listingId) },
      { $set: updateListing },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const updateListingDetails = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var updateListingDetails = {
      roomType: request.body.roomType,
      numOfRooms: request.body.numOfRooms,
      listingId: request.body.listingId,
    };

    var listingDetailsId = request.body.listingDetails;

    db.collection("hotellistingdetails").updateOne(
      { _id: objectId(listingDetailsId) },
      { $set: updateListingDetails },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const deleteBooking = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var customerId = request.body.customerId;

    db.collection("bookings").deleteOne(
      { _id: objectId(customerId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const deleteHotelReview = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var hotelReviewId = request.body.hotelReviewId;

    db.collection("hotelreview").deleteOne(
      { _id: objectId(hotelReviewId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const deleteListing = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var listingId = request.body.listingId;

    db.collection("listing").deleteOne(
      { _id: objectId(listingId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const deleteListingDetails = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var hotelListingDetailId = request.body.hotelListingDetailId;

    db.collection("hotellistingdetails").deleteOne(
      { _id: objectId(hotelListingDetailId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const deleteUser = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var customerId = request.body.customerId;

    db.collection("customer").deleteOne(
      { _id: objectId(customerId) },
      function (err, result) {
        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

module.exports = {
  loginUser,
  getCustomers,
  getCustomersById,
  getHotelListing,
  getHotelListingById,
  getHotelListingDetails,
  getHotelListingDetailsById,
  getHotelReview,
  getHotelReviewById,
  getHotelListingWithDetails,
  getHotelListingWithDetailsById,
  getBooking,
  getBookingById,
  createUser,
  createBooking,
  createHotelReview,
  createListingDetails,
  createListing,
  updateUser,
  updateBooking,
  updateHotelReview,
  updateListing,
  updateListingDetails,
  deleteBooking,
  deleteHotelReview,
  deleteListing,
  deleteListingDetails,
  deleteUser,
};
