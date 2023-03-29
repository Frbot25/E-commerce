const Mongoose = require('../database');
const rolesSchema = new Mongoose.Schema(
    {
      type_role: {
        type: Number,
        required: true,
        maxlength: 1,
        
      },
      role: {
        type: String,
        required: true,
        maxlength: 32,
      }
    },
    { timestamps: true }
  );
  
  const RolesSchema = Mongoose.model("roles", rolesSchema);
  module.exports = RolesSchema;