import { model, models, Schema, Types } from "mongoose";

export interface IAnswer {
  author: Types.ObjectId;
  questions: Types.ObjectId;
  content: string;
  upVotes: number;
  downVotes: number;
}

const answerScheme = new Schema<IAnswer>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questions: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    content: { type: String, required: true },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Answer = models?.Answer || model<IAnswer>("Answer", answerScheme);

export default Answer;
