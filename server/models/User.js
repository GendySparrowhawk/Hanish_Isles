const { model, Schema } = require("mongoose");
const { hash, compare } = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      MinLength: [4, "username must be at least 4 characters"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator(val) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
        },
      },
    },
    password: {
      type: String,
      required: true,
      MinLength: [6, "Password must be at least 6 characters"],
    },

    characters: [
      {
        type: String,
        ref: "Character",
      },
    ],
  },
  {
    mehtods: {
      async validatePass(formPassword) {
        const is_vaild = await compare(formPassword, this.password);

        return is_vaild;
      },
    },
    virtuals: {
      userData: {
        get() {
          return this.username + " - " + this.email;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  return user;
};

const User = model("User", userSchema);

module.exports = User;
