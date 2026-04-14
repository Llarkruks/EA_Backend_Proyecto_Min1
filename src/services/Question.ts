import QuestionModel, { IAnswer, IQuestion } from '../models/Question';
import { PaginationParams } from '../library/Pagination';

type PaginatedResult<T> = {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

type ListResult<T> = PaginatedResult<T> | T[];

const createQuestion = async (input: IQuestion) => {
    const question = new QuestionModel(input);
    return await question.save();
};

const getQuestion = async (questionId: string) => {
    return await QuestionModel.findById(questionId)
        .populate('pointId')
        .populate('answers.userId', 'name surname username email')
        .exec();
};

const getAllQuestions = async (
    pagination?: PaginationParams,
    search?: string
): Promise<ListResult<IQuestion>> => {
    const filter = search
        ? {
              $or: [
                  { title: { $regex: search, $options: 'i' } },
                  { description: { $regex: search, $options: 'i' } }
              ]
          }
        : {};

    if (!pagination) {
        return await QuestionModel.find(filter)
            .sort({ _id: 1 })
            .populate('pointId')
            .populate('answers.userId', 'name surname username email')
            .exec();
    }

    const { limit, page } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        QuestionModel.find(filter)
            .sort({ _id: 1 })
            .skip(skip)
            .limit(limit)
            .populate('pointId')
            .populate('answers.userId', 'name surname username email')
            .exec(),
        QuestionModel.countDocuments(filter)
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getQuestionsByPoint = async (pointId: string, search?: string) => {
    const filter: any = { pointId };

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    return await QuestionModel.find(filter)
        .sort({ _id: 1 })
        .populate('pointId')
        .populate('answers.userId', 'name surname username email')
        .exec();
};

const updateQuestion = async (questionId: string, input: Partial<IQuestion>) => {
    return await QuestionModel.findByIdAndUpdate(questionId, input, { new: true })
        .populate('pointId')
        .populate('answers.userId', 'name surname username email')
        .exec();
};

const deleteQuestion = async (questionId: string) => {
    return await QuestionModel.findByIdAndDelete(questionId).exec();
};

const addAnswer = async (questionId: string, answer: IAnswer) => {
    return await QuestionModel.findByIdAndUpdate(
        questionId,
        { $push: { answers: answer } },
        { new: true }
    )
        .populate('pointId')
        .populate('answers.userId', 'name surname username email')
        .exec();
};

export default {
    createQuestion,
    getQuestion,
    getAllQuestions,
    getQuestionsByPoint,
    updateQuestion,
    deleteQuestion,
    addAnswer
};