import { NextFunction, Request, Response } from 'express';
import QuestionService from '../services/Question';
import { parsePagination } from '../library/Pagination';

const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedQuestion = await QuestionService.createQuestion({
            ...req.body,
            answers: req.body.answers || []
        });

        return res.status(201).json(savedQuestion);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    try {
        const question = await QuestionService.getQuestion(questionId);
        return question
            ? res.status(200).json(question)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pagination = parsePagination(req.query);
        const search = typeof req.query.search === 'string' ? req.query.search : undefined;

        const questions = await QuestionService.getAllQuestions(pagination, search);
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readByPoint = async (req: Request, res: Response, next: NextFunction) => {
    const pointId = req.params.pointId;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;

    try {
        const questions = await QuestionService.getQuestionsByPoint(pointId, search);
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    try {
        const data = { ...req.body };
        delete data.answers;

        const updatedQuestion = await QuestionService.updateQuestion(questionId, data);
        return updatedQuestion
            ? res.status(200).json(updatedQuestion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    try {
        const question = await QuestionService.deleteQuestion(questionId);
        return question
            ? res.status(200).json(question)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const createAnswer = async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    try {
        const updatedQuestion = await QuestionService.addAnswer(questionId, {
            text: req.body.text,
            userId: req.body.userId,
            createdAt: new Date()
        });

        return updatedQuestion
            ? res.status(200).json(updatedQuestion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default {
    createQuestion,
    readQuestion,
    readAll,
    readByPoint,
    updateQuestion,
    deleteQuestion,
    createAnswer
};