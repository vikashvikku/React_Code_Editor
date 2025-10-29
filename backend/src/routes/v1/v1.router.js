import express from 'express';

import userRouter from './user.routes.js';
import fileRouter from './file.routes.js';
import projectRouter from './project.routes.js';

const v1Router = express.Router();

v1Router.use('/auth', userRouter);
v1Router.use('/file', fileRouter);
v1Router.use('/project', projectRouter);

export default v1Router;