import { model, models, Schema, Types } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: Types.ObjectId[];
  vote: number;
  views: number;
  upVotes: number;
  downVotes: number;
  answers: number;
}

const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true, trim: true, minLength: 130 },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    vote: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0, ref: "Answer" },
  },
  { timestamps: true }
);

const Question = models?.Question || model<IQuestion>("Question", questionSchema);

export default Question;
