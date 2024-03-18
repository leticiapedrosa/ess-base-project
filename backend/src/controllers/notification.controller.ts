import { Router, Request, Response } from 'express';
import { SuccessResult, FailureResult } from '../utils/result';
// import { tokenCreate, recoverPassword } from '../services/notification.service';  // Importe o serviço de recuperação
import MessagesDatabase from '../database/message.database';
import NotificationsDatabase from '../database/notifications.database';
import { IMessage } from '../interfaces/chat.interface';

class NotificationController {
  private prefix: string = '/notification';
  public router: Router;
  private messageDatabase: MessagesDatabase = MessagesDatabase.getInstance();
  private notificationsDatabase: NotificationsDatabase = NotificationsDatabase.getInstance();

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {

    // Rota POST para notificacoes não lidas
    this.router.get(`${this.prefix}/get/:user`, (req: Request, res: Response) =>{
      try {
        const user = req.params.user;
        const notifications = this.notificationsDatabase.getNotifications(user);
        return new SuccessResult({
          msg: 'Notificações recuperadas com sucesso.',
          code: 200,
          data: notifications,
        }).handle(res);
      } catch (error) {
        return new FailureResult({
          msg: (error as Error).message,
          msgCode: null,
          code: 500
        }).handle(res);
      }
      
    });
  }
}

export default NotificationController;
