import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import path from 'path';
import { config } from './config/config';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EA Proyecto',
            version: '1.0.0',
            description: 'API para gestionar rutas, puntos, usuarios y preguntas'
        },
        servers: [
            {
                url: `http://localhost:${config.server.port}`
            }
        ]
    },
    apis: [
        path.join(process.cwd(), 'src/routes/*.ts'),
        path.join(process.cwd(), 'build/routes/*.js')
    ]
};

export const swaggerSpec = swaggerJSDoc(options);