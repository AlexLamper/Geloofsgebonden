import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: null,
    },
    passwordHash: {
      type: String,
      default: null,
      select: false,
    },
    pseudonym: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User: Model<UserDocument> =
  (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);

export default User;
