const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/admin/login", adminController.checkAdminLogin);

router.get("/admin/transactions", adminController.getAdminTransactions);

router.get("/admin/hotels", adminController.getAdminHotels);

router.post("/admin/delete-hotel", adminController.postDeleteHotel);

router.post("/admin/create-hotel", adminController.postHotel);

router.get("/admin/edit-hotel/:hotelId", adminController.getEditHotel);

router.post("/admin/edit-hotel", adminController.postEditHotel);

router.get("/admin/rooms", adminController.getAdminRooms);

router.post("/admin/create-room", adminController.postRoom);

router.post("/admin/delete-room", adminController.postDeleteRoom);

router.get("/admin/edit-room/:roomId", adminController.getEditRoom);

router.post("/admin/edit-room", adminController.postEditRoom);

module.exports = router;
