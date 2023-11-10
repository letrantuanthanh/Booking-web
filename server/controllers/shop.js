const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

exports.createUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const user = new User({
          username: username,
          password: password,
          fullname: fullname,
          phoneNumber: phoneNumber,
          email: email,
          isAdmin: false,
        });
        user
          .save()
          .then((result) => {
            console.log("User created!");
            res.json(result);
          })
          .catch((err) => console.log(err));
      } else {
        res.status(400).send({ message: "username already exists!" });
      }
    })
    .catch((err) => console.log(err));
};

exports.checkUserLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username, password: password })
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "User not found!" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => console.log(err));
};

exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.json(hotels);
    })
    .catch((err) => console.log(err));
};

exports.searchHotels = (req, res, next) => {
  const destination = req.body.destination;
  const date = req.body.date;
  const options = req.body.options;
  Hotel.find()
    .then((hotels) => {
      const resHotels = hotels.filter(
        (item) =>
          item.city.toLowerCase() === destination.toLowerCase() &&
          item.rooms.length >= options?.room
      );
      res.json(resHotels);
    })
    .catch((err) => console.log(err));
};

exports.getHotelDetail = (req, res, next) => {
  const hotelId = req.params.id;
  Hotel.findById(hotelId)
    .then((hotel) => {
      res.json(hotel);
    })
    .catch((err) => console.log(err));
};

exports.getRoomDetail = (req, res, next) => {
  const roomId = req.params.id;
  Room.findById(roomId)
    .then((room) => {
      res.json(room);
    })
    .catch((err) => console.log(err));
};

exports.createTransaction = (req, res, next) => {
  const user = req.body.username;
  const hotel = req.body.hotel;
  const room = req.body.room;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const price = req.body.price;
  const payment = req.body.payment;
  const hotelName = req.body.hotelName;
  const roomIds = req.body.roomIds;
  const status = "Booked";

  const transaction = new Transaction({
    user: user,
    hotel: hotel,
    room: room,
    dateStart: dateStart,
    dateEnd: dateEnd,
    price: price,
    payment: payment,
    status: status,
    hotelName: hotelName,
    roomIds: roomIds,
  });

  transaction
    .save()
    .then((result) => {
      console.log("transaction created!");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.getTransactions = (req, res, next) => {
  const username = req.params.username;
  Transaction.find({ user: username })
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => console.log(err));
};
