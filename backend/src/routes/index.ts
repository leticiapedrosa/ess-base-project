import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import HelloController from '../controllers/hello.controller';
import MessageController from '../controllers/message.controller';
import RecoveryController from '../controllers/recovery.controller';
import NotificationController from '../controllers/notification.controller';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new MessageController(router).router
  );

  const testRouter = new TestController(router, di.getService(TestService)).router;
  const helloRouter = new HelloController(router).router;
  const recoveryRouter = new RecoveryController(router).router;
  const notificationRouter = new NotificationController(router).router;

  app.use(prefix, testRouter);
  app.use(prefix, helloRouter);
  app.use(prefix, recoveryRouter);
  app.use(prefix, notificationRouter);
};
