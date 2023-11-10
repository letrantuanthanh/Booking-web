const Transaction = require("../models/transaction");
const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");

exports.checkAdminLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username, password: password, isAdmin: true })
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "Admin not found!" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => console.log(err));
};

exports.getAdminTransactions = (req, res, next) => {
  const page = req.query.page;
  const limit = req.query.limit;

  if (!limit) {
    Transaction.find()
      .then((transactions) => {
        res.json(transactions);
      })
      .catch((err) => console.log(err));
  } else {
    Transaction.paginate({}, { page: page, limit: limit })
      .then((result) => {
        return {
          data: result.docs,
          page: result.page,
          totalPages: result.totalPages,
          total: result.totalDocs,
        };
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  }
};

exports.getAdminHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.json(hotels);
    })
    .catch((err) => console.log(err));
};

exports.getAdminRooms = (req, res, next) => {
  const page = req.query.page;
  const limit = req.query.limit;

  if (!limit) {
    Room.find()
      .then((rooms) => {
        res.json(rooms);
      })
      .catch((err) => console.log(err));
  } else {
    Transaction.paginate({}, { page: page, limit: limit })
      .then((result) => {
        return {
          data: result.docs,
          page: result.page,
          totalPages: result.totalPages,
          total: result.totalDocs,
        };
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  }
};

exports.postDeleteHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;

  Transaction.find({ hotel: hotelId })
    .then((result) => {
      if (result.length > 0) {
        res
          .status(400)
          .send({ message: "Can't delete, this hotel is currently in used! " });
      } else {
        Hotel.findByIdAndRemove(hotelId)
          .then(() => {
            console.log("Destroyed hotel");
            res.status(200).send({ message: "delete success" });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.postHotel = (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const city = req.body.city;
  const address = req.body.address;
  const distance = req.body.distance;
  const photos = req.body.photos;
  const desc = req.body.desc;
  const price = req.body.price;
  const rating = req.body.rating;
  const rooms = req.body.rooms;
  const title = req.body.title;

  const hotel = new Hotel({
    name: name,
    type: type,
    city: city,
    title: title,
    address: address,
    distance: distance,
    photos: photos,
    desc: desc,
    cheapestPrice: price,
    rating: rating,
    rooms: rooms,
    featured: true,
  });

  hotel
    .save()
    .then((result) => {
      console.log("hotel created!");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.getEditHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;

  Hotel.findById(hotelId)
    .then((hotel) => {
      res.json(hotel);
    })
    .catch((err) => console.log(err));
};

exports.postEditHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  const updatedName = req.body.name;
  const updatedType = req.body.type;
  const updatedCity = req.body.city;
  const updatedAddress = req.body.address;
  const updatedDistance = req.body.distance;
  const updatedPhotos = req.body.photos;
  const updatedDesc = req.body.desc;
  const updatedPrice = req.body.price;
  const updatedRating = req.body.rating;
  const updatedRooms = req.body.rooms;
  const updatedTitle = req.body.title;

  Hotel.findById(hotelId)
    .then((hotel) => {
      hotel.name = updatedName;
      hotel.type = updatedType;
      hotel.city = updatedCity;
      hotel.address = updatedAddress;
      hotel.title = updatedTitle;
      hotel.cheapestPrice = updatedPrice;
      hotel.description = updatedDesc;
      hotel.distance = updatedDistance;
      hotel.photos = updatedPhotos;
      hotel.rating = updatedRating;
      hotel.rooms = updatedRooms;
      return hotel.save();
    })
    .then((result) => {
      console.log("updated hotel");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postRoom = (req, res, next) => {
  const desc = req.body.desc;
  const price = req.body.price;
  const rooms = req.body.rooms;
  const title = req.body.title;
  const maxPeople = req.body.maxPeople;

  const room = new Room({
    desc: desc,
    price: price,
    roomNumbers: rooms,
    title: title,
    maxPeople: maxPeople,
  });

  room
    .save()
    .then((result) => {
      console.log("room created!");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteRoom = (req, res, next) => {
  const roomId = req.body.roomId;

  Transaction.find({ roomIds: { $in: roomId } })
    .then((result) => {
      if (result.length > 0) {
        res
          .status(400)
          .send({ message: "Can't delete, this room is currently in used! " });
      } else {
        Room.findByIdAndRemove(roomId)
          .then(() => {
            console.log("Destroyed room");
            res.status(200).send({ message: "delete success" });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.getEditRoom = (req, res, next) => {
  const roomId = req.params.roomId;

  Room.findById(roomId)
    .then((room) => {
      res.json(room);
    })
    .catch((err) => console.log(err));
};

exports.postEditRoom = (req, res, next) => {
  const roomId = req.body.roomId;
  const updatedDesc = req.body.desc;
  const updatedPrice = req.body.price;
  const updatedMaxpeople = req.body.maxPeople;
  const updatedRooms = req.body.rooms;
  const updatedTitle = req.body.title;

  Room.findById(roomId)
    .then((room) => {
      room.title = updatedTitle;
      room.desc = updatedDesc;
      room.price = updatedPrice;
      room.maxPeople = updatedMaxpeople;
      room.roomNumbers = updatedRooms;
      return room.save();
    })
    .then((result) => {
      console.log("updated room");
      res.json(result);
    })
    .catch((err) => console.log(err));
};
