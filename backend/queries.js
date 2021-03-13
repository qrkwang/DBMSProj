
var mysql = require('mysql')
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
    user: 'tpuser',
    host: '127.0.0.1',
    database: 'tpdbv1',
    password: 'teamDB',
})
const getCustomers = (request, response) => {
    
  
    connection.query('SELECT * FROM customer', (error, results) => {
      if (error) {
        throw error
      }
     
     response.status(200).json(results)
    });
   
  }
  
  const getCustomerById = (request, response) => {
  
    const id = parseInt(request.params.id)
    connection.query('SELECT * FROM customer WHERE customerid = '+[id],  (error, results) =>  {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    });
  }
  const getHotelListing = (request, response) => {
    
  
    connection.query('SELECT * FROM Listing', (error, results) => {
      if (error) {
        throw error
      }
     
     response.status(200).json(results)
    });
   
  }
  const getHotelListingById = (request, response) => {
  
    const id = parseInt(request.params.id)
    connection.query('SELECT * FROM Listing WHERE listingid = '+[id],  (error, results) =>  {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    });
  }
  const getHotelListingDetails = (request, response) => {
    
  
    connection.query('SELECT * FROM HotelListingDetails', (error, results) => {
      if (error) {
        throw error
      }
     
     response.status(200).json(results)
    });
   
  }
  const getHotelListingDetailsById = (request, response) => {
  
    const id = parseInt(request.params.id)
    connection.query('SELECT * FROM HotelListingDetails WHERE listingdetailid = '+[id],  (error, results) =>  {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    });
  }
  const getHotelListingWithDetails = (request, response) => {
    
  
    connection.query('SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid', (error, results) => {
      if (error) {
        throw error
      }
     
     response.status(200).json(results)
    });
   
  }
  const getHotelListingWithDetailsById = (request, response) => {
  
    const id = parseInt(request.params.id)
    connection.query('SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid Where listingid = '+[id],  (error, results) =>  {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    });
  }
  const getHotelReview = (request, response) => {
    
  
    connection.query('SELECT * FROM hotelreview', (error, results) => {
      if (error) {
        throw error
      }
     
     response.status(200).json(results)
    });
   
  }
  const getHotelReviewById = (request, response) => {
  
    const id = parseInt(request.params.id)
    connection.query('SELECT * FROM hotelreview WHERE hotelreviewid = '+[id],  (error, results) =>  {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    });
  }


  const getBooking= (request, response) => {
    
  
    connection.query('SELECT * FROM booking', (error, results) => {
      if (error) {
        throw error
      }
     
     response.status(200).json(results)
    });
   
  }
  const getBookingById = (request, response) => {
  
    const id = parseInt(request.params.id)
    connection.query('SELECT * FROM booking WHERE bookingid = '+[id],  (error, results) =>  {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    });
  }

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

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
    getBookingById
}