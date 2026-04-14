import mongoose, { Document, Schema } from 'mongoose';

export interface IAnswer {
    text: string;
    userId: string;
    createdAt: Date;
}

export interface IQuestion {
    title: string;
    description?: string;
    pointId: string;
    answers: IAnswer[];
}

export interface IQuestionModel extends IQuestion, Document {}

const AnswerSchema: Schema = new Schema(
    {
        text: { type: String, required: true },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: { type: Date, default: Date.now }
    },
    {
        _id: false
    }
);

const QuestionSchema: Schema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        pointId: {
            type: Schema.Types.ObjectId,
            ref: 'Point',
            required: true
        },
        answers: {
            type: [AnswerSchema],
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IQuestionModel>('Question', QuestionSchema);