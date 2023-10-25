const express = require("express");
const authRoute = require("./auth");
const userRoute = require("./users");
const postRoute = require("./posts");
const categoryRoute = require("./categories");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/categories", categoryRoute);

module.exports = router;
