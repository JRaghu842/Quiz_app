let express = require("express");
let { UserModel } = require("../models/user.model");

let UserRouter = express.Router();

UserRouter.post("/api/register", async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).send({ msg: "Already Registered", success: true });
    } else {
      let newuser = new UserModel({ username, email });
      await newuser.save();
      return res
        .status(200)
        .send({ msg: "New user Registered", success: true });
    }
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Add signin route logic here

module.exports = {
  UserRouter,
};
