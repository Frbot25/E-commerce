const Mongoose = require('../database');
const userSchema = new Mongoose.Schema(
    {
      firstname: {
        type: String,
        required: true,
        maxlength: 32,
      },
      lastname: {
        type: String,
        required: true,
        maxlength: 32,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      },
      password: {
        type: String,
        required: true,
      },
      userRoleId: {
        type: String,
        required: true,
        default: "6421e3908900a17f5651b3d2"
      },
      phoneNumber: {
        type: Number,
      },
      userImage: {
        type: String,
        default: "user.png",
      },
      verified: {
        type: String,
        default: false,
      },
      secretKey: {
        type: String,
        default: null,
      },
      history: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  );
  
  const userModel = Mongoose.model("users", userSchema);
  module.exports = userModel;