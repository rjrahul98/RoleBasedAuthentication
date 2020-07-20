import * as express from 'express'
import { userRoutes } from './router/userRoutes'

export function configRoutes(app: express.Application) {
    app.use('/user', userRoutes);
}