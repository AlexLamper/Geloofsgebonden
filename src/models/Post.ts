import {
  InferSchemaType,
  Model,
  Schema,
  Types,
  model,
  models,
} from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    type: {
      type: String,
      enum: ["GEBED", "DANK", "VRAAG"],
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorPseudonym: {
      type: String,
      required: true,
      trim: true,
    },
    scriptureReference: {
      type: String,
      default: null,
      trim: true,
    },
    scriptureText: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      required: true,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

postSchema.index({ createdAt: -1 });

export type PostDocument = Omit<InferSchemaType<typeof postSchema>, "upvotes"> & {
  upvotes: Types.ObjectId[];
};

const Post: Model<PostDocument> =
  (models.Post as Model<PostDocument>) || model<PostDocument>("Post", postSchema);

export default Post;
