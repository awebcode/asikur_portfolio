import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },

    password: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      // default: "Default Image",
    },
    passwordResetToken: String,
    // notification: {
    //   type: Array,
    //   default: [],
    // },
    // seennotification: {
    //   type: Array,
    //   default: [],
    // },
    notification: [
      {
        user: { type: ObjectId, ref: "user", required: true },
        message: { type: String, required: true },

        path: { type: String, required: true },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    seennotification: [
      {
        user: { type: ObjectId, ref: "user", required: true },
        message: { type: String, required: true },

        path: { type: String, required: true },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    messagenotification: [
      {
        user: { type: ObjectId, ref: "user", required: true },
        message: { type: String, required: true },
        chat: {
          type: ObjectId,
          ref: "Chat",
        },
        path: { type: String, required: true },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    messageseennotification: [
      {
        user: { type: ObjectId, ref: "user", required: true },
        message: { type: String, required: true },
        chat: {
          type: ObjectId,
          ref: "Chat",
        },
        path: { type: String, required: true },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    friends: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    requests: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    savedPosts: [
      {
        post: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        savedAt: {
          type: Date,
          required: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      work: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      about: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
