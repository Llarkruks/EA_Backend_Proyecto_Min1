import express from 'express';
import controller from '../controllers/Question';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: questions
 *     description: CRUD endpoints for Questions and answers
 *
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Sí, vale mucho la pena."
 *         userId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789001"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-13T10:00:00.000Z"
 *
 *     Question:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789888"
 *         title:
 *           type: string
 *           example: "¿Hay sombra en este punto?"
 *         description:
 *           type: string
 *           example: "Duda sobre la mejor hora para parar aquí"
 *         pointId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789777"
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Answer'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     QuestionCreate:
 *       type: object
 *       required:
 *         - title
 *         - pointId
 *       properties:
 *         title:
 *           type: string
 *           example: "¿Hay sombra en este punto?"
 *         description:
 *           type: string
 *           example: "Quiero saber si es buena parada en verano"
 *         pointId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789777"
 *
 *     QuestionUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "¿Hay sombra y bancos en este punto?"
 *         description:
 *           type: string
 *           example: "Información ampliada"
 *         pointId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789777"
 *
 *     AnswerCreate:
 *       type: object
 *       required:
 *         - text
 *         - userId
 *       properties:
 *         text:
 *           type: string
 *           example: "Sí, por la mañana hay bastante sombra."
 *         userId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789001"
 */

/**
 * @openapi
 * /questions:
 *   get:
 *     summary: List all Questions
 *     tags: [questions]
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [10, 25, 50]
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search by title or description
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /questions/point/{pointId}:
 *   get:
 *     summary: List Questions by Point
 *     tags: [questions]
 *     parameters:
 *       - in: path
 *         name: pointId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/point/:pointId', controller.readByPoint);

/**
 * @openapi
 * /questions/{questionId}:
 *   get:
 *     summary: Get a Question by ID
 *     tags: [questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.get('/:questionId', controller.readQuestion);

/**
 * @openapi
 * /questions:
 *   post:
 *     summary: Create a Question
 *     tags: [questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionCreate'
 *     responses:
 *       201:
 *         description: Created
 *       422:
 *         description: Validation failed
 */
router.post('/', ValidateJoi(Schemas.Question.create), controller.createQuestion);

/**
 * @openapi
 * /questions/{questionId}:
 *   put:
 *     summary: Update a Question
 *     tags: [questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionUpdate'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:questionId', ValidateJoi(Schemas.Question.update), controller.updateQuestion);

/**
 * @openapi
 * /questions/{questionId}:
 *   delete:
 *     summary: Delete a Question
 *     tags: [questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.delete('/:questionId', controller.deleteQuestion);

/**
 * @openapi
 * /questions/{questionId}/answers:
 *   post:
 *     summary: Add an answer to a Question
 *     tags: [questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerCreate'
 *     responses:
 *       200:
 *         description: Answer added
 *       404:
 *         description: Not found
 */
router.post('/:questionId/answers', ValidateJoi(Schemas.Question.addAnswer), controller.createAnswer);

export default router;