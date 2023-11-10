const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.post("/create-user", shopController.createUser);

router.post("/login", shopController.checkUserLogin);

router.get("/hotels", shopController.getHotels);

router.post("/search-hotels", shopController.searchHotels);

router.get("/hotel-detail/:id", shopController.getHotelDetail);

router.get("/room/:id", shopController.getRoomDetail);

router.post("/create-transaction", shopController.createTransaction);

router.get("/transactions/:username", shopController.getTransactions);

module.exports = router;
