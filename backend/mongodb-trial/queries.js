const MongoClient = require("mongodb").MongoClient;
const MongoDBUrl = "mongodb://localhost:27017/MongoDB";
const database = "MongoDB";
var crypto = require("crypto");
var objectId = require("mongodb").ObjectID;
const { performance } = require("perf_hooks");

const loginUser = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    var hashpass = crypto
      .createHash("md5")
      .update(request.body.password)
      .digest("hex");
    if (err) throw err;

    var db = client.db(database);
    var userInfo = {
      username: request.body.username,
      password: hashpass,
    };
    console.log(request.body.username);
    console.log(hashpass);

    console.log(userInfo);
    var start = performance.now();

    db.collection("customer").findOne(userInfo, function (err, result) {
      var end = performance.now();
      console.log("Time elapsed to Login Via MongoDB: " + (end - start));

      if (err) throw err;

      response.status(200).json(result);
    });
  });
};

const getCustomers = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var start = performance.now();

    db.collection("customer")
      .find()
      .toArray(function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve All Customer info Via MongoDB: " +
            (end - start)
        );

        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getCustomersById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var customerId = request.params.id;
    var start = performance.now();

    db.collection("customer").findOne(
      { _id: objectId(customerId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve specific Customer info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();

    db.collection("listing")
      .find()
      .toArray(function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve All hotel listing info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();

    db.collection("listing").findOne(
      { _id: objectId(hotelId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve specific hotel listing info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();

    db.collection("hotellistingdetails")
      .find()
      .toArray(function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve All hotel listing details info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();

    db.collection("hotellistingdetails").findOne(
      { _id: objectId(hotelListingDetailId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve specific hotel listing details info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();

    db.collection("hotelreview")
      .find()
      .toArray(function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve All hotelreview info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();

    db.collection("hotelreview").findOne(
      { _id: objectId(hotelReviewId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve specific hotelreview info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();

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
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve All listing with details info Via MongoDB: " +
            (end - start)
        );

        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getHotelListingWithDetailsById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var listingId = request.params.id;
    var start = performance.now();

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
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve specific listing with details info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("bookings")
      .find()
      .toArray(function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve All bookings Via MongoDB: " + (end - start)
        );

        if (err) throw err;

        response.status(200).json(result);
      });
  });
};

const getBookingById = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    bookingId = request.params.id;
    // console.log("request is ", request.params.id);
    var start = performance.now();
    var json = db
      .collection("bookings")
      .aggregate([
        { $match: { _id: objectId(bookingId) } },
        {
          $lookup: {
            from: "listing",
            localField: "listingid",
            foreignField: "_id",
            as: "listing",
          },
        },
        {
          $unwind: "$listing",
        },
      ])
      .toArray(function (err, result) {
        if (err) throw err;
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve specific bookings Via MongoDB: " +
            (end - start)
        );

        response.status(200).json(result);
      });
  });
};

const createUser = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    var hashpass = crypto
      .createHash("md5")
      .update(request.body.password)
      .digest("hex");
    if (err) throw err;

    var db = client.db(database);
    var user = {
      name: request.body.name,
      address: request.body.address,
      contactno: request.body.contactno,
      username: request.body.username,
      password: hashpass,
    };
    var start = performance.now();
    db.collection("customer").insertOne(user, function (err, result) {
      var end = performance.now();
      console.log("Time elapsed to create user Via MongoDB: " + (end - start));

      if (err) throw err;

      response.status(200).json(result);
    });
  });
};

const createBooking = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    console.log(request.body.customerid);
    console.log(request.body.listingid);

    var booking = {
      checkindate: request.body.checkindate,
      checkoutdate: request.body.checkoutdate,
      numofguest: request.body.numofguest,
      isCanceled: request.body.isCanceled,
      customerid: objectId(request.body.customerid),
      roomType: request.body.roomType,
      listingid: objectId(request.body.listingid),
    };
    var start = performance.now();
    db.collection("bookings").insertOne(booking, function (err, result) {
      var end = performance.now();
      console.log(
        "Time elapsed to create booking Via MongoDB: " + (end - start)
      );

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
    var start = performance.now();
    db.collection("hotelreview").insertOne(hotelReview, function (err, result) {
      var end = performance.now();
      console.log(
        "Time elapsed to create hotelreview Via MongoDB: " + (end - start)
      );

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
    var start = performance.now();
    db.collection("hotellistingdetails").insertOne(
      listingDetails,
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to create hotel listing detail Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("hotellisting").insertOne(listing, function (err, result) {
      var end = performance.now();
      console.log(
        "Time elapsed to create hotel listing Via MongoDB: " + (end - start)
      );

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
    var start = performance.now();
    db.collection("customer").updateOne(
      { _id: objectId(customerId) },
      { $set: updateUser },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to update user info Via MongoDB: " + (end - start)
        );

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
    var start = performance.now();
    db.collection("bookings").updateOne(
      { _id: objectId(bookingId) },
      { $set: updateBooking },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to update booking info Via MongoDB: " + (end - start)
        );

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
    var start = performance.now();
    db.collection("hotelreview").updateOne(
      { _id: objectId(hotelReviewId) },
      { $set: updateHotelReview },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to update hotel review info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("listing").updateOne(
      { _id: objectId(listingId) },
      { $set: updateListing },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to update hotel listing info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("hotellistingdetails").updateOne(
      { _id: objectId(listingDetailsId) },
      { $set: updateListingDetails },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to update hotel listing detail info Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("bookings").deleteOne(
      { _id: objectId(customerId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to delete booking Via MongoDB: " + (end - start)
        );

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
    var start = performance.now();
    db.collection("hotelreview").deleteOne(
      { _id: objectId(hotelReviewId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to delete specific hotel review Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("listing").deleteOne(
      { _id: objectId(listingId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to delete specific Listing Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("hotellistingdetails").deleteOne(
      { _id: objectId(hotelListingDetailId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to delete specific hotel listing details Via MongoDB: " +
            (end - start)
        );

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
    var start = performance.now();
    db.collection("customer").deleteOne(
      { _id: objectId(customerId) },
      function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to delete specific user Via MongoDB: " + (end - start)
        );

        if (err) throw err;

        response.status(200).json(result);
      }
    );
  });
};

const getBookingByCustomerId = (request, response) => {
  MongoClient.connect(MongoDBUrl, function (err, client) {
    if (err) throw err;

    var db = client.db(database);
    var customerId = request.params.id;
    console.log("input", customerId);
    console.log("input", objectId(customerId));
    var start = performance.now();
    db.collection("bookings")
      .aggregate([
        { $match: { customerid: objectId(customerId) } },
        {
          $lookup: {
            from: "listing",
            localField: "listingid",
            foreignField: "_id",
            as: "listing",
          },
        },
        {
          $unwind: "$listing",
        },
      ])
      .toArray(function (err, result) {
        var end = performance.now();
        console.log(
          "Time elapsed to retrieve specific bookings Via MongoDB: " +
            (end - start)
        );

        if (err) throw err;
        response.status(200).json(result);
      });

    // db.collection("bookings")
    //   .find({ customerid: objectId(customerId) })
    //   .toArray(function (err, result) {
    //     if (err) throw err;

    //     response.status(200).json(result);
    //   });
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
  getBookingByCustomerId,
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
