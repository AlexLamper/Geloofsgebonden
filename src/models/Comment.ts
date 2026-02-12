import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type CommentDocument = InferSchemaType<typeof commentSchema>;

const Comment: Model<CommentDocument> =
  (models.Comment as Model<CommentDocument>) ||
  model<CommentDocument>("Comment", commentSchema);

export default Comment;
