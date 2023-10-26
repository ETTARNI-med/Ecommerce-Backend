import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: Schema.Types.UUID,
    first_name: {
      type: String,
      require: true,
      min: 2,
      max: 27,
    },
    last_name: {
      type: String,
      require: true,
      min: 2,
      max: 27,
    },
    email: {
      type: String,
      require: true,
      min: 11,
      max: 60,
      unique: true,
    },
    role: {
      type: Number,
      require: true,
      default: 1,
    },
    user_name: {
      type: String,
      require: true,
      min: 5,
      max: 27,
    },
    password: {
      type: String,
      require: true,
      min: 8,
    },
    picture_path: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    last_login: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "creation_date",
      updatedAt: "last_update",
    },
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("last_login")) {
    this.last_update = Date.now();
  }
  next();
});

UserSchema.virtual("last_update").get(function () {
  return this.updatedAt;
});

const User = mongoose.model("User", UserSchema);

export default User;
