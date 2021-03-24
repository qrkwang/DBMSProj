const MongoClient = require('mongodb').MongoClient
const MongoDBUrl = 'mongodb://localhost:27017/MongoDB'
const database ='MongoDB'
const getCustomers = (request, response) => {
    
  
  MongoClient.connect( MongoDBUrl, function (err, client) {
    if (err) throw err
  
    var db = client.db(database)
  
    db.collection("customer").find().toArray(function (err, result) {
      if (err) throw err
  
      response.status(200).json( result)
    })
  })
   
  }
  const getHotelListing = (request, response) => {
    
  
    MongoClient.connect( MongoDBUrl, function (err, client) {
      if (err) throw err
    
      var db = client.db(database)
  
      db.collection("listing").find().toArray(function (err, result) {
        if (err) throw err
    
        response.status(200).json( result)
      })
    })
   
  }
  const getHotelListingDetails = (request, response) => {
    
  
    MongoClient.connect( MongoDBUrl, function (err, client) {
      if (err) throw err
    
      var db = client.db(database)
  
      db.collection("hotellistingdetails").find().toArray(function (err, result) {
        if (err) throw err
    
        response.status(200).json( result)
      })
    })
   
  }
 
  const getHotelReview = (request, response) => {
    
  
    MongoClient.connect( MongoDBUrl, function (err, client) {
      if (err) throw err
    
      var db = client.db(database)
  
      db.collection("bookings").find().toArray(function (err, result) {
        if (err) throw err
    
        response.status(200).json( result)
      })
    })
   
   
  }


  const getBooking= (request, response) => {
    
  
    MongoClient.connect( MongoDBUrl, function (err, client) {
      if (err) throw err
    
      var db = client.db(database)
  
      db.collection("bookings").find().toArray(function (err, result) {
        if (err) throw err
    
        response.status(200).json( result)
      })
    })
   
   
  }



module.exports = {
    getCustomers,
    getHotelListing,
    getHotelListingDetails,
    getHotelReview,
    getBooking
}