var mysql = require("mysql");
function initializeConnection(config) {
  function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");

          initializeConnection(connection.config);
        } else if (error.fatal) {
          throw error;
        }
      }
    });
  }

  var connection = mysql.createConnection(config);
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}
var connection = initializeConnection({
  user: "tpuser",
  host: "127.0.0.1",
  database: "tpdbv1",
  password: "teamDB",
});
const loginUser = (request, response) => {
  const sql = "Select * from customer where username = ? and password = ?";
  connection.query(
    sql,
    [request.body.username, request.body.password],
    (error, results, fields) => {
      if (results.length > 0) {
        if (results) {
          response.status(200).json(results);
        }
      } else {
        response.status(200).send("false");
      }
    }
  );
};
const getCustomers = (request, response) => {
  connection.query("SELECT * FROM customer", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};

const getCustomerById = (request, response) => {
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM customer WHERE customerid = " + [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelListing = (request, response) => {
  connection.query("SELECT * FROM Listing", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
const getHotelListingById = (request, response) => {
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM Listing WHERE listingid = " + [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelListingDetails = (request, response) => {
  connection.query("SELECT * FROM HotelListingDetails", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
const getHotelListingDetailsById = (request, response) => {
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM HotelListingDetails WHERE listingdetailid = " + [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelListingWithDetails = (request, response) => {
  connection.query(
    "SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid",
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results);
    }
  );
};
const getHotelListingWithDetailsById = (request, response) => {
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid Where listingid = " +
      [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelReview = (request, response) => {
  connection.query("SELECT * FROM hotelreview", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
const getHotelReviewById = (request, response) => {
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM hotelreview WHERE hotelreviewid = " + [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const getBooking = (request, response) => {
  connection.query("SELECT * FROM booking", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
//SELECT student.name FROM student INNER JOIN copy ON student.email = copy.owner WHERE
//"SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid",

const getBookingById = (request, response) => {
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM booking INNER JOIN listing ON booking.listingid = listing.listingid WHERE booking.bookingid = " +
      [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getBookingByCustomerId = (request, response) => {
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM booking INNER JOIN listing on booking.listingid = listing.listingid WHERE booking.customerid = " +
      [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const createListing = (request, response) => {
  const sql =
    "Insert into listing(hotelname,address,city ,amenities) values (?,?,?,?)";
  connection.query(
    sql,
    [
      request.body.hotelname,
      request.body.address,
      request.body.city,
      request.body.amenities,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const createHotelReview = (request, response) => {
  const sql =
    "Insert into hotelreview(listingid,ratings,reviews) values (?,?,?)";
  connection.query(
    sql,
    [request.body.listingid, request.body.ratings, request.body.reviews],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const createListingDetails = (request, response) => {
  const sql =
    "Insert into hotellistingdetails( roomType, numOfRooms , listingid) values (?,?,?)";
  connection.query(
    sql,
    [request.body.roomType, request.body.numOfRooms, request.body.listingid],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const createBooking = (request, response) => {
  const sql =
    "Insert into booking(checkindate, checkoutdate,numofguest,isCanceled,customerid,roomType) values (?,?,?,?,?,?)";
  connection.query(
    sql,
    [
      request.body.checkindate,
      request.body.checkoutdate,
      request.body.numofguest,
      request.body.isCanceled,
      request.body.customerid,
      request.body.roomType,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const createUser = (request, response) => {
  const sql = "Select * from customer where username = ?";
  connection.query(sql, [request.body.username], (error, results, fields) => {
    if (results.length == 0) {
      const sql =
        "Insert into customer(name, username,password,address,contactno) values (?,?,?,?,?)";
      connection.query(
        sql,
        [
          request.body.name,
          request.body.username,
          request.body.password,
          request.body.address,
          request.body.contactno,
        ],
        (error, results, fields) => {
          response.status(200).send("Success");
        }
      );
    } else {
      response.status(200).send("isExist");
    }
  });
};

const updateUser = (request, response) => {
  const sql =
    "update customer set name = ?, username = ?,password =?,address=?,contactno=? where customerid = ?";
  connection.query(
    sql,
    [
      request.body.name,
      request.body.username,
      request.body.password,
      request.body.address,
      request.body.contactno,
      request.body.customerid,
    ],
    (error, results, fields) => {
      response.status(200).json(results);
    }
  );
};
const updateBooking = (request, response) => {
  const sql =
    "update booking set checkindate = ?, checkoutdate =?,numofguest = ?,isCanceled =?,customerid= ?,roomType= ? where bookingid = ?";
  connection.query(
    sql,
    [
      request.body.checkindate,
      request.body.checkoutdate,
      request.body.numofguest,
      request.body.isCanceled,
      request.body.customerid,
      request.body.roomType,
      request.body.bookingid,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const updateListing = (request, response) => {
  const sql =
    "update listing set hotelname = ?,address = ?,city =? ,amenities=? where listingid = ?";
  connection.query(
    sql,
    [
      request.body.hotelname,
      request.body.address,
      request.body.city,
      request.body.amenities,
      request.body.listingid,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const updateHotelReview = (request, response) => {
  const sql =
    "update hotelreview set listingid = ?,ratings =?,reviews =? where hotelreviewid = ?";
  connection.query(
    sql,
    [
      request.body.listingid,
      request.body.ratings,
      request.body.reviews,
      request.body.hotelreviewid,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const updateListingDetails = (request, response) => {
  const sql =
    "update hotellistingdetails set roomType =?, numOfRooms =? , listingid =? where listingdetailid = ?";
  connection.query(
    sql,
    [
      request.body.roomType,
      request.body.numOfRooms,
      request.body.listingid,
      request.body.listingdetailid,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  const sql = "delete from customer where customerid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
const deleteBooking = (request, response) => {
  const id = parseInt(request.params.id);
  const sql = "delete from booking where customerid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
const deleteListing = (request, response) => {
  const id = parseInt(request.params.id);
  const sql = "delete from listing where listingid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};

const deleteListingDetails = (request, response) => {
  const id = parseInt(request.params.id);
  const sql = "delete from hotellistingdetails where listingdetailid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
const deleteHotelReview = (request, response) => {
  const id = parseInt(request.params.id);
  const sql = "delete from hotelreview where hotelreviewid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
module.exports = {
  getCustomers,
  getCustomerById,
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
  loginUser,
  getBookingByCustomerId,
};
