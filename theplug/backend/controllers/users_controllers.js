const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users_schema");

//@route POST
//@desc: Registering new users
router.post("/register_users", async (req, res) => {
  //get user data from frontend
  const { name, surname, email, password } = req.body;

  try {
    //register new user
    const newUser = new Users({
      _id: mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      password: password,
    });

    //check if user already exists
    userFound = await Users.findOne({ email: email });
    if (userFound) {
      return res.status(201).json({
        message: "Registration failed, user already exists.",
      });
    } else {
      //save new user
      newUser.save((err) => {
        if (err) {
          return console.log(err);
        } else {
          res.status(201).json({
            message: "Successfully registered, Please sign in.",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to save new user",
      err: error,
    });
  }
});

//login
//validate login/ user data from front end
router.post("/login_users", async (req, res) => {
  Users.find({ email: req.body.email, password: req.body.password })
  .select(' _id name surname skills email age location phoneNumber')
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.json({
          message: "Login error! Please check your details",
        });
      } else {
        return res.json({
          message: "Logged In Successfully!",
          users: users,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});

//Get all users from database
router.get("/get_all_users", (req, res, next) => {
  Users.find()
  .select(' _id name surname skills email age location phoneNumber')
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Updating a user
router.patch("/update_users/:id", async (req, res) => {
  try {
    const users = await Users.findOne({ _id: req.params.id });

    if (req.body.name) {
      users.name = req.body.name;
    }

    if (req.body.surname) {
      users.surname = req.body.surname;
    }

    if (req.body.email) {
      users.email = req.body.email;
    }
    if (req.body.password) {
      users.password = req.body.password;
    }

    if (req.body.location) {
      users.location = req.body.location;
    }

    if (req.body.skills) {
      users.skills = req.body.skills;
    }

    if (req.body.age) {
      users.age = req.body.age;
    }

    if (req.body.phoneNumber) {
      users.phoneNumber = req.body.phoneNumber;
    }

    await users.save();
    // res.send(users)
    return res.json({
      message: "User Details Updated!",
      users: users,
    });
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

//getting a user by id
router.get("/get_user/:userId", (req, res, next) => {
  Users.find({ _id: req.params.userId })
  .select(' _id name surname skills email age location phoneNumber')
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          users: doc,
        });
      } else if (!_id)
      {
        res.status(404).json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ 
        message:"User does not exist",
        error: err 
      });
    });
});
module.exports = router;
